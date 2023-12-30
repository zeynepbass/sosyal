import React, { useState,useEffect } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { postGuncelle,createPost } from "../api";
import axios from "axios";
const Form = ({ setCurrentId,currentId }) => {

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const user=JSON.parse(localStorage.getItem('profile'))
  // const post=useSelector((state)=> currentId ? state.posts.find((p)=>p._id===currentId):null)
  const temizle = () => {
    setPostData({
    
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setCurrentId(null);
  };

  
  useEffect(() => {

    if (currentId) {
      const currentPost = postData.find(post => post._id === currentId);
      setPostData(currentPost || { creator: '', title: '', message: '', tags: '' });
    }
  }, [currentId]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentId) {
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

if(!user?.result?.name){
	return (
	  <Paper sx={{backgroundColor:'#e9ecef'}}>
		<Typography variant='h6' align='center'>
		  Lütfen giriş yapınız
		</Typography>
	  </Paper>
	)
}
  return (
    
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
  );
};

export default Form;
