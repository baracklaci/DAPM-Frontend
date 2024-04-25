import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Node } from "reactflow";
import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { NodeData } from '../../../redux/states';


export interface AlgorithmConfugurationProps {
  nodeprop: Node<NodeData> | undefined;
}

export default function DataSourceConfiguration({ nodeprop }: AlgorithmConfugurationProps) {

  const [logData, setLogData] = React.useState("");

  return (
      <List>
        <>
          <ListItem>
            <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
            <InputLabel id="demo-simple-select-standard-label">Please select the data</InputLabel>
            <Select
              labelId="algorithm-simple-select-label"
              id="algorithm-simple-select"
              value={logData}
              sx={{ width: '100%'}}
              onChange={(event) => setLogData(event?.target.value as string)}
            >
              <MenuItem value={"Event log 1"}>Event log 1</MenuItem>
              <MenuItem value={"Event log 2"}>Event log 2</MenuItem>
              <MenuItem value={"Event log 3"}>Event log 3</MenuItem>
            </Select>
            </Box>
            </ListItem>
        </>
      </List>
  );
}
