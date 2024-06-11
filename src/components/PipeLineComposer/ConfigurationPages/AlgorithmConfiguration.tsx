import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Node, useUpdateNodeInternals } from "reactflow";
import { useDispatch, useSelector } from 'react-redux';
import { Box, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Algorithm, NodeData, OperatorNodeData, OperatorTemplateData } from '../../../redux/states/pipelineState';
import { getNodes } from '../../../redux/selectors';
import { addHandle, updateNode, updateSourceHandle, updateTargetHandle } from '../../../redux/slices/pipelineSlice';


export interface AlgorithmConfugurationProps {
  nodeprop: Node<NodeData> | undefined;
}

export default function AlgorithmConfiguration({ nodeprop }: AlgorithmConfugurationProps) {

  const dispatch = useDispatch()

  const updateNodesInternal = useUpdateNodeInternals();

  const node = useSelector(getNodes)?.find(node => node.id === nodeprop?.id) as Node<OperatorNodeData> | undefined;

  const parentNode = useSelector(getNodes)?.find(n => n.id === node?.parentNode);

  const dataTypes = ["eventLog", "bpmnModel", "petriNet"]


  const setAlgorithm = (algorithm: string) => {
    dispatch(updateNode(
      {
        ...node!,
        data: {
          ...node?.data!,
          instantiationData: {
            algorithm: { name: algorithm, organizationId: "", repositoryId: "", algorithmId: "" } as Algorithm
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
    <List sx={{height: 'calc(100vh - 64px)'}}>
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
              onChange={(event) => setSourceType(event?.target.value as string, handle.id)}
            >
            {dataTypes.map((resource) => <MenuItem value={resource}>{resource}</MenuItem>)}
            </Select>
          </Box>
        </ListItem>
          )
        })}
        {node?.data.templateData.targetHandles.map((handle) => {
          return(
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
            <TextField inputProps={{ maxLength:30 }} value={node?.data.label} id="outlined-basic" label="Hint" variant="outlined" onChange={(event) => setHint(event?.target.value as string)} />
            <InputLabel id="demo-simple-select-standard-label">Please select algorithm</InputLabel>
            <Select
              labelId="algorithm-simple-select-label"
              id="algorithm-simple-select"
              value={node?.data?.instantiationData?.algorithm?.name ?? ""}
              sx={{ width: '100%' }}
              onChange={(event) => setAlgorithm(event?.target.value as string)}
            >
              <MenuItem value={"Alpha Miner"}>Alpha Miner</MenuItem>
              <MenuItem value={"Heuristic Miner"}>Heuristic Miner</MenuItem>
              <MenuItem value={"Fuzzy Miner"}>Fuzzy Miner</MenuItem>
            </Select>
          </Box>
        </ListItem>
        <ListItem>
          <ListItemText primary={"Inputs"} />
        </ListItem>
        {node?.data.templateData.sourceHandles?.map(handle =>
          <ListItem>
            <ListItemText primary={`type: ${handle.type}`} />
          </ListItem>
        )}
        <ListItem>
          <ListItemButton onClick={() => {
            dispatch(addHandle(node?.id ?? ""))
            updateNodesInternal(node?.id ?? "")
          }}>
            <ListItemText primary={"Add more"} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemText primary={"Outputs"} />
        </ListItem>
        {node?.data.templateData.targetHandles?.map(handle =>
          <ListItem>
            <ListItemText primary={`type: ${handle.type}`} />
          </ListItem>
        )}
      </>
    </List>
  );
}
