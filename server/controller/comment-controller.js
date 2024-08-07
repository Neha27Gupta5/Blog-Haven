const Comment = require('../DbSchema/commentSchema');

const addComment = (req, res) => {
  const data = req.body;
  console.log('enter');  // Corrected the log statement

  const newComment = new Comment({
    Name: data.Name,
    username: data.username,
    comments: data.comments,
    postId: data.postId,
  });

  newComment.save()
    .then(comment => {
      res.status(201).json({
        message: 'Comment added successfully!',
        comment,
      });
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({
        message: 'Failed to add comment',
        error: e.message,
      });
    });
};


const getComment = async (req, res) => {
  const postId = req.headers['post-id'];

  try {
    const comments = await Comment.find({ postId: postId }).sort({ date: -1 });

    if (!comments) {
      return res.status(404).json({ message: 'Comments not found' });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const deleteComment = async (req, res) => {
  console.log(0);
  const commentId = req.headers['commentid'];

  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    console.log(comment);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully', comment });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addComment ,getComment , deleteComment};
