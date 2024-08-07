import React, { useEffect, useState } from 'react';
import { Box, styled, Typography, Tooltip, Grid } from '@mui/material';
import { useParams, Link, useLocation ,useNavigate } from 'react-router-dom';
import Loader from '../../pages/LoadingPage';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { useAuth } from '../../store_UseContext/Authentication';
import Comments from './Comments';

const StyledBox = styled(Box)`
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover',
  borderRadius: '8px',
});

const Heading = styled(Typography)`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  word-break: break-word;
  font-family: monospace;
`;

const EditIcon = styled(Edit)`
  font-size: 2rem;
  background-image: linear-gradient(to top, #30cfd0, #330867);
  color: white;
  border-radius: 50%;
  padding: 5px;
  margin-left: 0.5rem;

  &:hover {
    color: blue;
  }
`;

const DeleteIcon = styled(Delete)`
  font-size: 2rem;
  background-image: linear-gradient(to top, #30cfd0, #330867);
  color: white;
  border-radius: 50%;
  padding: 5px;
  margin-left: 0.5rem;

  &:hover {
    color: red;
  }
`;

const IconContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const Description = styled(Typography)`
  word-break: break-word;
  font-family: monospace;
`;

const SpanAuthor = styled('span')`
  color: #455a64;
  font-weight: 400;
`;

const DetailView = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { userData } = useAuth();
  const location = useLocation();
  const navigate =useNavigate();

  console.log(userData.username )
  const handleDeletePost = async()=>{
    
    if(userData.username===post.username){
      try{
        const response = await fetch('http://localhost:5000/blog/post/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Post-ID': id, // Include the post ID in the headers
          },
          
        });
    
        if (response.ok) {
          alert('Post deleted');
          navigate('/home'); 
        } 
      }
      catch (e) {
      console.log('Error deleting post:', e);
      alert('An unexpected error occurred');
       }
    }else{
      console.alert('cant delete this post');
    }
    
  }

  const placeholderUrl =
    'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/blog/detail/post`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Post-ID': id,
          },
        });
         
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <Loader />;
  }

  return (
    <StyledBox>
      <Image src={post.picture || placeholderUrl} alt="blog image" />

      {userData.username=== post.username && (
        <IconContainer>
          <Tooltip title="Edit">
            <Link to={`${location.pathname}/edit`}>
              <EditIcon />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
         
              <DeleteIcon onClick={handleDeletePost} />
            
          </Tooltip>
        </IconContainer>
      )}

      <Heading>{post.title}</Heading>

      <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
        <Grid item xs={12} md={10} lg={10}>
          <Typography style={{ fontWeight: '600' }}>
            <SpanAuthor>Author: </SpanAuthor>
            {post.Name}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2} lg={2} style={{ textAlign: 'right' }}>
          <Typography>{new Date(post.createDate).toDateString()}</Typography>
        </Grid>
      </Grid>

      <Description>{post.description}</Description>
      <Comments post={post}/>
    </StyledBox>
  );
};

export default DetailView;
