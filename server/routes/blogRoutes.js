const express=require('express');
const router=express.Router();
const blogController=require('../controllers/blogController');
const {protect}=require('../middleware/authMiddleware');

router.get('/',blogController.getBlogs);
router.get('/myblogs',protect,blogController.getUserBlogs);
router.post('/',protect,blogController.createBlog);
router.put('/:id',protect,blogController.updateBlog);
router.delete('/:id',protect,blogController.deleteBlog);
router.post('/:id/like',protect,blogController.likeblog);

module.exports=router;

