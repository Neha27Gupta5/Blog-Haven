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
  TextField,
  Tooltip,
  Grid,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAuth } from '../store_UseContext/Authentication';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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
  categories: '',
  createDate: new Date(),
};

const UpdatePost = () => {
  const [file, setFile] = useState('');
  const [post, setPost] = useState(initialPost);
  const [newCategory, setNewCategory] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();
  const { userData } = useAuth();
  const { id } = useParams();

  const url = post.picture
    ? post.picture
    : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  useEffect(() => {
    const fetchPost = async () => {
      try {
          const response = await fetch(`blog-haven-server-e6l76oh7u-neha27gupta5s-projects.vercel.app/blog/detail/post`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Post-ID': id,
              },
          });
  
          if (!response.ok) {
              const errorText = await response.text();
              console.error('Fetch error:', errorText);
              throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setPost(data);
      } catch (error) {
          console.error('Error fetching post:', error);
      }
  };
  

    fetchPost();
  }, [id]);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        const url = 'http://localhost:5000/blog/file/upload';
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

  const handleUpdatePost = async () => {
    try {
      console.log('just started');
      const response = await fetch('blog-haven-server-e6l76oh7u-neha27gupta5s-projects.vercel.app/blog/post/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Post-ID': id, // Include the post ID in the headers
        },
        body: JSON.stringify(post),
      });
  
      if (response.ok) {
        alert('Post updated');
        navigate(`/details/${id}`); 
      } 
    } catch (e) {
      console.log('Error updating post:', e);
      alert('An unexpected error occurred');
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
      alert('Category cannot be empty.');
      return;
    }

    const capitalizedCategory = trimmedCategory.charAt(0).toUpperCase() + trimmedCategory.slice(1).toLowerCase();

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

  if (userData.username!== post.username) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Typography variant="h4" color="error">
            You cannot edit this post.
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

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
              <InputLabel color="primary" size="small">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                size='small'
                fullWidth
                value={post.categories}
                onChange={event => setPost({ ...post, categories: event.target.value })}
                input={<OutlinedInput id="select-category" label="Category" />}
              >
                {/* Replace with your categories list */}
                {['Category 1', 'Category 2', 'Category 3'].map((category) => (
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
                ))}
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
              <StyledButton variant="contained" onClick={handleAddCategory}>Add</StyledButton>
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
        <StyledButton variant="contained" size="large" onClick={handleUpdatePost}>Save Post</StyledButton>
      </MainBox>
    </ThemeProvider>
  );
};

export default UpdatePost;
