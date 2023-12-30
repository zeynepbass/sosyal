import PostMessage from '../models/post.js'
import mongoose from 'mongoose';

const getPosts=async (req,res)=>{

    try {
        const postMessage=await PostMessage.find();
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
const getPost=async (req,res)=>{
    const {id}=req.params;

    try {
        const post=await PostMessage.findById(id)

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}


const createPost=async (req,res)=>{

    const post=req.body;

    const newPost=new PostMessage({...post,createdAt:new Date().toISOString()});
    //postun tüm alanlarını getirdik creator kullanıcının ıd tutucak saatı yerel saatı kullandık toıso kısmı saatı aktardık bu creator kısmı burda ekelndı o yuzden form kısmından sildik

    try {

        await newPost.save(); //veritabanına kaydeder
        res.status(201).json(newPost)
        
    } catch (error) {
        res.status(409).json({message:error.message})
    }
	
	//HTTP STATUS CODE ları inceleyelim
	//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
}

const updatePost=async (req,res)=>{
    const {id:_id}=req.params; //id yakaladık

    const post=req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))  res.status(404).send('Post Bulunamadı')

    const guncelPost=await PostMessage.findByIdAndUpdate(_id,post,{new:true});

    res.status(200).json(guncelPost)
}
const deletePost = async (req, res) => {
    const { id: _id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send('Post silindi'); //mongodb object ıd olup olmadığını kontrol ettik
  
    await PostMessage.findByIdAndDelete(_id);
    res.status(200).json({ message: 'post silindi' });
  };
  
const likePost=async (req,res)=>{
    const {id}=req.params; //id yakaladık

    if(!req.userId) return res.json({message:'Yetkisiz giriş'}) //token varsa dolu 
    //req userıd ıcı yok ise begenme ıslemı olmasın


    if(!mongoose.Types.ObjectId.isValid(id))  res.status(404).send('Post Bulunamadı') //post bulunamdı

    const post=await PostMessage.findById(id) //postu cafgırıyoruz

    const index=post.likes.findIndex((id)=>id===String(req.userId))

    if(index===-1){
        //begenme işlemi
        post.likes.push(req.userId)
    }else{
        //begenme işlemini geri alma
        post.likes=post.likes.filter((id)=>id!==String(req.userId))
    }

    const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true})

    res.status(200).json(updatedPost)

}

export {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost
}