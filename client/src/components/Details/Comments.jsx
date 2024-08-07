import { Box, Button, styled, TextareaAutosize } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../store_UseContext/Authentication';
import Comment from './Comment';
import { toast } from 'react-toastify';

const url = 'https://static.thenounproject.com/png/12017-200.png';

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  margin-top: 2rem;
`;

const Img = styled('img')`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const TextCommentArea = styled(TextareaAutosize)`
  width: 100%;
  padding: 1rem;
`;

const initialValues = {
  Name: '',
  comments: '',
  postId: '',
  date: new Date(),
};

const Comments = ({ post }) => {
  const { userData } = useAuth();
  const [comment, setComment] = useState(initialValues);
  const [fetchComment, setFetchComment] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:5000/blog/comment/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Post-ID': post._id,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFetchComment(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post._id]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      comments: e.target.value,
      postId: post._id,
      Name: userData.Name,
      username:userData.username,
    });
  };

  const AddComment = async () => {
    if (comment.comments.trim() === '') {
      toast.error('Enter comment first');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/blog/comment/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });

      if (response.ok) {
        const result = await response.json();
        // alert('Comment added successfully!');
        toast.success('Comment added successfully');
        setComment({ ...initialValues, date: new Date() });
        // Refetch comments after adding a new one
        fetchComments();
      } else {
        const errorData = await response.json();
        console.error('Error adding comment:', errorData.message);
        alert('Failed to add comment');
      }
    } catch (e) {
      console.log('Error adding comment:', e);
      alert('An unexpected error occurred');
    }
  };

  const removeComment = async (commentId) => {
    try {
      const response = await fetch('http://localhost:5000/blog/comment/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'commentId': commentId,
        },
      });

      if (response.ok) {
        alert('Comment deleted successfully!');
        setFetchComment(fetchComment.filter((comment) => comment._id !== commentId));
      } else {
        console.error('Error deleting comment:', await response.json());
        alert('Failed to delete comment');
      }
    } catch (e) {
      console.log('Error deleting comment:', e);
      alert('An unexpected error occurred');
    }
  };

  return (
    <Box>
      <Container>
        <Img src={url} alt="dp" />
        <TextCommentArea
          minRows={2}
          placeholder="What's on your mind?"
          value={comment.comments}
          onChange={handleChange}
        />
        <Button variant="contained" size="medium" onClick={AddComment}>
          Post
        </Button>
      </Container>
      <Box>
        {fetchComment.map((com) => (
          <Comment key={com._id} comment={com} removeComment={removeComment} />
        ))}
      </Box>
    </Box>
  );
};

export default Comments;
