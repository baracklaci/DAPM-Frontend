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
import { Box, IconButton } from '@mui/material';
import ResourceUploadButton from './Buttons/ResourceUploadButton';
import { deleteResource, downloadResource } from '../../services/backendAPI';
import CreateRepositoryButton from './Buttons/CreateRepositoryButton';
import AddOrganizationButton from './Buttons/AddOrganizationButton';
import OperatorUploadButton from './Buttons/OperatorUploadButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddMemberButton from "../createUser/addMemberButton";
import { LogoutButton } from "../logout/logoutButton";
import { useAuth } from "../../auth/authProvider";
import React from 'react';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const dispatch = useAppDispatch();
  const organizations: Organization[] = useAppSelector(getOrganizations);
  const repositories: Repository[] = useAppSelector(getRepositories);
  const resources = useSelector(getResources);
  const auth = useAuth();

  useEffect(() => {
    dispatch(organizationThunk());
    if (organizations.length) {
      dispatch(repositoryThunk(organizations));
      dispatch(resourceThunk({ organizations, repositories }));
    }
  }, [dispatch, organizations, repositories]);

  const handleDelete = async (resource: Resource) => {
    console.log('Deleting resource:', resource);
    await deleteResource(resource.organizationId, resource.repositoryId, resource.id);
  };

  const handleDownload = async (resource: Resource) => {
    const response = await downloadResource(resource.organizationId, resource.repositoryId, resource.id);
    await downloadReadableStream(response.url);
  };

  async function downloadReadableStream(url: string) {
    window.open(url, '_blank');
  }

  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: "#292929",
          zIndex: 10,
        },
      }}
      sx={{
        width: drawerWidth,
        position: "static",
        flexGrow: 1,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Divider />
      {
        auth?.user?.isAdmin==="true" &&
        <DrawerHeader>
          <Typography
            sx={{ width: "100%", textAlign: "center" }}
            variant="h6"
            noWrap
            component="div"
          >
            Add Member
          </Typography>
          <AddMemberButton />
        </DrawerHeader>
      }

      <DrawerHeader>
        <Typography
          sx={{ width: "100%", textAlign: "center" }}
          variant="h6"
          noWrap
          component="div"
        >
          Organisations
        </Typography>
        <AddOrganizationButton />
      </DrawerHeader>

      <List>
        {organizations.map((organization) => (
          <>
            <ListItem
              sx={{ justifyContent: "center" }}
              key={organization.id}
              disablePadding
            >
              <p style={{ marginBlock: "0rem", fontSize: "25px" }}>
                {organization.name}
              </p>
            </ListItem>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingInline: "0.5rem",
              }}
            ></div>
            {repositories.map((repository) =>
              repository.organizationId === organization.id ? (
                <>
                  <ListItem key={repository.id} sx={{ paddingInline: "5px" }}>
                    <p
                      style={{
                        padding: "0",
                        fontSize: "25px",
                        marginBlock: "10px",
                      }}
                    >
                      {repository.name}
                    </p>
                  </ListItem>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingInline: "0.5rem",
                    }}
                  >
                    <p style={{ fontSize: "0.9rem" }}>Resources</p>
                    <Box sx={{ marginLeft: "auto" }}>
                      <ResourceUploadButton
                        orgId={repository.organizationId}
                        repId={repository.id}
                      />
                    </Box>
                  </div>
                  {resources.map((resource) =>
                    resource.repositoryId === repository.id &&
                      resource.type !== "operator" ? (
                      <ListItem key={resource.id} disablePadding>
                        <ListItemButton
                          sx={{ paddingBlock: 0 }}
                          onClick={(_) => handleDownload(resource)}
                        >
                          <ListItemText
                            secondary={resource.name}
                            secondaryTypographyProps={{ fontSize: "0.8rem" }}
                          />
                        </ListItemButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(resource)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                    ) : (
                      ""
                    )
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingInline: "0.5rem",
                    }}
                  >
                    <p style={{ fontSize: "0.9rem" }}>Operators</p>
                    <Box sx={{ marginLeft: "auto" }}>
                      <OperatorUploadButton
                        orgId={repository.organizationId}
                        repId={repository.id}
                      />
                    </Box>
                  </div>
                  {resources.map((resource) =>
                    resource.repositoryId === repository.id &&
                      resource.type === "operator" ? (
                      <ListItem key={resource.id} disablePadding>
                        <ListItemButton sx={{ paddingBlock: 0 }}>
                          <ListItemText
                            secondary={resource.name}
                            secondaryTypographyProps={{ fontSize: "0.8rem" }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ) : (
                      ""
                    )
                  )}
                </>
              ) : (
                ""
              )
            )}
            <ListItem sx={{ justifyContent: "center" }}>
              <Box
                sx={{
                  width: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CreateRepositoryButton orgId={organization.id} />
              </Box>
            </ListItem>
          </>
        ))}
      </List>
      <LogoutButton />
    </Drawer>
  );
}