
import PostMessage from "../models/post.js"
import mongoose from "mongoose";
const getPosts=async (req,res)=>{

    try {
        const postMessage=await PostMessage.find();
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const createPost=async (req,res)=>{

    const post=req.body;

    const newPost=new PostMessage(post);

    try {

        await newPost.save();
        res.status(201).json(newPost)
        
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}
const updatePost=async(req,res)=>{
    const {id:_id}=req.params;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send("post bulunamadı")
  
    const guncelPost=await PostMessage.findByIdAndUpdate(_id,post,{new:true});
    res.status(200).json(guncelPost)
}
const deletePost=async (req,res)=>{
    const {id:_id}=req.params;


    if(!mongoose.Types.ObjectId.isValid(_id))  res.status(404).send('Post silindi') 
 await PostMessage.findOneAndDelete({ _id });
  res.status(200).json({message:'post silindi'})
  
  }
export {getPosts,createPost,updatePost,deletePost}