import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Edge, Node } from "reactflow";
import { NodeData } from '../../redux/states/nodeState';
import { getNodes } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import AlgorithmConfiguration from './ConfigurationPages/AlgorithmConfiguration';
import DataSourceConfiguration from './ConfigurationPages/DataSourceConfiguration';
import DataSinkConfiguration from './ConfigurationPages/DataSinkConfiguration';
import OrganizationConfiguration from './ConfigurationPages/OrganizationConfiguration';
import EdgeConfiguration from './ConfigurationPages/EdgeConfiguration';

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
  selectableProp: Node<NodeData> | Edge | undefined;
}

export default function PersistentDrawerRight({ selectableProp }: ConfigurationSidebarProps) {

  const node = useSelector(getNodes).nodes.find(node => node.id === selectableProp?.id);
  const edge = useSelector(getNodes).edges.find(edge => edge.id === selectableProp?.id);

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
      {node?.type === "operator" && <AlgorithmConfiguration nodeprop={selectableProp as Node<NodeData>} />}
      {node?.type === "dataSource" && <DataSourceConfiguration nodeprop={selectableProp as Node<NodeData>} />}
      {node?.type === "dataSink" && <DataSinkConfiguration nodeprop={selectableProp as Node<NodeData>} />}
      {node?.type === "organization" && <OrganizationConfiguration nodeprop={selectableProp as Node<NodeData>} />}
      {edge && <EdgeConfiguration edgeProp={selectableProp as Edge} />}
    </Drawer>
  );
}