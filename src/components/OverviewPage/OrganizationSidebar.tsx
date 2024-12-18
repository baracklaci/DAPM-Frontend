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
import { Organization, Repository, Resource } from '../../redux/states/apiState';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ResourceUploadButton from './Buttons/ResourceUploadButton';
import { downloadResource, fetchOrganisation, fetchOrganisationRepositories, fetchOrganisations, fetchPipeline, fetchRepositoryPipelines, fetchRepositoryResources, fetchResource, putPipeline, putRepository } from '../../services/backendAPI';
import CreateRepositoryButton from './Buttons/CreateRepositoryButton';
import AddOrganizationButton from './Buttons/AddOrganizationButton';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import OperatorUploadButton from './Buttons/OperatorUploadButton';
import { Padding } from '@mui/icons-material';
import { fetchMessageLoop, getPath } from '../../services/backendAPI';
import React, {useState } from 'react';

import { adminInfo, User, userInfo } from '../../redux/slices/userSlice';
import {Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



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

export default function PersistentDrawerLeft() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const organizations: Organization[] = useAppSelector(getOrganizations)
  const repositories: Repository[] = useAppSelector(getRepositories)
  const resources = useSelector(getResources)

  useEffect(() => {
    dispatch(organizationThunk())
    dispatch(repositoryThunk(organizations));
    dispatch(resourceThunk({ organizations, repositories }));

  }, [dispatch]);

  const [userList, setUserList] = useState<User[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    console.log(userList);

    useEffect(() => {
        const fetchUserData = async () => {
            const users = await handleUserList();
            setUserList(users);
        };

        fetchUserData();
    }, []);

    const toggleUserSelection = (user: User) => {
      setSelectedUsers((prev) =>
        prev.includes(user) ? prev.filter((u) => u.Id !== user.Id) : [...prev, user]
      );
    };

    const handleConfirm = () => {
      console.log("Selected users:", selectedUsers);
      
      setDialogOpen(false);
    };

    const handleOpenDialog = (orgId: string) => {
      const organization = organizations.find((org) => org.id === orgId);
      if (organization) {
        setSelectedOrganization(organization);
        setDialogOpen(true); 
      } else {
        console.error("Organization not found for ID:", orgId);
      }
    };


  const handleDownload = async (resource: Resource) => {
    const response = await downloadResource(resource.organizationId, resource.repositoryId, resource.id) 
    await downloadReadableStream(response.url, resource.name)
  }

  async function downloadReadableStream(url: string, fileName: string) {

    window.open(url, '_blank');
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
        <AddOrganizationButton />
      </DrawerHeader>

      {userInfo.roles.includes("Admin") && (
        <Box sx={{ height: '60px', display: 'flex', alignItems: 'center', margin: '7px' }}>
        <ListItemButton 
          onClick={() => {
            navigate('/admineditpage');
            adminInfo.userRegisterActive = true;
          }}
          sx={{ 
            backgroundColor: '#444', 
            color: 'white', 
            textAlign: 'center', 
            width: '100%'
          }}
        >
          <ListItemText primary="Admin Page" />
        </ListItemButton>
        </Box>
      )}

      <List>
        {organizations.map((organization) => (
          <>
            <ListItem sx={{ justifyContent: 'space-between', alignItems: 'center' }} key={organization.id} disablePadding>
              <Typography variant="h6" sx={{ marginBlock: "0rem", fontSize: "25px", textAlign: "center" }}>
                {organization.name}
              </Typography>
              <Button
                  variant="outlined"
                  size="small"
                  sx={{ marginLeft: "auto" }}
                  onClick={() => handleOpenDialog(organization.id)}
                >
                  Invite User
                </Button>
            </ListItem>

            {/* Dialog for user selection */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <DialogTitle>Select Users</DialogTitle>
              <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                  {userList.map((user) => (
                    <FormControlLabel
                      key={user.Id}
                      control={
                        <Checkbox
                          checked={selectedUsers.includes(user)}
                          onChange={() => toggleUserSelection(user)}
                        />
                      }
                      label={
                        <Typography>
                          {user.UserName} - {user.FullName} ({user.Roles.join(", ")})
                        </Typography>
                      }
                    />
                  ))}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleConfirm}>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>




            <div style={{ display: 'flex', alignItems: 'center', paddingInline: '0.5rem' }}>
            </div>
            {repositories.map((repository) => (repository.organizationId === organization.id ?
              <>
                <ListItem key={repository.id} sx={{paddingInline: '5px'}}>
                  <p style={{padding: '0', fontSize: '25px', marginBlock: '10px'}}>{repository.name}</p>
                </ListItem>

                <div style={{ display: 'flex', alignItems: 'center', paddingInline: '0.5rem' }}>
                  <p style={{fontSize: '0.9rem' }}>Resources</p>
                  <Box sx={{ marginLeft: 'auto' }}>
                    <ResourceUploadButton orgId={repository.organizationId} repId={repository.id} />
                  </Box>
                </div>
                {resources.map((resource) => (resource.repositoryId === repository.id && resource.type !== "operator" ?
                  <>
                    <ListItem key={resource.id} disablePadding>
                      <ListItemButton sx={{ paddingBlock: 0 }} onClick={_ => handleDownload(resource)}>
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
