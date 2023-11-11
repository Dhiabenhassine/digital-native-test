const router=require("express").Router()
const { createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById} = require("../Controller/postController");


router.post("/", createPost);
router.get("/getAll",getAllPosts)
router.get("/get/:id",getPostById)
router.put("/update/:id",updatePostById)
router.delete("/delete/:id",deletePostById)

module.exports = router;
