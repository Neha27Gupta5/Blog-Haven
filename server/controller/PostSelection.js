const Post = require('../DbSchema/PostModel');

const PopularPost = async (req, res) => {
    try {
        
      const popularPost = await Post.find()
        .sort({createDate: -1 }) // Sort by likes in descending order
        .limit(11); // Limit the number of posts returned
  
      if (!popularPost) {
        return res.status(404).json({ error: 'Popular post not found' });
      }
  
      res.status(200).json(popularPost);
    } catch (error) {
      console.error('Error fetching popular post:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  const postDataWithId = async (req, res) => {
    const postId = req.headers['post-id']; 
  
    try {
      const post = await Post.findById(postId); 
    //  console.log(post);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
 const postDataWithFilter = async(req,res)=>{
     const category = req.headers['category'];
     console.log('category',category);

     try {
      let posts;
  
      if (category === 'All') {
        posts = await Post.find(); 
      }
      else if (category !== 'All') {
       
        posts = await Post.find({categories:category});
      } 
      console.log('posts',posts);
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts with filter:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

 
const fetchCategories = async (req, res) => {
  try {
      // Use aggregation to get unique categories
      const categories = await Post.aggregate([
          { $group: { _id: "$categories" } }, // Group by the 'categories' field
          { $project: { _id: 0, category: "$_id" } } // Rename field and exclude _id
      ]);

      // Extract the category names from the result
      const categoryList = categories.map(item => item.category);

      res.status(200).json(categoryList);
  } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const PostDateWithKeyWord = async (req, res) => {
  const keyword = req.headers['keyword'];
  console.log(keyword); // Log the keyword to verify it is correct
  try {
    const posts = await Post.find({
      $text: { $search: keyword }
    });
    console.log(posts); // Log the search results
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts by keyword:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


  module.exports = { PopularPost ,postDataWithId ,postDataWithFilter,fetchCategories , PostDateWithKeyWord };
