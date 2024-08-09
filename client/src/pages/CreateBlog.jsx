import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputBase,
  Button,
  styled,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Tooltip,
  Grid,
  TextareaAutosize,
  CircularProgress,
  TextField,
} from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAuth } from '../store_UseContext/Authentication';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Define custom theme
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
  },
});

// Styled components
const MainBox = styled(Box)`
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0 2rem;
  padding: 2rem;
  display: flex;
  flex-flow: column;
  gap: 1rem;
`;

const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover',
  borderRadius: '8px',
});

const BoxTitleAndPlus = styled(FormControl)`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`;

const AddIconStyled = styled(AddCircleOutlinedIcon)`
  background-image: linear-gradient(to top, #30cfd0, #330867);
  color: white;
  border-radius: 50%;
  padding: 5px;
  &:hover {
    color: black;
  }
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 1em;
  font-size: 1rem;
  color: #455a64;
  input::placeholder {
    color: #455a64;
    opacity: 1;
    font-family: monospace;
  }
`;

const CategoryFormControl = styled(FormControl)`
  display: flex;
  flex-flow: row;
  gap: 2rem;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  font-size: 1rem;
  background-color: transparent;
  resize: vertical;
  color: #455a64;
  font-family: monospace;
  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    color: #455a64;
    opacity: 1;
  }
`;

const StyledButton = styled(Button)`
  background-image: linear-gradient(to right, #30cfd0, #330867);
  border-radius: 25px;
  width: 8rem;
  color: white;
  &:hover {
    background-image: linear-gradient(to top, #330867, #30cfd0);
  }
`;

const initialPost = {
  title: '',
  description: '',
  picture: '',
  Name: '',
  username:'',
  categories: '',
  createDate: new Date(),
};

const CreatePost = () => {
  const [file, setFile] = useState('');
  const [post, setPost] = useState(initialPost);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true); // Corrected to camelCase
  const theme = useTheme();
  const navigate = useNavigate();
  const { userData } = useAuth();

  const url = post.picture
    ? post.picture
    : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('blog-haven-server-e6l76oh7u-neha27gupta5s-projects.vercel.app/blog/fetch/category');
        if (!response.ok) {
          throw new Error('Failed to fetch Categories');
        }
        const data = await response.json();
        setCategories(prevCategories => Array.from(new Set([...prevCategories, ...data]))); // Maintain unique categories
        setCategoryLoading(false);
      } catch (error) {
        console.error('Error fetching Categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        const url = 'blog-haven-server-e6l76oh7u-neha27gupta5s-projects.vercel.app/blog/file/upload';
        const response = await fetch(url, {
          method: 'POST',
          body: data,
        });

        const result = await response.json();

        setPost(prevPost => ({
          ...prevPost,
          picture: result,
        }));
      }
    };

    getImage();
  }, [file]);

  const savePost = async () => {
    if (!post.title) {
      toast.error('Title is required');
      return;
    }

    if (!post.description) {
      toast.error('Description is required');
      return;
    }

    if (!post.categories) {
      toast.error('Category is required');
      return;
    }

    try {
      const postToSave = {
        ...post,
        Name: userData.Name,
        username:userData.username,
      };
      const url = 'http://localhost:5000/blog/create';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postToSave),
      });

      if (response.ok) {
        toast.success('Post is Saved');
        navigate('/');
      }
    } catch (e) {
      toast.error('Error in saving post');
    }
  };

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();

    if (trimmedCategory === '') {
      toast.error("Category can't be empty");
      return;
    }

    const capitalizedCategory =
      trimmedCategory.charAt(0).toUpperCase() + trimmedCategory.slice(1).toLowerCase();

    setCategories(prevCategories => Array.from(new Set([...prevCategories, capitalizedCategory])));

    setPost(prevPost => ({
      ...prevPost,
      categories: capitalizedCategory,
    }));

    setNewCategory('');
  };

  const handleDeleteCategory = () => {
    setPost(prevPost => ({
      ...prevPost,
      categories: '',
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <MainBox>
        <Image src={url} alt="banner" />

        <BoxTitleAndPlus>
          <label htmlFor="fileInput">
            <Tooltip title="Add File">
              <AddIconStyled fontSize="large" color="action" />
            </Tooltip>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <InputTextField
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={post.title}
          />
        </BoxTitleAndPlus>
        <Grid container spacing={{ xs: 2, lg: 8 }}>
          <Grid item xs={12} lg={4}>
            <FormControl fullWidth>
              <InputLabel color="primary" size="small">
                Category
              </InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                size="small"
                fullWidth
                value={post.categories}
                onChange={event => setPost({ ...post, categories: event.target.value })}
                input={<OutlinedInput id="select-category" label="Category" />}
              >
                {categoryLoading ? (
                  <MenuItem disabled>loading...</MenuItem>
                ) : (
                  categories.map((category) => (
                    <MenuItem
                      key={category}
                      value={category}
                      style={{
                        fontWeight:
                          post.categories === category
                            ? theme.typography.fontWeightMedium
                            : theme.typography.fontWeightRegular,
                      }}
                    >
                      {category}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={8}>
            <CategoryFormControl fullWidth>
              <TextField
                label="New Category"
                type="text"
                fullWidth
                value={newCategory}
                onChange={handleNewCategoryChange}
                size="small"
              />
              <StyledButton variant="contained" onClick={handleAddCategory}>
                Add
              </StyledButton>
            </CategoryFormControl>
          </Grid>
        </Grid>
        {post.categories && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            <Chip
              label={post.categories}
              onDelete={handleDeleteCategory}
              onMouseDown={(event) => event.stopPropagation()}
              deleteIcon={<CancelOutlinedIcon />}
              sx={{
                marginRight: '4px',
                marginBottom: '4px',
                background: 'linear-gradient(to right, #30cfd0, #330867)',
                color: 'white',
                fontWeight: theme.typography.fontWeightMedium,
                '&:hover': {
                  background: 'linear-gradient(to top, #330867, #30cfd0)',
                },
                '& .MuiChip-deleteIcon': {
                  color: 'white',
                },
              }}
            />
          </Box>
        )}
        <TextArea
          minRows={3}
          placeholder="Tell your story..."
          name="description"
          onChange={handleChange}
          value={post.description}
        />
        <StyledButton variant="contained" size="large" onClick={savePost}>
          Publish
        </StyledButton>
      </MainBox>
    </ThemeProvider>
  );
};

export default CreatePost;
