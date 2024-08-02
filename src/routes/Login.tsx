import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Dialog, Alert} from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import CheckIcon from '@mui/icons-material/Check';
import { login } from '../services/user';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState(false);

    interface UserLogin {
        username: string;
        password: string;
    }

    React.useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        if (savedUsername && savedPassword) {
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = (values: UserLogin, { setSubmitting }: FormikHelpers<UserLogin>) => {
        if (rememberMe) {
            localStorage.setItem('username', values.username);
            localStorage.setItem('password', values.password);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }

        login({ ...values }).then((result) => {
            result.json().then((response) => {
                const { code, data } = response;
                if (code === 200) {
                    setOpen(true);
                    console.log('login successful');
                    sessionStorage.setItem("Token", data);
                    setTimeout(() => {
                        navigate('/');
                        window.location.reload();
                    }, 3000)
                }
            }).catch((err) => {
                console.error('Error during login:', err);
            }).finally(() => {
                setSubmitting(false);
            });
        }).catch((err) => {
            console.error('Error during login:', err);
            setSubmitting(false);
        });
    }

    const handleclose = () => {
        console.log("jump");
    }

    const validateForm = (values: UserLogin) => {
        const errors: Partial<UserLogin> = {};
        if (!values.username) {
            errors.username = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        return errors;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         
         <Dialog open={open}
            onClose={handleclose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">Login successed !</Alert>
        </Dialog>

            <Button
                variant="outlined"
                size="small"
                sx={{ position: "fixed", left: 30, top: 30 }}
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/")}
            >
                Back
            </Button>
            <Box sx={{ mt: 3, width: 300, background: '#20242a', padding: 3, borderRadius: 1 }}>
                <Formik
                    initialValues={{
                        username: localStorage.getItem('username') || '',
                        password: localStorage.getItem('password') || ''
                    }}
                    validate={validateForm}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Typography align="center" sx={{ mb: 2, fontSize: 16, color: "#fff" }}>Log In</Typography>
                            <Field
                                as={TextField}
                                size="small"
                                fullWidth
                                id="username"
                                label="username"
                                name="username"
                                helperText={<ErrorMessage name="username">{(msg: string) => <span style={{ color: 'red' }}>{msg}</span>}</ErrorMessage>}
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
                                sx={{ mt: 2 }}
                                helperText={<ErrorMessage name="password">{(msg: string) => <span style={{ color: "red" }}>{msg}</span>}</ErrorMessage>}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                        name="rememberMe"
                                        color="default"
                                        sx={{ color: 'white' }}
                                    />
                                }
                                label={<Typography sx={{ color: 'white' }}>Remember me</Typography>}
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }} disabled={isSubmitting}>
                                {isSubmitting ? 'Logging in...' : 'LOG IN'}
                            </Button>
                            <Button variant="outlined" fullWidth onClick={() => navigate('/Register')}>REGISTER</Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </div>
    );
}

export default Login;
