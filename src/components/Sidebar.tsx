import * as React from 'react';
import { styled, useTheme, withStyles } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SourceIcon from '@mui/icons-material/Source';
import SaveIcon from '@mui/icons-material/Save';
import MinerIcon from '@mui/icons-material/Hardware';
import ConformanceIcon from '@mui/icons-material/Balance';
import CustomOperatorIcon from '@mui/icons-material/AutoFixHigh';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{backgroundColor: '#292929'}} position="fixed" open={open}>
        <Toolbar sx={{flexGrow: 1}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{width: '100%', textAlign: 'center'}} variant="h6" noWrap component="div">
            very cool DAPM pipeline maker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{
            sx: {
                backgroundColor: '#191919',
                color: '#ffffff'
            }
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        <Typography sx={{width: '100%', textAlign: 'center'}} variant="h6" noWrap component="div">
            Nodes
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{color: '#fff'}}/> : <ChevronRightIcon sx={{color: '#fff'}}/>}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            {[
                {text: 'Data source', icon: <SourceIcon sx={{color: '#fff'}}/>}, 
                {text: 'Data sink', icon: <SaveIcon sx={{color: '#fff'}}/>},
                {text: 'Miner', icon: <MinerIcon sx={{color: '#fff'}}/>},
                {text: 'Conformance checking', icon: <ConformanceIcon sx={{color: '#fff'}}/>},
                {text: 'Custom operator', icon: <CustomOperatorIcon sx={{color: '#fff'}}/>},
            ].map(({text, icon}) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
