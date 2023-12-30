import express from 'express'
import auth from '../middleware/auth.js'
import {getPosts,createPost,updatePost, deletePost, likePost,getPost} from '../controller/Posts.js'
const router=express.Router();
router.get('/',getPosts)
router.post('/',createPost)
router.patch('/:id',updatePost)
router.delete('/:id',deletePost)
router.patch('/:id/likePost',auth,likePost)
router.get('/:id',getPost)
export default router;