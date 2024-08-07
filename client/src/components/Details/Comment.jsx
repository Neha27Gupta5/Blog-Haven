import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';
import { useAuth } from "../../store_UseContext/Authentication";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
    cursor: pointer;
`;

const Comment = ({ comment, removeComment }) => {
  const { userData } = useAuth();

  return (
    <Component>
      <Container>
        <Name>{comment.Name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {comment.username === userData.username && (
          <DeleteIcon onClick={() => removeComment(comment._id)} />
        )}
      </Container>
      <Typography>{comment.comments}</Typography>
    </Component>
  );
};

export default Comment;
