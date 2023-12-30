import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { Navbar } from './components/Navbar';

import { Route,Routes } from 'react-router-dom';
import Home from "./pages/Home.js"
import Signin from "./pages/Signin.js"
import Signup from "./pages/Singup.js"
function App() {

  return (
    <Container maxWidth="lg">

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>  
       <Routes>
       <Route path='/signin' element={<Signin/>} />
       <Route path='/signup' element={<Signup/>} />
      </Routes>
    

    </Container>
  );
}

export default App;
