import React, { useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userInfo, setAuthenticated } from '../../redux/slices/userSlice';
import { fetchStatusLoop, getPath } from '../../services/backendAPI';
import { useDispatch } from 'react-redux';

export default function PersistentDrawerbox() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    dispatch(setAuthenticated(false))

    const boxStyle: React.CSSProperties = {
        width: '300px',
        height: '350px',
        backgroundColor: 'rgb(20, 20, 20)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '20px',
        padding: '20px',
    };

    const textFieldStyle: React.CSSProperties = {
        width: '100%',
    };

    const buttonStyle: React.CSSProperties = {
        marginTop: '10px',
        width: '95%',
        color: 'rgb(255,255,255)',
        backgroundColor: 'rgb(60,60,60)',
        borderRadius: '5px',
        bottom: '4%',
    };
    const handleLogin = async () => {
        setError(null);

        try {
            const response = await fetch(getPath() + '/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: username,
                    password: password,
                }),
            });

            if (response.ok) {
                const jsonData = await response.json();
                console.log('Login Response:', jsonData);

                const data = await fetchStatusLoop(jsonData.ticketId as string);
                console.log('Status Loop Response:', data);

                const token = data.result.message.token || data.result.message.Token;
                if (!token) {
                    throw new Error('Token is missing from the response');
                }

                localStorage.setItem('token', token);
                console.log('Token Saved:', token);

                // Set other user info
                userInfo.roles = data.result.message.Roles;
                userInfo.userName = data.result.message.UserName;
                userInfo.fullName = data.result.message.FullName;
                userInfo.token = token;

                if (data.result.succeeded) {
                    dispatch(setAuthenticated(true));
                    navigate('/userpage');
                } else {
                    const errorMessage = await response.text();
                    setError(errorMessage);
                }
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (err) {
            console.error('Login Error:', err);
            setError('Login failed. Please try again.');
        }
    };


    //const handleLogin = async () => {
    //    setError(null);

    //    try {
    //        const response = await fetch(getPath()+'/auth/login', {
    //            method: 'POST',
    //            headers: {
    //                'Content-Type': 'application/json',
    //            },
    //            body: JSON.stringify({
    //                userName: username,
    //                password: password,
    //            }),
    //        });

    //        if (response.ok) {
    //            const jsonData = await response.json();
    //            const data = await fetchStatusLoop(jsonData.ticketId as string);
                
                
    //            localStorage.setItem('token', data.result.message.token);
    //            if (!data.result.message.token) {
    //                console.error('Token is undefined or invalid in the HandleLogin');
    //            }
    //            console.log(data)
    //            userInfo.roles = data.result.message.Roles;
    //            userInfo.userName = data.result.message.UserName;
    //            userInfo.fullName = data.result.message.FullName;
    //            userInfo.token = data.result.message.Token;

    //            if (data.result.succeeded){
    //                dispatch(setAuthenticated(true))

    //                navigate('/userpage'); 
    //            } else{
    //                const errorMessage = await response.text();
    //                setError(errorMessage);
    //            }
    //        } else {
    //            const errorMessage = await response.text();
    //            setError(errorMessage);

    //        }
    //    } catch (err) {
    //        setError('Login failed. Please try again.');
    //    }

    //};
    
    return (
        <div style={boxStyle}>
            <Typography variant="h6" component="div" color={"rgb(255,255,255)"}>
                Enter Your Details
            </Typography>
            <TextField
                label="Username"
                variant="outlined"
                style={textFieldStyle}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                style={textFieldStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" style={buttonStyle} onClick={handleLogin}>
                Login
            </Button>
            {error && <Typography color="error">{error}</Typography>}
        </div>
    );
}