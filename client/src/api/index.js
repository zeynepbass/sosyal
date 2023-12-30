import axios from "axios"

const API=axios.create({baseURL:"http://localhost:3801"})

const url="/posts"
API.interceptors.request.use((req) => {
  const profile = JSON.parse(localStorage.getItem('profile'));

  if (profile && profile.token) {
    console.log(`Adding token to headers: ${profile.token}`);
    req.headers.Authorization = `Bearer ${profile.token}`;
  }

  return req;
});
  
export const postlarGetir= ()=> axios.get(url)

export const createPost= (post)=> API.post(url,post);
export const postGuncelle=(id,updatedPost)=>API.patch(`${url}/${id}`,updatedPost)
export const postSil=(id)=> API.delete(`${url}/${id}`)
export const begeniDegistir=(id)=>API.patch(`${url}/${id}/likePost`)

export const girisYap=(formData)=>axios.post('/user/signin',formData)
export const uyeOl=(formData)=>axios.post('/user/signup',formData)


