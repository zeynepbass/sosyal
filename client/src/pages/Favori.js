import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
const Favori = () => {
  const [data,setData]=useState([])
  useEffect(()=>{
    LocalStorage();
  })
  const LocalStorage=()=>{
    const user = JSON.parse(localStorage.getItem('profile'));
    const username = user?.result?.name;
    if(username){
      const userFavorites = JSON.parse(localStorage.getItem(`favorites_${username}`)) || [];
      setData(userFavorites)
    }
   
  }
const favoriDelete=(id)=>{
  const user = JSON.parse(localStorage.getItem('profile'));
  const username = user?.result?.name;
  const userFavorites = JSON.parse(localStorage.getItem(`favorites_${username}`)) || [];

  // Belirli id'yi içermeyen bir yeni liste oluştur
  const updatedFavorites = userFavorites.filter((favorite) => favorite._id !== id);

  // Yeni favori listesini localStorage'e kaydet
  localStorage.setItem(`favorites_${username}`, JSON.stringify(updatedFavorites));
}

  return (
    <div>
    {data.length === 0 ? <div className='row pt-4' style={{justifyContent:"center"}}><p style={{fontWeight:"bold",paddingTop:"50px",paddingRight:"10px "}}>Favorilerin Boş</p> <img src="/images/i-dont-know.png" width="100" height="100" ></img></div> : (
      data.map((post) => (
        <div className='row' key={post._id}>
          <div className='col-4 p-0 pt-3'>
            <div className='card p-2' style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: "15px", height: "100%", position: "relative", backgroundColor: "white" }}>
              <div className='row p-0 m-0'>
                <div className='col-6'>
                  <h6>{moment().fromNow()} </h6>
                </div>
                <div className='col-6'>
                  <i className="fas fa-trash-alt pt-2 mt-2" style={{ float: "right", paddingBottom: "10px", color: "gray", cursor: "pointer" }} onClick={() => favoriDelete(post._id)}></i>
                </div>
              </div>
              <div>
                <img src={post.selectedFile} alt='' style={{ width: "100%", height: "80%" }} />
                <h6 style={{ display: "flex", justifyContent: "space-between", margin: "10px" }} color="darkgray">
                  {post.tags.map(tag => `#${tag} `)}
                </h6>
                <p className='p'>{post.message}</p>
                <p style={{ padding: "0 8px 8px", display: "flex", justifyContent: "space-beween" }}>
                  {/* Bunu istediğiniz şekilde doldurun */}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
  
  )
}

export default Favori
