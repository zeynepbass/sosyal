import React from 'react'
import { useSelector } from 'react-redux'
import { Grid,CircularProgress} from '@mui/material'
import Data from "./Data.js"
const Post = ({setCurrentId}) => {
  const posts=useSelector((state)=>{
    return state.posts
  })

  return (
    !posts.length ? (
      <CircularProgress />
    ) : (
      <Grid container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Data data={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Post
