import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Node } from "reactflow";
import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';

import { getActiveFlowData, getActivePipeline } from "../../redux/selectors";
import { updatePipelineName } from "../../redux/slices/pipelineSlice";
import { DataSinkNodeData, DataSourceNodeData, OperatorNodeData } from "../../redux/states/pipelineState";
import { getOrganizations, getRepositories } from "../../redux/selectors/apiSelector";
import { getHandleId, getNodeId } from "./Flow";
import { useBackendAPI } from "../../services/backendAPI";

export default function PipelineAppBar() {
  const { createPipeline, createExecution, createCommandStart } = useBackendAPI();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleFinishEditing = () => {
    setIsEditing(false);
  };

  const organizations = useSelector(getOrganizations)
  const repositories = useSelector(getRepositories)

  const pipelineName = useSelector(getActivePipeline)?.name

  const setPipelineName = (name: string) => {
    dispatch(updatePipelineName(name))
  }

  const flowData = useSelector(getActiveFlowData)

  // TODO: need to be tested
  const generateJson = async () => {

    const edges = flowData!.edges.map(edge => {
      return {sourceHandle: edge.sourceHandle, targetHandle: edge.targetHandle}
    });

    console.log("copied", edges)

    const dataSinks = flowData?.edges.map((edge) => {
      if (edge.data?.filename) {
        const newTarget = getHandleId()
        const egeToModify = edges.find(e => e.sourceHandle == edge.sourceHandle && e.targetHandle == edge.targetHandle)
        egeToModify!.targetHandle = newTarget

        const originalDataSink = flowData!.nodes.find(node => node.id === edge.target) as Node<DataSinkNodeData>
        return {
          type: originalDataSink?.type,
          data: {
            ...originalDataSink?.data,
            templateData: { sourceHandles: [], targetHandles: [{ id: newTarget }] },
            instantiationData: {
              resource: {
                //...originalDataSink?.data?.instantiationData.repository, 
                organizationId: originalDataSink?.data?.instantiationData.repository?.organizationId,
                repositoryId: originalDataSink?.data?.instantiationData.repository?.id,
                name: edge?.data?.filename
              }
            }
          },
          position: { x: 100, y: 100 },
          id: getNodeId(),
          width: 100,
          height: 100,
        }
      }
    }).filter(node => node !== undefined) as any

    console.log(JSON.stringify(dataSinks))

    const requestData = {
      name: pipelineName,
      pipeline: {
        nodes: flowData?.nodes?.filter(node => node.type === 'dataSource').map(node => node as Node<DataSourceNodeData>).map(node => {
          return {
            type: node.type,
            data: {
              ...node.data,
              instantiationData: {
                resource: {
                  //...node?.data?.instantiationData.resource,
                  organizationId: node?.data?.instantiationData.resource?.organizationId,
                  repositoryId: node?.data?.instantiationData.resource?.repositoryId,
                  resourceId: node?.data?.instantiationData.resource?.id,
                },
              }
            },
            width: 100, height: 100, position: { x: 100, y: 100 }, id: node.id, label: "",
          } as any
        }).concat(
          flowData?.nodes?.filter(node => node.type === 'operator').map(node => node as Node<OperatorNodeData>).map(node => {
            return {
              type: node.type, data: {
                ...node.data,
                instantiationData: {
                  resource: {
                    //...node?.data?.instantiationData.algorithm,
                    organizationId: node?.data?.instantiationData.algorithm?.organizationId,
                    repositoryId: node?.data?.instantiationData.algorithm?.repositoryId,
                    resourceId: node?.data?.instantiationData.algorithm?.id,
                  }
                }
              },
              width: 100, height: 100, position: { x: 100, y: 100 }, id: node.id, label: "",
            } as any
          })
        ).concat(dataSinks),
        edges: edges.map(edge => {
          return { sourceHandle: edge.sourceHandle, targetHandle: edge.targetHandle }
        })
      }
    }

    console.log(JSON.stringify(requestData))

    const selectedOrg = organizations[0]
    const selectedRepo = repositories.filter(repo => repo.organizationId === selectedOrg.id)[0]

    // TODO: need to be tested
    const pipelineId = await createPipeline(selectedOrg.id, selectedRepo.id, requestData)
    const executionId = await createExecution(selectedOrg.id, selectedRepo.id, pipelineId)
    await createCommandStart(selectedOrg.id, selectedRepo.id, pipelineId, executionId)

  }

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ flexGrow: 1 }}>
        <Button onClick={() => navigate('/')}>
          <ArrowBackIosNewIcon sx={{ color: "white" }} />
        </Button>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          {isEditing ? (
            <TextField
              value={pipelineName}
              onChange={(event) => setPipelineName(event?.target.value as string)}
              autoFocus
              onBlur={handleFinishEditing}
              inputProps={{ style: { textAlign: 'center', width: 'auto' } }}
            />
          ) : (
            <Box onClick={handleStartEditing} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
              <Typography>{pipelineName}</Typography>
              <EditIcon sx={{ paddingLeft: '10px' }} />
            </Box>
          )}
        </Box>
        <Button onClick={() => generateJson()}>
          <Typography variant="body1" sx={{ color: "white" }}>Deploy pipeline</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  )
}