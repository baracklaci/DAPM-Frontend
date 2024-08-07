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
import ResourceUploadButton from './Buttons/ResourceUploadButton';
import { fetchOrganisation, fetchOrganisationRepositories, fetchOrganisations, fetchPipeline, fetchRepositoryPipelines, fetchRepositoryResources, fetchResource, putPipeline, putRepository } from '../../services/backendAPI';
import CreateRepositoryButton from './Buttons/CreateRepositoryButton';
import AddOrganizationButton from './Buttons/AddOrganizationButton';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import OperatorUploadButton from './Buttons/OperatorUploadButton';

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
    dispatch(resourceThunk({ organizations, repositories }));

  }, [dispatch]);



  /*useEffect(() => {
    const postPipeline = async () => {
      const pipelineData = {
        name: "pipeline1",
        pipeline: {
          "nodes": [
            {
              "type": "string",
              "templateData": {
                "sourceHandles": [
                  {
                    "handleData": {
                      "id": "string"
                    }
                  }
                ],
                "targetHandles": [
                  {
                    "handleData": {
                      "id": "string"
                    }
                  }
                ]
              },
              "instantiationData": {
                "resource": {
                  "organizationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "repositoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "resourceId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  "name": "string"
                }
              }
            }
          ],
          "edges": [
            {
              "sourceHandle": "string",
              "targetHandle": "string"
            }
          ]
        }
      };

      try {
        console.log("post pipeline");
        const testpost = await putPipeline("d87bc490-828f-46c8-aa44-ded7729eaa82", "365570d5-4fc2-44a9-9476-4b03b623b8e7", pipelineData);
        console.log("pipeline: ", testpost);
      } catch (error) {
        console.error("Error fetching pipeline data:", error);
      }
    };

    postPipeline();
  }, [])*/



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
        <AddOrganizationButton />
      </DrawerHeader>
      <List>
        {organizations.map((organization) => (
          <>
            <ListItem sx={{ justifyContent: 'center' }} key={organization.id} disablePadding>
              <p style={{marginBlock: '0rem'}}>{organization.name}</p>
            </ListItem>
            <div style={{ display: 'flex', alignItems: 'center', paddingInline: '0.5rem' }}>
            </div>
            {repositories.map((repository) => (repository.organizationId === organization.id ?
              <>
                <ListItem key={repository.id}>
                  <p>{repository.name}</p>
                </ListItem>

                <div style={{ display: 'flex', alignItems: 'center', paddingInline: '0.5rem' }}>
                  <p style={{fontSize: '0.9rem'}}>Resources</p>
                  <Box sx={{ marginLeft: 'auto' }}>
                    <ResourceUploadButton orgId={repository.organizationId} repId={repository.id} />
                  </Box>
                </div>
                {resources.map((resource) => (resource.repositoryId === repository.id && resource.type !== "operator" ?
                  <>
                    <ListItem key={resource.id} disablePadding>
                      <ListItemButton sx={{ paddingBlock: 0 }}>
                        <ListItemText secondary={resource.name} secondaryTypographyProps={{ fontSize: "0.8rem" }} />
                      </ListItemButton>
                    </ListItem>
                  </> : ""
                ))}

                <div style={{ display: 'flex', alignItems: 'center', paddingInline: '0.5rem' }}>
                  <p style={{fontSize: '0.9rem'}}>Operators</p>
                  <Box sx={{ marginLeft: 'auto' }}>
                    <OperatorUploadButton orgId={repository.organizationId} repId={repository.id} />
                  </Box>
                </div>
                {resources.map((resource) => (resource.repositoryId === repository.id && resource.type === "operator" ?
                  <>
                    <ListItem key={resource.id} disablePadding>
                      <ListItemButton sx={{ paddingBlock: 0 }}>
                        <ListItemText secondary={resource.name} secondaryTypographyProps={{ fontSize: "0.8rem" }} />
                      </ListItemButton>
                    </ListItem>
                  </> : ""
                ))}
              </> : ""
            ))}
            <ListItem sx={{ justifyContent: 'center' }}>
              <Box sx={{ width: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CreateRepositoryButton orgId={organization.id} />
              </Box>
            </ListItem>
          </>
        ))}
      </List>
    </Drawer>
  );
}
