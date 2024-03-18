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
import AppBar from '@mui/material/AppBar';

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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const onDragStart = (event: React.DragEvent, nodeType: string, data: string) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({type: nodeType, data: data}));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
      <Drawer
        PaperProps={{
            sx: {
                backgroundColor: '#292929',
                // color: '#fff',
                position: 'fixed',
                top: '64px',
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
        open={open}
      >
        <Divider />
        <DrawerHeader>
        <Typography sx={{width: '100%', textAlign: 'center'}} variant="h6" noWrap component="div">
            Nodes
          </Typography>
        </DrawerHeader>
        <Divider/>
        <List>
            {[
                {text: 'Data source', icon: <SourceIcon/>, nodeType: 'dataSource', label: ""}, 
                {text: 'Data sink', icon: <SaveIcon/>, nodeType: 'dataSink', label: ""},
                {text: 'Miner', icon: <MinerIcon/>, nodeType: 'custom', label: "Miner"},
                {text: 'Conformance checking', icon: <ConformanceIcon/>, nodeType: 'custom', label: "Conformance checker"},
                {text: 'Custom operator', icon: <CustomOperatorIcon/>, nodeType: 'custom', label: "Custom operator"},
            ].map(({text, icon, nodeType, label}) => (
                <>
                <ListItem key={text} disablePadding onDragStart={(event) => onDragStart(event, nodeType, label)} draggable>
                    <ListItemButton>
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                </>
            ))}
        </List>
      </Drawer>
  );
}
