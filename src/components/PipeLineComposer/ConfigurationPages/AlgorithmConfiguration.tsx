import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Node, useUpdateNodeInternals } from "reactflow";
import { useDispatch, useSelector } from 'react-redux';
import { Box, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Algorithm, NodeData, OperatorNodeData, OperatorTemplateData, OrganizationNodeData } from '../../../redux/states/pipelineState';
import { getNodes } from '../../../redux/selectors';
import { addHandle, updateNode, updateSourceHandle, updateTargetHandle } from '../../../redux/slices/pipelineSlice';
import { getResources } from '../../../redux/selectors/apiSelector';
import { RootState } from '../../../redux/states';


export interface AlgorithmConfugurationProps {
  nodeprop: Node<NodeData> | undefined;
}

export default function AlgorithmConfiguration({ nodeprop }: AlgorithmConfugurationProps) {

  const dispatch = useDispatch()

  const updateNodesInternal = useUpdateNodeInternals();

  const node = useSelector(getNodes)?.find(node => node.id === nodeprop?.id) as Node<OperatorNodeData> | undefined;

  const parentNode = useSelector(getNodes)?.find(n => n.id === node?.parentNode) as Node<OrganizationNodeData> | undefined;

  const resources = useSelector(getResources).filter(resource => resource.type === "operator" && resource.organizationId === parentNode?.data?.instantiationData.organization?.id);


  const dataTypes = ["eventlog", "bpmnmodel", "petrinet"]

  const showTemplateData = useSelector((state:RootState) => state.pipelineState.showTemplateDataEnable);


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
      {showTemplateData ?(<>
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
        })} </>
      ) : (<>
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
        </>)}
      </>
    </List>
  );
}
