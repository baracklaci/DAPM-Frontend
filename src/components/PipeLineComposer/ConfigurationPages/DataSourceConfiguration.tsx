import List from '@mui/material/List';
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import { Node } from "reactflow";
import { Box, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import { DataSourceNodeData, NodeData, OrganizationNodeData } from '../../../redux/states/pipelineState';
import { useDispatch, useSelector } from 'react-redux';
import { getNodes } from '../../../redux/selectors';
import { updateNode, updateSourceHandle } from '../../../redux/slices/pipelineSlice';
import { getResources } from '../../../redux/selectors/apiSelector';
import { GetUserFile } from '../../../services/user'

export interface AlgorithmConfugurationProps {
  nodeprop: Node<NodeData> | undefined;
}

export default function DataSourceConfiguration({ nodeprop }: AlgorithmConfugurationProps) {

  const dispatch = useDispatch()

  const node = useSelector(getNodes)?.find(node => node.id === nodeprop?.id) as Node<DataSourceNodeData> | undefined;

  const parentNode = useSelector(getNodes)?.find(n => n.id === node?.parentNode) as Node<OrganizationNodeData> | undefined;

// State to store permission IDs
const [permissions, setPermissions] = React.useState({
  permission_repositoryID: '',
  permission_repository_readID: '',
  permission_resource_readID: ''
});

// Fetch permission data
React.useEffect(() => {
  queryData();
}, []);

const queryData = async () => {
  const Token = sessionStorage.getItem('Token');
  
  if (Token) {
    const response = await GetUserFile(); // Fetch user access rights

    if (response.code === 200) {
      const defaultData = {
        "permission_repositoryID": "",
        "permission_repository_createID": "",
        "permission_repository_readID": "",
        "permission_resource_readID": "",
        "permission_resource_downloadID": ""
      };
      const data = response.data && response.data.length ? response.data[0] : {...defaultData};

      setPermissions({
        permission_repositoryID: data.permission_repositoryID,
        permission_repository_readID: data.permission_repository_readID,
        permission_resource_readID: data.permission_resource_readID
      });
    }

    console.log("user access right", response);
  }
}

const parseIds = (idString: string) => idString ? idString.split(',').map(id => id.trim()) : [];

const resources = useSelector(getResources).filter(resource => 
    resource.type !== "operator" && 
    resource.organizationId === parentNode?.data?.instantiationData.organization?.id &&
    (
        parseIds(permissions.permission_repositoryID).includes(resource.repositoryId) || 
        parseIds(permissions.permission_repository_readID).includes(resource.repositoryId) || 
        parseIds(permissions.permission_resource_readID).includes(resource.id)
    )
);
  const dataTypes = ["eventlog", "bpmnmodel", "petrinet"]

  const setLogData = (resource: string) => {
    console.log(resource)
    dispatch(updateNode(
      {
        ...node!,
        data: {
          ...node?.data!,
          instantiationData: {
            resource: resources.find(r => r.id === resource)
          }
        }
      }))
    }

    const setType = (dataType: string, handle: string) => {
      dispatch(updateSourceHandle({
        nodeId: node?.id,
        handleId: handle,
        newType: dataType
      }))
    }

    return (
      <List>
        <>
        <header>Template Data</header>

        {node?.data.templateData.sourceHandles.map((handle) => {
          return (
          <ListItem>
          <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
            <InputLabel id="demo-simple-select-standard-label">Please select the output type</InputLabel>
            <Select
              labelId="algorithm-simple-select-label"
              id="algorithm-simple-select"
              value={handle.type}
              sx={{ width: '100%' }}
              onChange={(event) => setType(event?.target.value as string, handle.id)}
            >
            {dataTypes.map((resource) => <MenuItem value={resource}>{resource}</MenuItem>)}
            </Select>
          </Box>
        </ListItem>
          )
        })}

        <header>Instantiation Data</header>
          <ListItem>
            <ListItemText primary={`Organization - ${parentNode?.data?.label}`} />
          </ListItem>
          <ListItem>
            <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
              <InputLabel id="demo-simple-select-standard-label">Please select the data</InputLabel>
              <Select
                labelId="algorithm-simple-select-label"
                id="algorithm-simple-select"
                value={node?.data.instantiationData?.resource?.id ?? ""}
                sx={{ width: '100%' }}
                onChange={(event) => setLogData(event?.target.value as string)}
              >
              {resources.map((resource) => <MenuItem value={resource.id}>{resource.name}</MenuItem>)}
              </Select>
            </Box>
          </ListItem>
        </>
      </List>
    );
  }
