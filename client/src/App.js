import {Container,AppBar,Typography,Grow,Grid} from '@mui/material';
import Posts from "./components/Posts.js";
import Form from "./components/Event.js";
// import memories from './images/memories.png';
import { useEffect,useState } from 'react';
import {useDispatch} from 'react-redux';
import {getPosts} from './actions/Veri.js';
function App() {
  const dispatch=useDispatch()
const [currentId,setCurrentId]=useState(null);
  useEffect(()=>{
  dispatch(getPosts());
  },[dispatch,currentId])
  return (
    <Container maxWidth="lg">
    <AppBar sx={{marginBottom:'15px',backgroundColor:'#778da9'}} position='static' color='inherit'>
      <Typography variant='h2' align="center"> Anılar</Typography>
      
    </AppBar>
    <Grow in>
      <Container>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={8}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  </Container>
  );
}

export default App;
