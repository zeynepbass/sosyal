import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import {ThumbUp,Delete,MoreHoriz} from "@mui/icons-material"
import {useDispatch} from "react-redux"
import {deletePost} from "../actions/Veri"
import moment from "moment"
import "moment/locale/tr"
const Post = ({data,setCurrentId}) => {
  const dispatch=useDispatch()
  return (
    <div>
      <Card sx={{display:"flex", flexDirection:"column", justifyContent:"space-between", borderRadius:"15px", height:"100%", position:"relative",backgroundColor:"#edede9"}}>
        <CardMedia sx={{height:0,paddingTop:"56.25%", backgroundColor:"rgba(0,0,0,0.5)",backgroundBlendMode:"darken"}} image={data.selectedFile} title={data.title}></CardMedia>
        <div style={{position:"absolute",top:"20px", color:"red",left:"20px"}}>
       <Typography variant="h6">{data.creator} </Typography>
       <Typography variant="body2">{moment(data.creator).fromNow()} </Typography>
        </div>
        <div>
          <Button onClick={()=>setCurrentId(data._id)}>
            <MoreHoriz sx={{position:"absolute",top:"10px",right:"20px",color:"gray" }} size="large"/>
          </Button>
        </div>
        <div>
          <Typography sx={{display:"flex", justifyContent:"space-between", margin:"10px"}} variant='p' color="darkgray">{data.tags.map(tag=>`#${tag} `)} </Typography>
          <Typography sx={{padding:"0 10px"}} gutterBottom variant="h5" component="h2">{data.title} </Typography>
          <CardContent variant="p" color="darkgray">{data.message} </CardContent>
          <CardActions sx={{padding:"0 8px 8px", display:"flex", justifyContent:"space-beween" }}> 
          <Button size="small" color="primary">
            <ThumbUp fontSize="small"/>{data.likeCount}
          </Button>
          <Button size="small" color="primary" onClick={()=>dispatch(deletePost(data._id))}>
            <Delete fontSzie="small"/>
          </Button>
          </CardActions>
          
        </div>
              </Card> 

    </div>
  )
}

export default Post
