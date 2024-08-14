import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Node, useUpdateNodeInternals } from "reactflow";
import { useDispatch, useSelector } from 'react-redux';
import { Box, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Algorithm, NodeData, OperatorNodeData, OperatorTemplateData, OrganizationNodeData } from '../../../redux/states/pipelineState';
import { getNodes } from '../../../redux/selectors';
import { addHandle, updateNode, updateSourceHandle, updateTargetHandle } from '../../../redux/slices/pipelineSlice';
import { getResources } from '../../../redux/selectors/apiSelector';
import { GetUserFile } from '../../../services/user'

export interface AlgorithmConfugurationProps {
  nodeprop: Node<NodeData> | undefined;
}

export default function AlgorithmConfiguration({ nodeprop }: AlgorithmConfugurationProps) {
  const dispatch = useDispatch();
  const updateNodesInternal = useUpdateNodeInternals();
  const node = useSelector(getNodes)?.find(node => node.id === nodeprop?.id) as Node<OperatorNodeData> | undefined;
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
      resource.type === "operator" && 
      resource.organizationId === parentNode?.data?.instantiationData.organization?.id &&
      (
          parseIds(permissions.permission_repositoryID).includes(resource.repositoryId) || 
          parseIds(permissions.permission_repository_readID).includes(resource.repositoryId) || 
          parseIds(permissions.permission_resource_readID).includes(resource.id)
      )
  );
  
  
  


  const dataTypes = ["eventlog", "bpmnmodel", "petrinet"];

  const setAlgorithm = (algorithm: string) => {
    dispatch(updateNode(
      {
        ...node!,
        data: {
          ...node?.data!,
          instantiationData: {
            algorithm: resources.find(r => r.id === algorithm) as Algorithm
          }
        }
      }))
  }

  const setHint = (hint: string) => {
    dispatch(updateNode(
      {
        ...node!,
        data: {
          ...node?.data!,
          templateData: { ...node?.data.templateData, hint: hint } as OperatorTemplateData
        }
      }))
  }

  const setSourceType = (dataType: string, handle: string) => {
    dispatch(updateSourceHandle({
      nodeId: node?.id,
      handleId: handle,
      newType: dataType
    }))
  }

  const setTargetType = (dataType: string, handle: string) => {
    dispatch(updateTargetHandle({
      nodeId: node?.id,
      handleId: handle,
      newType: dataType
    }))
  }

  return (
    <List sx={{ height: 'calc(100vh - 64px)' }}>
      <>
        <header>Template Data</header>
        <TextField inputProps={{ maxLength: 30 }} value={node?.data.templateData.hint} id="outlined-basic" label="Hint" variant="outlined" onChange={(event) => setHint(event?.target.value as string)} />
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
                  onChange={(event) => setSourceType(event?.target.value as string, handle.id)}
                >
                  {dataTypes.map((resource) => <MenuItem value={resource}>{resource}</MenuItem>)}
                </Select>
              </Box>
            </ListItem>
          )
        })}
        {node?.data.templateData.targetHandles.map((handle) => {
          return (
            <ListItem>
              <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
                <InputLabel id="demo-simple-select-standard-label">Please select the input type</InputLabel>
                <Select
                  labelId="algorithm-simple-select-label"
                  id="algorithm-simple-select"
                  value={handle.type}
                  sx={{ width: '100%' }}
                  onChange={(event) => setTargetType(event?.target.value as string, handle.id)}
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
            <InputLabel id="demo-simple-select-standard-label">Please select algorithm</InputLabel>
            <Select
              labelId="algorithm-simple-select-label"
              id="algorithm-simple-select"
              value={node?.data?.instantiationData?.algorithm?.id ?? ""}
              sx={{ width: '100%' }}
              onChange={(event) => setAlgorithm(event?.target.value as string)}
            >
              {resources.map((resource) => <MenuItem value={resource.id}>{resource.name}</MenuItem>)}
            </Select>
          </Box>
        </ListItem>
      </>
    </List>
  );
}
