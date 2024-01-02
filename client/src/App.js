import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { Navbar } from './components/Navbar';

import { Route,Routes } from 'react-router-dom';
import Home from "./pages/Home.js"
import Signin from "./pages/Signin.js"
import Signup from "./pages/Singup.js"
import Favori from "./pages/Favori.js"
function App() {

  return (
    <div className='container-fluid p-0 mr-0' style={{background:"#F5F0EC"}}>

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>  
       <Routes>
       <Route path='/signin' element={<Signin/>} />
       <Route path='/signup' element={<Signup/>} />
       <Route path='/favori' element={<Favori/>} />
      </Routes>
    

    </div>
  );
}

export default App;
