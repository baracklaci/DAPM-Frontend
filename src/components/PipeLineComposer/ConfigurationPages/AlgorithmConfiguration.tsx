import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Node, useUpdateNodeInternals } from "reactflow";
import { useDispatch, useSelector } from 'react-redux';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { NodeData } from '../../../redux/states';
import { getNodes } from '../../../redux/selectors';
import { addHandle } from '../../../redux/slices/nodeSlice';


export interface AlgorithmConfugurationProps {
  nodeprop: Node<NodeData> | undefined;
}

export default function AlgorithmConfiguration({ nodeprop }: AlgorithmConfugurationProps) {

  const dispatch = useDispatch()

  const [algorithm, setAlgorithm] = React.useState("");

  const node = useSelector(getNodes).nodes.find(node => node.id === nodeprop?.id);
  
  const updateNodes = useUpdateNodeInternals()
  
  const parentNode = useSelector(getNodes).nodes.find(n => n.id === node?.parentNode);

  return (
      <List>
        <>
          <ListItem>
              <ListItemText primary={`Parent node - ${parentNode?.data?.label}`} />
          </ListItem>
          <ListItem>
            <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
            <InputLabel id="demo-simple-select-standard-label">Please select algorithm</InputLabel>
            <Select
              labelId="algorithm-simple-select-label"
              id="algorithm-simple-select"
              value={algorithm}
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
          {node?.data.sourceHandles?.map(handle => 
            <ListItem>
              <ListItemText primary={`type: ${handle.type}`} />
            </ListItem>
          )}
          <ListItem>
            <ListItemButton onClick={() => {
              dispatch(addHandle(node?.id ?? ""))
              updateNodes(node?.id ?? "")
              }}>
              <ListItemText primary={"Add more"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
              <ListItemText primary={"Outputs"} />
          </ListItem>
          {node?.data.targetHandles?.map(handle => 
            <ListItem>
              <ListItemText primary={`type: ${handle.type}`} />
            </ListItem>
          )}
        </>
      </List>
  );
}
