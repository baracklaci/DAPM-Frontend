import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Node } from "reactflow";
import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { NodeData, RootState } from '../../../redux/states';
import { useDispatch, useSelector } from 'react-redux';
import { updateNode } from '../../../redux/slices/nodeSlice';


export interface AlgorithmConfugurationProps {
  nodeprop: Node<NodeData> | undefined;
}

export default function DataSinkConfiguration({ nodeprop }: AlgorithmConfugurationProps) {

  const dispatch = useDispatch()

  const node = useSelector((state: RootState) => state?.nodeState).nodes.find(node => node.id === nodeprop?.id);

  const setOrgData = (org: string) => {
    dispatch(updateNode({ ...node!, data: { ...node?.data!, label: org } }))
  }

  return (
      <List>
        <>
          <ListItem>
            <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
            <InputLabel id="demo-simple-select-standard-label">Please select the organization</InputLabel>
            <Select
              labelId="algorithm-simple-select-label"
              id="algorithm-simple-select"
              value={node?.data.label}
              sx={{ width: '100%' }}
              onChange={(event) => setOrgData(event?.target.value as string)}
            >
              <MenuItem value={"Organization"}>Organization</MenuItem>
              <MenuItem value={"Organization 1"}>Organization 1</MenuItem>
              <MenuItem value={"Organization 2"}>Organization 2</MenuItem>
              <MenuItem value={"Organization 3"}>Organization 3</MenuItem>
            </Select>
            </Box>
            </ListItem>
        </>
      </List>
  );
}
