import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Node } from "reactflow";
import { Box, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import { DataSourceNodeData, NodeData, OrganizationNodeData } from '../../../redux/states/pipelineState';
import { useDispatch, useSelector } from 'react-redux';
import { getNodes } from '../../../redux/selectors';
import { updateNode, updateSourceHandle } from '../../../redux/slices/pipelineSlice';
import { getResources } from '../../../redux/selectors/apiSelector';
import { RootState } from '../../../redux/states';


export interface AlgorithmConfugurationProps {
  nodeprop: Node<NodeData> | undefined;
}

export default function DataSourceConfiguration({ nodeprop }: AlgorithmConfugurationProps) {

  const dispatch = useDispatch()

  const node = useSelector(getNodes)?.find(node => node.id === nodeprop?.id) as Node<DataSourceNodeData> | undefined;

  const parentNode = useSelector(getNodes)?.find(n => n.id === node?.parentNode) as Node<OrganizationNodeData> | undefined;

  const resources = useSelector(getResources).filter(resource => resource.type !== "operator" && resource.organizationId === parentNode?.data?.instantiationData.organization?.id);

  const dataTypes = ["eventlog", "bpmnmodel", "petrinet"]

  const setLogData = (resource: string) => {
    console.log(resource)
    dispatch(updateNode(
      {
        ...node!,
        data: {
          ...node?.data!,
          instantiationData: {
            resource: resources.find(r => r.id === resource)
          }
        }
      }))
    }

    const setType = (dataType: string, handle: string) => {
      dispatch(updateSourceHandle({
        nodeId: node?.id,
        handleId: handle,
        newType: dataType
      }))
    }

    const showTemplateData = useSelector((state:RootState) => state.pipelineState.showTemplateDataEnable);

    return (
      <List>  
        {showTemplateData ?(
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
              onChange={(event) => setType(event?.target.value as string, handle.id)}
            >
            {dataTypes.map((resource) => <MenuItem value={resource}>{resource}</MenuItem>)}
            </Select>
          </Box>
        </ListItem>
          )
        })}
        </>
      ) : (
      <>
        <header>Instantiation Data</header>
          <ListItem>
            <ListItemText primary={`Organization - ${parentNode?.data?.label}`} />
          </ListItem>
          <ListItem>
            <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
              <InputLabel id="demo-simple-select-standard-label">Please select the data</InputLabel>
              <Select
                labelId="algorithm-simple-select-label"
                id="algorithm-simple-select"
                value={node?.data.instantiationData?.resource?.id ?? ""}
                sx={{ width: '100%' }}
                onChange={(event) => setLogData(event?.target.value as string)}
              >
              {resources.map((resource) => <MenuItem value={resource.id}>{resource.name}</MenuItem>)}
              </Select>
            </Box>
          </ListItem>
          </>
        )}
      </List>
    );
  }
