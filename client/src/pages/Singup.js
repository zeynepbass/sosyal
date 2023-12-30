

//Signup.js



import React,{useState} from 'react'
import { Container,Paper,Avatar,Typography,Grid,Button } from '@mui/material'
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Input from '../components/Input'

import { useNavigate } from 'react-router-dom';
import {uyeOl} from "../api"
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

 const Signup = () => {
    const navigate=useNavigate();
    const [form, setForm] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            uyeOl(form)
            navigate("/signin")


        } catch (error) {

        }
    };

  return (
    <Container component="main" maxWidth="xs">
        <Paper sx={{marginTop: 10,display: 'flex',flexDirection: 'column',alignItems: 'center',padding: 2,}} elevation={3}>
            <Avatar >
                <LockPersonIcon color='secondary' />
            </Avatar>
            <Typography sx={{marginBottom:5}} component="h1" variant="h5">Üye Ol</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} >
                    <Input name="firstName" label="İsminiz" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Soyisminiz" handleChange={handleChange} half />
                    <Input name="email" label="Email Adresiniz" type="email" handleChange={handleChange}/>
                    <Input name="password" label="Parolanız" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    <Input name="confirmPassword" label="Parola Tekrarı" handleChange={handleChange} type="password" />
                </Grid>
                <Button sx={{marginTop:5}} type="submit" fullWidth variant="contained" color="secondary" >
                Üye Ol
                </Button>
            </form>
        </Paper>
    </Container>
  )
}
export default Signup