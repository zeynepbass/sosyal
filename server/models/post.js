import mongoose from 'mongoose'

const postSchema=mongoose.Schema({
name:String,

    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
  
    createdAt:{
        type:Date,
        default:new Date()
    },
    likes:{
        type:[String],
        default:[]
    }
    
})


const PostMessage=mongoose.model('PostMessage',postSchema);

export default PostMessage;