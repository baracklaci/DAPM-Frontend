import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Node } from "reactflow";
import { NodeData } from '../../redux/states';
import { getNodes } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import AlgorithmConfiguration from './ConfigurationPages/AlgorithmConfiguration';
import DataSourceConfiguration from './ConfigurationPages/DataSourceConfiguration';
import DataSinkConfiguration from './ConfigurationPages/DataSinkConfiguration';
import OrganizationConfiguration from './ConfigurationPages/OrganizationConfiguration';

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
  nodeprop: Node<NodeData> | undefined;
}

export default function PersistentDrawerRight({ nodeprop }: ConfigurationSidebarProps) {

  const node = useSelector(getNodes).nodes.find(node => node.id === nodeprop?.id);

  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: '#292929',
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
    >
      <Divider />
      <DrawerHeader>
        <Typography sx={{ width: '100%', textAlign: 'center' }} variant="h6" noWrap component="div">
          Configuration
        </Typography>
      </DrawerHeader>
      <Divider />
      {node?.type === "custom" && <AlgorithmConfiguration nodeprop={nodeprop} />}
      {node?.type === "dataSource" && <DataSourceConfiguration nodeprop={nodeprop} />}
      {node?.type === "dataSink" && <DataSinkConfiguration nodeprop={nodeprop} />}
      {node?.type === "organization" && <OrganizationConfiguration nodeprop={nodeprop} />}
    </Drawer>
  );
}
