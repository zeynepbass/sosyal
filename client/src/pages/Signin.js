

import { Container, Paper, Avatar, Typography, Grid, Button } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from '../components/Input'
import { girisYap } from "../api"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {

    const initialState = { email: '', password: '' };
    const [form, setForm] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            girisYap(form).then((response) => {
                localStorage.setItem('profile', JSON.stringify(response.data));
                navigate("/")
            })
                .catch((error) => {


                });


        } catch (error) {

        }
    };


    return (
        <Container component="main" maxWidth="xs">
            <Paper sx={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, }} elevation={3}>
                <Avatar >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography sx={{ marginBottom: 5 }} component="h1" variant="h5">Giriş Yap</Typography>
                <form onSubmit={handleSubmit} >
                    <Grid container spacing={2} >
                        <Input name="email" label="Email Adresiniz" type="email" handleChange={handleChange} />
                        <Input name="password" label="Parolanız" handleChange={handleChange} type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword} />
                    </Grid>
                    <Grid sx={{ marginTop: 10 }}  >
                        <Grid item>
                            <Typography>Henüz üye değilseniz</Typography>
                            <Button component={Link} to="/signup" variant='text' color="secondary" fullWidth>
                                ÜYE OL
                            </Button>
                        </Grid>
                    </Grid>
                    <Button sx={{ marginTop: 5 }} type="submit" fullWidth variant="contained" color="primary" >
                        Giriş Yap
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}
export default Signin