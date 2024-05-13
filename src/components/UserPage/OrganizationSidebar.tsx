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
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganizations, getRepositories, getResources } from '../../redux/selectors/apiSelector';
import { organizationThunk, repositoryThunk, resourceThunk } from '../../redux/slices/apiSlice';
import { Organization, Repository } from '../../redux/states/apiState';
import { useAppDispatch, useAppSelector } from '../../hooks';

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

    const dispatch = useAppDispatch()
    const organizations: Organization[] = useAppSelector(getOrganizations)
    const repositories: Repository[] = useAppSelector(getRepositories)
    const resources = useSelector(getResources)

    
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
        dispatch(organizationThunk())
        //console.log("USEEFFECT")
        //console.log(organizations)
        dispatch(repositoryThunk(organizations)); // Pass organization ID as argument when dispatching
        dispatch(resourceThunk({organizations,repositories}));

        
        
    }, [dispatch]);

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
                {organizations.map(({ id, name }) => (
                    <>
                        <ListItem key={id} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={name} />
                            </ListItemButton>
                        </ListItem>
                        {repositories.map(({ name, id }) => (
                            <>
                                <ListItem key={id} disablePadding>
                                    <ListItemButton sx={{ paddingBlock: "5px" }}>
                                        <ListItemText secondary={name} />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ))}
                        {resources.map(({ name, id }) => (
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
