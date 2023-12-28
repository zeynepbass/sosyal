import axios from "axios"
const url="/posts"
export const postlarGetir= ()=> axios.get(url)
export const postOlustur=(newPost)=>axios.post(url,newPost);
export const postGuncelle=(id,updatedPost)=>axios.patch(`${url}/${id}`,updatedPost)
export const postSil=(id)=>axios.delete(`${url}/${id}`)
