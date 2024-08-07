const Post = require('../DbSchema/PostModel');

// Function to publish a new post
const postPublish = async (req, res) => {
    const { title, description, picture, Name, categories,username } = req.body;

    try {
        const newPost = new Post({
            title,
            description,
            picture,
            Name,
            username,
            categories
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error saving post:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const postUpdate = async (req, res) => {
    // console.log('Updating post');
    const postId = req.headers['post-id'];
    const { title, description, picture, Name, categories,username } = req.body;
  
    console.log('Post ID:', postId);
    console.log('Request body:', { title, description, picture, Name, categories ,username});
  
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }
  
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, description, picture, Name, categories ,username},
        { new: true } // Return the updated document
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const postDelete = async (req, res) => {
    const postId = req.headers['post-id'];

    if (!postId) {
        return res.status(400).json({ message: 'Post ID is required' });
    }

    try {
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

};



module.exports = { postPublish, postUpdate , postDelete};
