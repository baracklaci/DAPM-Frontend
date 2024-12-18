import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Node } from "reactflow";
import { Box, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import { DataSinkNodeData, NodeData, OrganizationNodeData } from '../../../redux/states/pipelineState';
import { useDispatch, useSelector } from 'react-redux';
import { updateNode } from '../../../redux/slices/pipelineSlice';
import { getNodes } from '../../../redux/selectors';
import { getRepositories } from '../../../redux/selectors/apiSelector';
import { RootState } from '../../../redux/states';


export interface AlgorithmConfugurationProps {
  nodeprop: Node<NodeData> | undefined;
}

export default function DataSinkConfiguration({ nodeprop }: AlgorithmConfugurationProps) {

  const dispatch = useDispatch()

  const node = useSelector(getNodes)?.find(node => node.id === nodeprop?.id)  as Node<DataSinkNodeData> | undefined;;

  const parentNode = useSelector(getNodes)?.find(n => n.id === node?.parentNode) as Node<OrganizationNodeData> | undefined;

  const repositories = useSelector(getRepositories).filter(repository => repository.organizationId === parentNode?.data?.instantiationData?.organization?.id);

  const setLogData = (repository: string) => {
    dispatch(updateNode(
      {
        ...node!,
        data: {
          ...node?.data!,
          instantiationData: {
            repository: repositories.find(r => r.id === repository)
          }
        }
      }))
  }
  const showTemplateData = useSelector((state:RootState) => state.pipelineState.showTemplateDataEnable);

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
              value={node?.data.instantiationData?.repository?.id ?? ""}
              sx={{ width: '100%' }}
              onChange={(event) => setLogData(event?.target.value as string)}
            >
              {repositories.map((repository) => <MenuItem value={repository.id}>{repository.name}</MenuItem>)}
            </Select>
          </Box>
        </ListItem>
    
      </>
    </List>
  );
}
