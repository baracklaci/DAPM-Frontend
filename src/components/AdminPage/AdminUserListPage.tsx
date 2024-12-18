import React, { useEffect, useState } from 'react';
import { Box, Typography, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { adminInfo, User, userInfo } from '../../redux/slices/userSlice';
import { fetchMessageLoop, getPath } from '../../services/backendAPI';

const handleUserList = async () => {
    try {
        const response = await fetch(getPath() + '/auth/GetUsers', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Authorization': `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });

        if (response.ok) {
            const jsonData = await response.json();
            const data = await fetchMessageLoop(jsonData.ticketId as string);
            return data;
        } else {
            console.error('Failed to fetch:', response.status, response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Network error:', error);
        return [];
    }
};

export default function PersistentDrawerbox() {
    const navigate = useNavigate();

    const [userList, setUserList] = useState<User[]>([]);
    console.log(userList);

    useEffect(() => {
        const fetchUserData = async () => {
            const users = await handleUserList();
            setUserList(users);
        };

        fetchUserData();
    }, []);

    return (
        <Box display="flex" flexDirection="column" gap={2} margin={'15px'}>
            {userList.map((user, index) => (
                <ButtonBase 
                    key={user.Id} 
                    onClick={() => {
                        adminInfo.userRegisterActive = false;
                        adminInfo.userSelected = user;
                        navigate('/admineditpage'); 
                    }}
                    sx={{ 
                        padding: 2, 
                        border: '1px solid gray', 
                        borderRadius: 2, 
                        width: '1260px',
                        height: '50px',  
                        textAlign: 'center' 
                    }}
                >
                    <Box display="flex" width="100%" alignItems="center">
                <Typography
                    variant="h6"
                    color="white"
                    sx={{ flex: 1, textAlign: 'left' }}
                >
                    {user.UserName}
                </Typography>
                <Typography
                    variant="h6"
                    color="white"
                    sx={{ flex: 1, textAlign: 'center', width: '200px' }}
                >
                    {user.FullName}
                </Typography>
                <Typography
                    variant="h6"
                    color="white"
                    sx={{ flex: 1, textAlign: 'right' }}
                >
                    {user.Roles.join(', ')}
                </Typography>
            </Box>
                </ButtonBase>
            ))}
        </Box>
    );
}