const Post = require("../Model/postModel");

//  create a new Post
const createPost = async (req, res) => {
    try {
      const { postName } = req.body;
  
      if (!postName) {
        return res.status(400).json({ error: 'Need postName ' });
      }
  
      const newPost = await Post.create({ postName });
  
      res.status(201).json({ Post: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

//  get all Posts
const getAllPosts = async (req, res) => {
  try {
    const Posts = await Post.findAll();

    res.status(200).json({ Posts });
  } catch (error) {
    console.error(error);
    res.status(500).send(" Server Error");
  }
};

// get Post by ID
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPost = await Post.findByPk(id);

    if (!foundPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ Post: foundPost });
  } catch (error) {
    console.error(error);
    res.status(500).send(" Server Error");
  }
};

// update Post by ID
const updatePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const { postName } = req.body;
      
        const foundPost = await Post.findByPk(id);
      
        if (!foundPost) {
          return res.status(404).json({ error: "Post not found" });
        }
      
        console.log("Before Update:", foundPost.toJSON());
      
        await foundPost.update({ postName });
      
        console.log("After Update:", foundPost.toJSON());
      
        res.status(200).json({ Post: foundPost });
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    }      
// delete Post by ID
const deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundPost = await Post.findByPk(id);

    if (!foundPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    await foundPost.destroy();
    
    console.log('postName deleted ')
    res.status(204).send( "Deleted Successfully!" );
  } catch (error) {
    console.error(error);
    res.status(500).send(" Server Error");
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
