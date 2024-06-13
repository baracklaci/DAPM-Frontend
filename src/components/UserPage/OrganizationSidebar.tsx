import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOrganizations, getRepositories, getResources } from '../../redux/selectors/apiSelector';
import { organizationThunk, repositoryThunk, resourceThunk } from '../../redux/slices/apiSlice';
import { Organization, Repository } from '../../redux/states/apiState';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Box } from '@mui/material';
import UploadButton from './UploadButton';
import { fetchPipeline, fetchRepositoryPipelines, fetchResource } from '../../services/backendAPI';
import CreateRepositoryButton from './CreateRepositoryButton';

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
    
    useEffect(() => {
        dispatch(organizationThunk())
        dispatch(repositoryThunk(organizations));
        dispatch(resourceThunk({organizations,repositories}));
        

        
        
    }, [dispatch]);


    // fetch pipelines test
    //Remember to change the IDs
   /* useEffect(() => {
        const fetchTestPipelines = async () => {
          try {
            console.log('Fetching repository pipelines...');
            const testpipeline = await fetchRepositoryPipelines("43b2c65f-f82c-4aff-b049-ccdac4e02671", "8746e302-e56e-46d2-83a2-dda343689a77");
            console.log("Pipeline data:", testpipeline);
          } catch (error) {
            console.error("Error fetching pipeline data:", error);
          }
        };

          const fetchTestPipeline = async () => {
            try {
              console.log('Fetching resource...');
              const testPipeline = await fetchPipeline("43b2c65f-f82c-4aff-b049-ccdac4e02671", "8746e302-e56e-46d2-83a2-dda343689a77", "e988728e-91e3-4e97-a9d7-160cfdae6b5f");
              console.log("pipelineById:", testPipeline);
            } catch (error) {
              console.error("Error fetching pipeline data:", error);
            }
          };
    
        fetchTestPipelines();
        fetchTestPipeline();
      }, []);

      */

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
                {organizations.map((organization) => (
                    <>
                        <ListItem key={organization.id} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={organization.name} />
                                <CreateRepositoryButton orgId={organization.id}/>
                            </ListItemButton>
                        </ListItem>
                        {repositories.map((repository) => ( repository.organizationId === organization.id ? 
                            <>
                                <Box sx={{display: "flex"}}>
                                    <ListItem key={repository.id}>                                   
                                        <ListItemText secondary={repository.name} />
                                        <UploadButton orgId={repository.organizationId} repId={repository.id} />
                                    </ListItem>
                                </Box>
                                {resources.map((resource) => ( resource.repositoryId === repository.id ?
                                    <>
                                        <ListItem key={resource.id} disablePadding>
                                            <ListItemButton sx={{ paddingBlock: 0 }}>
                                                <ListItemText secondary={resource.name} secondaryTypographyProps={{fontSize: "0.8rem"}}/>
                                            </ListItemButton>
                                        </ListItem>
                                    </> : ""
                        ))}
                            </> : ""
                        ))}
                    </>
                ))}
            </List>
        </Drawer>
    );
}
