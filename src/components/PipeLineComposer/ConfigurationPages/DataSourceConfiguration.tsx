import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Node } from "reactflow";
import { Box, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import { DataSourceNodeData, NodeData, Resource } from '../../../redux/states/pipelineState';
import { useDispatch, useSelector } from 'react-redux';
import { getNodes } from '../../../redux/selectors';
import { updateNode, updateSourceHandle } from '../../../redux/slices/pipelineSlice';
import { getResources } from '../../../redux/selectors/apiSelector';


export interface AlgorithmConfugurationProps {
  nodeprop: Node<NodeData> | undefined;
}

export default function DataSourceConfiguration({ nodeprop }: AlgorithmConfugurationProps) {

  const dispatch = useDispatch()

  const node = useSelector(getNodes)?.find(node => node.id === nodeprop?.id) as Node<DataSourceNodeData> | undefined;

  const parentNode = useSelector(getNodes)?.find(n => n.id === node?.parentNode);

  const resources = useSelector(getResources);

  const dataTypes = ["eventLog", "bpmnModel", "petriNet"]

  const setLogData = (resource: string) => {
    dispatch(updateNode(
      {
        ...node!,
        data: {
          ...node?.data!,
          instantiationData: {
            resource: { name: resource, organizationId: 1, repositoryId: 1, resourceId: 1, fileExtension: "csv", resourceType: "eventLog" } as Resource
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

    return (
      <List>
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
                value={node?.data.instantiationData?.resource?.name ?? ""}
                sx={{ width: '100%' }}
                onChange={(event) => setLogData(event?.target.value as string)}
              >
              {resources.map((resource) => <MenuItem value={resource.name}>{resource.name}</MenuItem>)}
                {/* <MenuItem value={"Event log 1"}>Event log 1</MenuItem>
                <MenuItem value={"Event log 2"}>Event log 2</MenuItem>
                <MenuItem value={"Event log 3"}>Event log 3</MenuItem> */}
              </Select>
            </Box>
          </ListItem>
        </>
      </List>
    );
  }
