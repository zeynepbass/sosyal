
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material'
import { Link, useLocation,useNavigate } from 'react-router-dom'

import { useState, useEffect } from 'react'

import { jwtDecode } from 'jwt-decode';

export const Navbar = () => {
  const location = useLocation();

const navigate=useNavigate();


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const Logout = () => {
 
  localStorage.clear()
    navigate('/signin');
  
    setUser(null);
  };

  useEffect(() => {

    setUser(JSON.parse(localStorage.getItem('profile')));

  }, [location]);
  useEffect(() => {

    const token = user?.token;
  
    if (token) {
      const decodedToken = jwtDecode(token);
  
      console.log(decodedToken);
      console.log(new Date().getTime());
  
      if (decodedToken.exp * 1000 < new Date().getTime()) Logout();
    }
  
    setUser(JSON.parse(localStorage.getItem('profile')));
  
  }, [location]);
  return (

    <AppBar sx={{ borderRadius: 5, margin: '30px 0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px 50px', backgroundColor: '#778da9' }} position='static' color='inherit'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ color: 'black', textDecoration: 'none' }} component={Link} to="/" variant='h3' align="center"> AOS Sosyal</Typography>
      </div>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {user?.result ? (
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '150px', alignItems: 'center', }}>
            <Avatar  >{user?.result.name.charAt(0)}</Avatar>
            <Button variant="contained" color="secondary" onClick={Logout}>Çıkış</Button>
          </div>
        ) : (
          <Button component={Link} to="/signin" variant="contained" color="secondary">GİRİŞ YAP</Button>
        )}
      </Toolbar>


    </AppBar>
  )
}
