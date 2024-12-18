import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography, TextField, Box, Button } from '@mui/material';
import { adminInfo, userInfo} from '../../redux/slices/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { fetchMessageLoop, getPath } from '../../services/backendAPI';

interface DrawerInterface{
    refreshKey: number
}

export default function PersistentDrawerbox({refreshKey} : DrawerInterface) {
    const navigate = useNavigate()
    
    const [roles, setRoles] = useState(["Standard"]);
    const [roleInput, setRoleInput] = useState("");

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [id, setId] = useState<number>(-1);
    const [error, setError] = useState<string | null>(null);

    const boxTitle = adminInfo.userRegisterActive ? "Register User" : "Edit user"

    useEffect(() => {
        if (!adminInfo.userRegisterActive && adminInfo.userSelected) {
            setId(adminInfo.userSelected.Id);
            setUsername(adminInfo.userSelected.UserName);
            setFullName(adminInfo.userSelected.FullName);
            setPassword(adminInfo.userSelected.Password);
            setRoles(adminInfo.userSelected.Roles);
        }
    }, [adminInfo.userRegisterActive, adminInfo.userSelected]);

    const handleRemoveRole = (role: string) => {
        setRoles((prevRoles) => prevRoles.filter((r) => r !== role));
    };

    const handleAddRole = () => {

        if (roleInput.trim() && !roles.includes(roleInput.trim())) {
            setRoles((prevRoles) => [...prevRoles, roleInput.trim()]); 
            setRoleInput(""); 
        }
    };

    const handleDeleteUser = async () => {
        setError(null);
    
        try {
            const response = await fetch(getPath() + '/auth/deleteUser/'+username, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`,
                },
            });
    
            if (response.ok) {
                const jsonData = await response.json();
                const data = await fetchMessageLoop(jsonData.ticketId as string);

                navigate('/adminlistpage');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (err) {
            setError('Failed to delete user. Please try again.');
        }
    };

    const handleRegistration = async () => {
        setError(null);

        try {

            const response = await fetch(getPath()+'/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify({
                    userName: username,
                    password: password,
                    fullName: fullName,
                    roles: roles
                }),
            });

            if (response.ok) {
                const jsonData = await response.json();
                const data = await fetchMessageLoop(jsonData.ticketId as string);

                localStorage.setItem('token', data.token);
                navigate('/adminlistpage');
                 
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    const handleEditUser = async () => {
        setError(null);

        try {
            const response = await fetch(getPath()+'/auth/EditAsAdmin', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify({
                    id: id,
                    userName: username,
                    password: (password == undefined) ? "" : password,
                    fullName: fullName,
                    roles: roles
                }),
            });

            if (response.ok) {
                const data = await response.json();
                navigate('/adminlistpage')
                
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <Box 
            sx={{
                display: 'flex',
                height: '70vh',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px auto',
                transform: 'translateY(15%)'
            }}
        >
            
            <Box 
                sx={{
                    width: '85%',
                    maxWidth: 500,
                    height: 'auto',
                    padding: 3,
                    backgroundColor: '#292929',
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',            
                }}
            >
                {!adminInfo.userRegisterActive &&
                <Button 
                    sx={{ 
                        position: 'fixed',
                        transform: 'translateY(-10%)',
                        left: '20px',
                        color: 'white',
                        zIndex: 999,
                    }} 
                    onClick={() => {navigate('/adminlistpage')}}
                >
                    <ArrowBackIcon />
                </Button>
                }

                {!adminInfo.userRegisterActive && id != 1 && (
                    <Button
                        variant="contained"
                        color="error"
                        sx={{
                            position: 'fixed',
                            top: '-70px',
                            left: '50%',
                            zIndex: 9999,
                        }}
                        onClick={handleDeleteUser}
                    >
                        Delete User
                    </Button>
                )}
                
                <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: 'white' }}>
                    {boxTitle}
                </Typography>

                <TextField 
                    label="Username" 
                    variant="outlined" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField 
                    label="Password" 
                    type="password" 
                    variant="outlined" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField 
                    label="Full Name" 
                    variant="outlined" 
                    fullWidth 
                    sx={{ mb: 2 }}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                    <TextField 
                        label="Roles" 
                        variant="outlined" 
                        fullWidth 
                        value={roleInput}
                        onChange={(e) => setRoleInput(e.target.value)}
                        sx={{ mr: 1 }}
                    />
                    <Button 
                        variant="contained" 
                        sx={{ backgroundColor: '#444', color: '#fff' }}
                        onClick={() =>
                            {
                                handleAddRole()
                            }
                        } 
                    >
                        Add
                    </Button>
                </Box>

                <Button 
                    variant="contained"
                    sx={{ backgroundColor: '#444', color: '#fff' }}  
                    fullWidth
                    onClick={() => {adminInfo.userRegisterActive ? handleRegistration() : handleEditUser()}}
                >
                    Submit
                </Button>
            </Box>

            <Box
                sx={{
                    width: 200,
                    padding: 2,
                    backgroundColor: '#292929',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    height: '60vh',
                    marginLeft: 2,
                }}
            >
                
                <Typography variant="h5" sx={{ p: 1, textAlign: 'center', color: 'white' }}>
                    Roles
                </Typography>
                <List>
                    {roles.map((role, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => id != 1 && handleRemoveRole(role)}>
                                <ListItemText primary={role} sx={{ color: 'white', textAlign: 'center' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}