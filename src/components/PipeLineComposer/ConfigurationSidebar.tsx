import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Node } from "reactflow";

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export interface ConfigurationSidebarProps {
  node: Node | undefined;
}

export default function PersistentDrawerRight({ node }: ConfigurationSidebarProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const onDragStart = (event: React.DragEvent, nodeType: string, data: string) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ type: nodeType, data: data }));
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
      anchor="right"
      open={open}
    >
      <Divider />
      <DrawerHeader>
        <Typography sx={{ width: '100%', textAlign: 'center' }} variant="h6" noWrap component="div">
          Configuration
        </Typography>
      </DrawerHeader>
      <Divider />
      <List>
        <>
          <ListItem>
            <ListItemButton>
              <ListItemText primary={`type: ${node?.type}`} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
            <ListItemText primary={`label: ${node?.data?.label}`} />
            </ListItemButton>
          </ListItem>
        </>
      </List>
    </Drawer>
  );
}
