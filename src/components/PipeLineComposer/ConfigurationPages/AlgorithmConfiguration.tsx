import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Node, useUpdateNodeInternals } from "reactflow";
import { useDispatch, useSelector } from 'react-redux';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { Algorithm, NodeData, OperatorNodeData } from '../../../redux/states/nodeState';
import { getNodes } from '../../../redux/selectors';
import { addHandle, updateNode } from '../../../redux/slices/nodeSlice';


export interface AlgorithmConfugurationProps {
  nodeprop: Node<NodeData> | undefined;
}

export default function AlgorithmConfiguration({ nodeprop }: AlgorithmConfugurationProps) {

  const dispatch = useDispatch()

  const updateNodesInternal = useUpdateNodeInternals();

  const node = useSelector(getNodes).nodes.find(node => node.id === nodeprop?.id) as Node<OperatorNodeData> | undefined;
  
  const parentNode = useSelector(getNodes).nodes.find(n => n.id === node?.parentNode);

  const setAlgorithm = (algorithm: string) => {
    dispatch(updateNode(
      {
        ...node!, 
        data: {
          ...node?.data!, 
          instantiationData: {
            algorithm: {name: algorithm, organizationId: 1, repositoryId: 1, algorithmId: 1 } as Algorithm
          }
        }
  }))}

  return (
      <List>
        <>
          <ListItem>
              <ListItemText primary={`Organization - ${parentNode?.data?.label}`} />
          </ListItem>
          <ListItem>
            <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
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
