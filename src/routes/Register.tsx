import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';
import { Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Dialog, Alert } from '@mui/material';
import {ErrorMessage, Field, Form, Formik} from "formik";
import CheckIcon from '@mui/icons-material/Check';
import {register} from '../services/user';

const Register = () => {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (values: UserLogin) => {
        console.log('submit', values);
        // event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });

        const params:any = {};

        params.username = values.username;
        params.password = values.password;

        register(params).then((result: any) => {
console.log(result);
            const {status} = result;
            if (status === 200) {
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                    navigate('/login');
                }, 3000)
            }

        }).catch((err) => {
            throw err;
        });
        
    }

    interface UserLogin {
        username?: String | undefined;
        password?: String | undefined;
        password1?: String | undefined;
    }

    const handleclose = () => {
        console.log("jump");
    }

    const validateForm = (values: UserLogin) => {
        const errors: UserLogin = {};
        console.log(values);
        if (!values.username) {
            errors.username = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }

        if (!values.password1) {
            errors.password1 = 'Required'
        }
        console.log(errors)

        return errors;
    }

    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Dialog open={open}
            onClose={handleclose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">register successed !</Alert>
        </Dialog>

        <Button variant="outlined" size={"small"} sx={{position: "fixed", left: 30, top: 30}} startIcon={<ArrowBackIcon/>} onClick={() => navigate("/")}>Back</Button>
        <Box sx={{ mt: 3, width: 200, background: '#20242a', padding: 2, paddingBottom: 4}}>
            <Formik       
                initialValues={{ username: '', password: '', password1: '' }}
                validate={validateForm}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Typography align={"center"} sx={{mb: 2, fontSize: 16, color: "#fff"}}>REGISTER</Typography>
                    <Field
                        as={TextField}
                        size="small"
                        fullWidth
                        id="username"
                        label="username"
                        name="username"
                        helperText={<ErrorMessage name="username">{(msg: any) => <span style={{color: 'red'}}>{msg}</span>}</ErrorMessage>}
                    />
                    <Field
                        as={TextField}
                        size="small"
                        fullWidth
                        name="password"
                        label="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        sx={{mt: 2}}
                        helperText={<ErrorMessage name="password" >{(msg: any) => <span style={{color: "red"}}>{msg}</span>}</ErrorMessage>}
                    />
                    <Field
                        as={TextField}
                        size="small"
                        fullWidth
                        name="password1"
                        label="password1"
                        type="password1"
                        id="password1"
                        autoComplete="current-password"
                        sx={{mt: 2}}
                        helperText={<ErrorMessage name="password1" >{(msg: any) => <span style={{color: "red"}}>{msg}</span>}</ErrorMessage>}
                    />
                    <Button variant="outlined" sx={{mt: 2}} fullWidth type="submit">REGISTER</Button>
                </Form>
            </Formik>
        </Box>
    </div>
}

export default Register;