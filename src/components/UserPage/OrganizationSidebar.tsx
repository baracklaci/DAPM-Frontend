import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import { fetchOrganisations,fetchOrganisation, fetchStatus, fetchOrganisationRepositories, fetchRepository, fetchRepositoryResources, putResource } from '../../services/backendAPI';
import { request } from 'http';
import React, { ChangeEvent } from 'react';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {

    const [organisations, setOrganisations] = useState([
        {
            id: 1,
            name: "Organisation 1",
            apiUrl: 'http://org1.dk'
        },
        {
            id: 2,
            name: "Organisation 2",
            apiUrl: 'http://org2.dk'
        },
    ])

    
    //Here is a test for the file upload add the div in the bottom to the return section and try to upload a file :)
    /*
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

     const uploadResource = async () => {
        if (file) {
            const orgId = 1; // You can replace these values with your actual organization and repository IDs
            const repId = 1;

            const formData = new FormData();
            formData.append('Name', 'json3');
            formData.append('ResourceFile', file);

            try {
                const result = await putResource(orgId, repId, formData);
                console.log('Resource successfully uploaded:', result);
            } catch (error) {
                console.error('Error uploading resource:', error);
            }
        } else {
            console.error('No file selected.');
        }
    };

    //Add this to the return to get a file upload form.
    <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadResource}>Upload</button>
    </div>
    */
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await fetchOrganisations();
                const repositories = await fetchRepository(1,1);
                const resources = await fetchRepositoryResources(1,1);
                console.log(repositories);
                console.log(resources);
                setOrganisations(request.result.organizations)
            } catch (error) {
                // Handle error if needed
                console.error('Error fetching organisations:', error);
            }
        };
      
        fetchData();
    }, []);

    

    const repositories = {
        repositories: [
            {
                name: "Repository 1",
                id: "rep1"
            },
            {
                name: "Repository 1",
                id: "rep1"
            },
        ]
    }

    const resources = {
        resources: [
            {
                name: "Resource 1",
                id: "res1"
            },
        ]
    }

    return (
        <Drawer
            PaperProps={{
                sx: {
                    backgroundColor: '#292929',
                }
            }}
            sx={{
                width: drawerWidth,
                position: 'static',
                flexGrow: 1,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Divider />
            <DrawerHeader>
                <Typography sx={{ width: '100%', textAlign: 'center' }} variant="h6" noWrap component="div">
                    Organisations
                </Typography>
            </DrawerHeader>
            <List>
                {organisations.map(({ id, name }) => (
                    <>
                        <ListItem key={id} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={name} />
                            </ListItemButton>
                        </ListItem>
                        {repositories.repositories.map(({ name, id }) => (
                            <>
                                <ListItem key={id} disablePadding>
                                    <ListItemButton sx={{ paddingBlock: "5px" }}>
                                        <ListItemText secondary={name} />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ))}
                        {resources.resources.map(({ name, id }) => (
                            <>
                                <ListItem key={id} disablePadding>
                                    <ListItemButton sx={{ paddingBlock: 0 }}>
                                        <ListItemText secondary={name} secondaryTypographyProps={{fontSize: "0.8rem"}}/>
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ))}
                    </>
                ))}
            </List>
        </Drawer>
    );
}
