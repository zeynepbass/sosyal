import React, { useState,useEffect } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { createPost, updatedPost } from "../actions/Veri";
const Form = ({ setCurrentId, currentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const post=useSelector((state)=> currentId ? state.posts.find((p)=>p._id===currentId):null)
  const temizle = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setCurrentId(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatedPost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    temizle()
  };


useEffect(()=>{
  if(post) setPostData(post)
},[post])
  return (
    <Paper sx={{ backgroundColor: "#e9ecef" }} onSubmit={handleSubmit}>
      <form
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        autoComplete="off"
        noValidate
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
          label="Oluşturan"
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
