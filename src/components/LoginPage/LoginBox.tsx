import React, { useState } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PersistentDrawerbox() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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
            const response = await fetch('http://localhost:5002/api/Authentication/login', {
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
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate('/userpage'); 
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };
    
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