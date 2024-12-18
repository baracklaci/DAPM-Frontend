import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Node } from "reactflow";
import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { NodeData, OrganizationNodeData } from '../../../redux/states/pipelineState';
import { useDispatch, useSelector } from 'react-redux';
import { updateNode } from '../../../redux/slices/pipelineSlice';
import { getOrganizations } from '../../../redux/selectors/apiSelector';
import { getNodes } from '../../../redux/selectors';
import { useEffect } from 'react';
import { RootState } from '../../../redux/states';


export interface AlgorithmConfugurationProps {
  nodeprop: Node<NodeData> | undefined;
}

export default function DataSinkConfiguration({ nodeprop }: AlgorithmConfugurationProps) {

  const dispatch = useDispatch()

  const node = useSelector(getNodes)?.find(node => node.id === nodeprop?.id) as Node<OrganizationNodeData> | undefined;

  const organizations = useSelector(getOrganizations);

  const setOrgData = (organizationId: string) => {
    const organization = organizations.find(org => org.id === organizationId);
    dispatch(updateNode({ ...node!, data: { ...node?.data!, instantiationData: {organization} } }))
  }

  const showTemplateData = useSelector((state:RootState) => state.pipelineState.showTemplateDataEnable);


  return (
    <List>
      <>
        <ListItem>
          <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
            <InputLabel id="demo-simple-select-standard-label">Please select the organization</InputLabel>
            <Select
              labelId="algorithm-simple-select-label"
              id="algorithm-simple-select"
              value={node?.data.instantiationData.organization?.id}
              sx={{ width: '100%' }}
              onChange={(event) => setOrgData(event?.target.value)}
            >
              {organizations.map((org) => <MenuItem value={org.id}>{org.name}</MenuItem>)}
            </Select>
          </Box>
        </ListItem>
      </>
    </List>
  );
}
