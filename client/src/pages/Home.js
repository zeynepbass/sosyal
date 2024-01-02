
import { useState } from 'react'
import { postlarGetir, postSil, postGuncelle } from '../api'
import { useEffect } from 'react'
import FileBase from "react-file-base64";
import moment from "moment"
import axios from 'axios'
import { Link } from 'react-router-dom';
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


    message: "",
    tags: "",
    selectedFile: "",
  });


  const temizle = () => {
    setPostData({


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

          })
          .catch((error) => {
            // Handle error
            console.error('Error submitting post:', error);
          });
      }
      else {
        await postGuncelle(currentId, { ...postData, name: user?.result?.name })
        setCurrentId(null);
      }
    }
    catch (error) {
      console.error('Güncelleme işlemi sırasında bir hata oluştu:', error);
    }
    temizle();
  }

  const Favori = (post) => {
    const username = user?.result?.name;
  
    // Eğer kullanıcı giriş yapmışsa
    if (username) {
      // Kullanıcının favori listesini al
      const userFavorites = JSON.parse(localStorage.getItem(`favorites_${username}`)) || [];
  
      // Eğer post favorilerde yoksa, favorilere ekle
      if (!userFavorites.some(existingPost => existingPost._id === post._id)) {
        userFavorites.push(post);
  
        // Yeni favori listesini kullanıcının localStorage alanına kaydet
        localStorage.setItem(`favorites_${username}`, JSON.stringify(userFavorites));
      }
    }
  };
  

  if (!user?.result?.name) {
    return (
      <div style={{ backgroundColor: '#e9ecef' }}>
        <h5 align='center'>
          Lütfen giriş yapınız
        </h5>
      </div>
    )
  }
  return (


    <div className='container pt-4' style={{ justifyContent: "space-between", alignItems: "stretch" }}  >
      <div className='row' >

        <div className='col-md-5 pr-3'>
          <div class="" style={{ backgroundColor: "white", borderRadius: "10px" }}>
            <h5 className='pt-2' style={{ textAlign: "center" }} >Hoşgeldin, {user?.result?.name}</h5>
            <div class="card-body">
              <h5 class="card-title">Favorilerin</h5>




            </div>
          </div>
        </div>




        <div className='col-md-7 p-0 m-0' >
          <div className="p-3" style={{ backgroundColor: "white", borderRadius: "10px" }} >
            <h5 style={{ marginBottom: "10px", textAlign: "center" }} >
              {currentId ? "POST GÜNCELLE" : "POST EKLE"}
            </h5><br></br>
            <form onSubmit={HandleSubmit}
              style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}


            >




              {/* 
            <input
              style={{ margin: "5px" }}
              name="title"
              variant="outlined"
              label="Oluşturan"
              fullWidth
              value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            /> */}
              <div className="form-group w-100">
                <input
                  style={{ margin: "5px" }}
                  name="message"



                  placeholder='message'
                  className='form-control'

                  value={postData.message}
                  onChange={(e) =>
                    setPostData({ ...postData, message: e.target.value })
                  }
                /></div>
              <div className="form-group w-100">
                <input
                  style={{ margin: "5px" }}
                  name="tags"
                  placeholder='tags'
                  className='form-control'
                  value={postData.tags}
                  onChange={(e) =>
                    setPostData({ ...postData, tags: e.target.value.split(",") })
                  }
                /></div>
              <div style={{ width: "97%", margin: "10px auto" }}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPostData({ ...postData, selectedFile: base64 })
                  }

                />


              </div>







              <button type="submit" data-dismiss="modal" className="btn btn-primary" style={{ height: "40px", borderRadius: "50px", width: "100px", background: "#0a66c2" }}>
                {currentId ? "GÜNCELLE" : "Gönderi"}
              </button>



            </form>

          </div>
          <hr></hr>
          {data?.map((post) => {
            return (
              <>
                <div className='row'>



                  <div className='col-md-12  p-0 pt-3 ' key={post._id}>
                    <div className='card p-2' style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: "15px", height: "100%", position: "relative", backgroundColor: "white" }}>

                      <div className='row p-0 m-0' >
                        <div className='col-6 '>




                          <h5 style={{ color: "black", fontSize: "15px" }}>{user.result.name}  </h5>
                          <h6 >{moment().fromNow()} </h6>
                        </div>
                        <div className='col-6'>


                          {(user?.result?.name === post?.name) && (

                            <i class="fa-solid fa-pencil pt-2 mt-2" style={{ float: "right", paddingBottom: "10px", color: "gray" }} onClick={() => {
                              setCurrentId(post._id);

                              const selectedPost = data.find(item => item._id === post._id);

                              if (selectedPost) {
                                setPostData({


                                  message: selectedPost.message,
                                  tags: selectedPost.tags.join(','), // tags bir dizi olduğu için join kullanarak stringe çeviriyoruz
                                  selectedFile: selectedPost.selectedFile
                                });
                              } else {
                                setPostData({ message: '', tags: '', selectedFile: '' });
                              }
                            }}>

                            </i>

                          )}
                          <Link className="nav-link mr-3 mb-2" style={{ textAlign: "right" }} ><i className="fas fa-heart" style={{ color: "gray" }} onClick={()=>Favori(post)}></i></Link>
                        </div>
                      </div>



                      <div>
                      </div>
                      <div>
                        <img src={post.selectedFile} alt='' style={{ width: "100%", height: "80%" }}></img>
                        <h6 style={{ display: "flex", justifyContent: "space-between", margin: "10px" }} color="darkgray">{post.tags.map(tag => `#${tag} `)} </h6>

                        <p className='p'>{post.message} </p>
                        <p style={{ padding: "0 8px 8px", display: "flex", justifyContent: "space-beween" }}>

                          {/* <Button size="small" color="primary" disabled={!user?.result}>
                <BegeniKontrol />
                &nbsp;{post.likeCount}
              </Button> */}
                          {(user?.result?.name === post?.name) && (

                            <i className="fas fa-trash-alt" style={{cursor:"pointer"}} onClick={() => DeletePost(post._id)}></i>

                          )}
                        </p>

                      </div>
                    </div>
                  </div>

                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>


  )
}
export default Home