import React from 'react'
import { useSelector } from 'react-redux'
import { Grid,CircularProgress} from '@mui/material'

import Data from "./Data.js"
const Post = ({setCurrentId}) => {
  const [veri, setData] = useState([])
  useEffect(() => {
    postlarGetir().then((response) => setData(response.data))
      .catch((error) => console.log(error))
  }, [])
  
  
  return (
    !post.length ? (
      <CircularProgress />
    ) : (
      <Grid container alignItems="stretch" spacing={3}>
        {veri.map((post) => (
          <Grid key={post._id} item xs={12} sm={3}>
            <Data posts={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Post
