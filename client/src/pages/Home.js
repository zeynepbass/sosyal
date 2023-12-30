
import { useState } from 'react'
import { Container, Grow, Grid } from '@mui/material'
import Posts from '../components/Data'
import Form from '../components/Event'
import { postlarGetir, postSil, createPost, postGuncelle } from '../api'
import { useEffect } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, TextField, Paper } from '@mui/material';
import { ThumbUp, Delete, MoreHoriz, ThumbDown } from "@mui/icons-material"
import FileBase from "react-file-base64";
import moment from "moment"
import axios from 'axios'
const Home = () => {

  const [currentId, setCurrentId] = useState(null)
  const user = JSON.parse(localStorage.getItem('profile'));
  const [data, setData] = useState([])
  const Veri = () => {

    try {
      postlarGetir().then((response) => {
        setData(response.data);
      })

    } catch (hata) {
      console.log(hata);
    }
  };
  useEffect(() => {
    Veri();


  }, [currentId, data._id, data]);



  const DeletePost = (id) => {
    try {
      postSil(id);

    } catch (error) {
      console.error('Silme işlemi sırasında bir hata oluştu:', error);

    }
  }
  const [postData, setPostData] = useState({

    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });


  const temizle = () => {
    setPostData({

      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setCurrentId(null);
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!currentId) {
        const postDataWithUser = { ...postData, name: user?.result?.name };

        // Make sure to replace '/posts' with the correct endpoint URL
        await axios.post("http://localhost:3801/posts", postDataWithUser)
          .then((response) => {
            // Assuming setPostData is a function to update the state with the response data
            setPostData(response.data);
            console.log(postData)
          })
          .catch((error) => {
            // Handle error
            console.error('Error submitting post:', error);
          });
      }
      else {
        await postGuncelle(currentId, postData)
        setCurrentId(null);
      }
    }
catch (error) {
  console.error('Güncelleme işlemi sırasında bir hata oluştu:', error);
      }
      temizle();
    }



  if (!user?.result?.name) {
    return (
      <Paper sx={{ backgroundColor: '#e9ecef' }}>
        <Typography variant='h6' align='center'>
          Lütfen giriş yapınız
        </Typography>
      </Paper>
    )
  }
  return (
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={3} sm={3}>

            <div>
              {data?.map((post) => {
                return (
                  <Card key={post._id} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: "15px", height: "100%", position: "relative", backgroundColor: "#edede9" }}>
                    <CardMedia sx={{ height: 0, paddingTop: "56.25%", backgroundColor: "rgba(0,0,0,0.5)", backgroundBlendMode: "darken" }} image={post.selectedFile} title={post.title}></CardMedia>
                    <div style={{ position: "absolute", top: "20px", color: "red", left: "20px" }}>

                      <Typography variant="body2">{moment().fromNow()} </Typography>
                    </div>
                    <div>

                      {(user?.result?.name === post.creator) && (
                     <Button onClick={() => { 
                      setCurrentId(post._id);
                    
                      const selectedPost = data.find(item => item._id === post._id);
                    
                      if (selectedPost) {
                        setPostData({
                          creator: selectedPost.creator,
                          title: selectedPost.title,
                          message: selectedPost.message,
                          tags: selectedPost.tags.join(','), // tags bir dizi olduğu için join kullanarak stringe çeviriyoruz
                          selectedFile: selectedPost.selectedFile
                        });
                      } else {
                        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
                      }
                    }}>
                    
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
                        {(user?.result?.name === post.creator) && (
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

          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ backgroundColor: "#e9ecef" }} >
              <form
                style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
                autoComplete="off"
                noValidate
                onSubmit={HandleSubmit}
              >
                <div style={{ width: "97%", margin: "10px auto" }}>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setPostData({ ...postData, selectedFile: base64 })
                    }
                  />
                </div>

                <Typography sx={{ marginBottom: "10px" }} variant="h6">
                  {currentId ? "POST GÜNCELLE" : "POST EKLE"}
                </Typography>

                <TextField
                  sx={{ margin: "5px" }}
                  name="creator"
                  variant="outlined"
                  label="zccasc"
                  fullWidth
                  value={postData.creator}
                  onChange={(e) =>
                    setPostData({ ...postData, creator: e.target.value })
                  }
                />
                <TextField
                  sx={{ margin: "5px" }}
                  name="title"
                  variant="outlined"
                  label="Oluşturan"
                  fullWidth
                  value={postData.title}
                  onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                  sx={{ margin: "5px" }}
                  name="message"
                  variant="outlined"
                  label="Oluşturan"
                  fullWidth
                  multiline
                  rows={4}
                  value={postData.message}
                  onChange={(e) =>
                    setPostData({ ...postData, message: e.target.value })
                  }
                />
                <TextField
                  sx={{ margin: "5px" }}
                  name="tags"
                  variant="outlined"
                  label="Oluşturan"
                  fullWidth
                  value={postData.tags}
                  onChange={(e) =>
                    setPostData({ ...postData, tags: e.target.value.split(",") })
                  }
                />

                <Button
                  sx={{ marginBottom: "10px" }}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                >
                  {currentId ? "GÜNCELLE" : "EKLE"}
                </Button>

                <Button
                  sx={{ marginBottom: "10px" }}
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={temizle}
                  fullWidth

                >
                  Temizle
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}
export default Home