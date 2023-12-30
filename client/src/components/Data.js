import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@mui/material';
import { ThumbUp, Delete, MoreHoriz, ThumbDown } from "@mui/icons-material"
import moment from "moment"
import "moment/locale/tr"
import { postSil, postlarGetir } from '../api';

const Post = ({posts, setCurrentId }) => {


  const user = JSON.parse(localStorage.getItem('profile'));


  // const BegeniKontrol = () => {
  //   if (post.likes.length > 0) {

  //     return post.likes.find(like => like === user?.result?._id) ? (
  //       <><ThumbDown fontSize='small' color="secondary" />&nbsp;{post.likes.length}</>
  //     ) : (
  //       <><ThumbUp fontSize='small' />&nbsp;{post.likes.length}</>
  //     )

  //   }

  //   return <><ThumbUp fontSize='small' />&nbsp;0</>
  // }
  const DeletePost = (id) => {
    try {
      postSil(id);
    
    } catch (error) {
      console.error('Silme işlemi sırasında bir hata oluştu:', error);

    }
  }
  return (
    <div>
      {posts?.map((post)=>{
        return(
          <Card key={post._id} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: "15px", height: "100%", position: "relative", backgroundColor: "#edede9" }}>
          <CardMedia sx={{ height: 0, paddingTop: "56.25%", backgroundColor: "rgba(0,0,0,0.5)", backgroundBlendMode: "darken" }} image={post.selectedFile} title={post.title}></CardMedia>
          <div style={{ position: "absolute", top: "20px", color: "red", left: "20px" }}>
            <Typography variant="h6">{post.creator} </Typography>
            <Typography variant="body2">{moment(post.creator).fromNow()} </Typography>
          </div>
          <div>
  
            {(user?.result?._id === post?.creator) && (
              <Button onClick={() => setCurrentId(post._id)}>
                <MoreHoriz sx={{ position: "absolute", top: "10px", right: "20px", color: "gray" }} size="large" />
              </Button>
            )}
          </div>
          <div>
            <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px" }} variant='p' color="darkgray">{post.tags.map(tag => `#${tag} `)} </Typography>
            <Typography sx={{ padding: "0 10px" }} gutterBottom variant="h5" component="h2">{post.title} </Typography>
            <CardContent variant="p" color="darkgray">{post.message} </CardContent>
            <CardActions sx={{ padding: "0 8px 8px", display: "flex", justifyContent: "space-beween" }}>
  
              {/* <Button size="small" color="primary" disabled={!user?.result}>
                <BegeniKontrol />
                &nbsp;{post.likeCount}
              </Button> */}
              {(user?.result?._id === post?.creator) && (
                <Button size="small" color="primary" onClick={() => DeletePost(post._id)}>
                  <Delete fontSzie="small" />
                </Button>
              )}
            </CardActions>
  
          </div>
        </Card>
        )
      })}
     

    </div>
  )
}

export default Post
