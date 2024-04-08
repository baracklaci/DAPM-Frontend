import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

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

    const organisations = {
        organisations: [
            {
                name: "Organisation 1",
                id: "o1"
            },
            {
                name: "Organisation 2",
                id: "o2"
            },
        ]
    }

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
                {organisations.organisations.map(({ name, id }) => (
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
