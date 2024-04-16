import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
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
              label="LogData"
              sx={{ width: '100%' }}
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
