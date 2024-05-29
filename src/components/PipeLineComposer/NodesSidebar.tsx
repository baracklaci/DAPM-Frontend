import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SourceIcon from '@mui/icons-material/Source';
import SaveIcon from '@mui/icons-material/Save';
import MinerIcon from '@mui/icons-material/Hardware';
import ConformanceIcon from '@mui/icons-material/Balance';
import CustomOperatorIcon from '@mui/icons-material/AutoFixHigh';
import BusinessIcon from '@mui/icons-material/Business';

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

  const onDragStart = (event: React.DragEvent, nodeType: string, data: string, algorithmType: string | undefined) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({type: nodeType, data: data, algorithmType: algorithmType}));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
      <Drawer
        PaperProps={{
            sx: {
                backgroundColor: '#292929',
                position: 'fixed',
                top: '64px',
                zIndex: 800
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
        <List>
            {[
                {text: 'Event log', icon: <SourceIcon/>, nodeType: 'dataSource', label: "", instanceType: "dataSource"}, 
                {text: 'Petri net', icon: <SourceIcon/>, nodeType: 'dataSource', label: "", instanceType: "dataSource"}, 
                {text: 'BPMN', icon: <SourceIcon/>, nodeType: 'dataSource', label: "", instanceType: "dataSource"}, 
                {text: 'Data sink', icon: <SaveIcon/>, nodeType: 'dataSink', label: "", instanceType: "dataSink"},
                {text: 'Miner', icon: <MinerIcon/>, nodeType: 'operator', label: "Miner", instanceType: "miner"},
                {text: 'Conformance checking', icon: <ConformanceIcon/>, nodeType: 'operator', label: "Conformance checker", instanceType: "conformance"},
                {text: 'Custom operator', icon: <CustomOperatorIcon/>, nodeType: 'operator', label: "Custom operator", instanceType: "custom"},
                {text: 'Organization', icon: <BusinessIcon/>, nodeType: 'organization', label: "Organization", instanceType: "organization"},
            ].map(({text, icon, nodeType, label, instanceType}) => (
                <>
                <ListItem key={text} disablePadding onDragStart={(event) => onDragStart(event, nodeType, label, instanceType)} draggable>
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
