import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Node } from "reactflow";
import { Box, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import { DataSinkInstantiationData, DataSinkNodeData, NodeData, Repository } from '../../../redux/states/pipelineState';
import { useDispatch, useSelector } from 'react-redux';
import { updateNode } from '../../../redux/slices/pipelineSlice';
import { getNodes } from '../../../redux/selectors';
import { getRepositories } from '../../../redux/selectors/apiSelector';


export interface AlgorithmConfugurationProps {
  nodeprop: Node<NodeData> | undefined;
}

export default function DataSinkConfiguration({ nodeprop }: AlgorithmConfugurationProps) {

  const dispatch = useDispatch()

  const node = useSelector(getNodes)?.find(node => node.id === nodeprop?.id)  as Node<DataSinkNodeData> | undefined;;

  const parentNode = useSelector(getNodes)?.find(n => n.id === node?.parentNode);

  const repositories = useSelector(getRepositories);

  const setLogData = (repository: string) => {
    dispatch(updateNode(
      {
        ...node!,
        data: {
          ...node?.data!,
          instantiationData: {
            repository: { name: repository, organizationId: 1, repositoryId: 1 } as Repository
          }
        }
      }))
  }

  return (
    <List>
      <>
        <ListItem>
          <ListItemText primary={`Organization - ${parentNode?.data?.label}`} />
        </ListItem>
        <ListItem>
          <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
            <InputLabel id="demo-simple-select-standard-label">Please select the repository</InputLabel>
            <Select
              labelId="algorithm-simple-select-label"
              id="algorithm-simple-select"
              value={node?.data.instantiationData?.repository?.name ?? ""}
              sx={{ width: '100%' }}
              onChange={(event) => setLogData(event?.target.value as string)}
            >
              {repositories.map((repository) => <MenuItem value={repository.name}>{repository.name}</MenuItem>)}
              {/* <MenuItem value={"Repository 1"}>Repository 1</MenuItem>
              <MenuItem value={"Repository 2"}>Repository 2</MenuItem>
              <MenuItem value={"Repository 3"}>Repository 3</MenuItem> */}
            </Select>
          </Box>
        </ListItem>
      </>
    </List>
  );
}
