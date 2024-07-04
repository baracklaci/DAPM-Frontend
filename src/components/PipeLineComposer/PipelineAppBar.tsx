import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActiveFlowData, getActivePipeline } from "../../redux/selectors";
import React, { useState } from "react";
import { setImageData, updatePipelineName } from "../../redux/slices/pipelineSlice";
import EditIcon from '@mui/icons-material/Edit';
import { Node, getRectOfNodes, getTransformForBounds, getViewportForBounds } from "reactflow";
import { toPng } from "html-to-image";
import { DataSinkNodeData, DataSourceNodeData, NodeData, OperatorNodeData } from "../../redux/states/pipelineState";
import { putPipeline } from "../../services/backendAPI";
import { getOrganizations, getRepositories } from "../../redux/selectors/apiSelector";
import { position } from "html2canvas/dist/types/css/property-descriptors/position";

export default function PipelineAppBar() {
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

  const generateJson = () => {

    console.log(flowData)

    const dataSinks = flowData?.edges.map((edge) => {
      if (edge.data?.filename) {
        const originalDataSink = flowData.nodes.find(node => node.id === edge.target) as Node<DataSinkNodeData>
        return {
          type: originalDataSink?.type,
          data: {  ...originalDataSink?.data, instantiationData: { resource:{ ...originalDataSink?.data?.instantiationData.repository, name: edge?.data?.filename } }},
          position: { x: 100, y: 100}, 
          id: "id1", 
          width: 100,
          height: 100,
        }
    }}).filter(node => node !== undefined) as any

    console.log(JSON.stringify(dataSinks))

    const requestData = {
      name: pipelineName,
      pipeline: {
        nodes: flowData?.nodes?.filter(node => node.type === 'dataSource').map(node => node as Node<DataSourceNodeData>).map(node => {
          return {  type: node.type, data: { ...node.data, instantiationData :{ resource: { ...node?.data?.instantiationData.resource }, label: "" }},
          width: 100, height: 100, position: { x: 100, y: 100}, id: "id1", label: "", } as any
        }).concat(
          flowData?.nodes?.filter(node => node.type === 'operator').map(node => node as Node<OperatorNodeData>).map(node => {
            return {   type: node.type, data: { ...node.data, instantiationData :{ resource: { ...node?.data?.instantiationData.algorithm }, label: "" }},
            width: 100, height: 100, position: { x: 100, y: 100}, id: "id1", label: "", } as any
          })
        ).concat(dataSinks),
        edges: flowData?.edges.map(edge => {
          return { sourceHandle: edge.sourceHandle, targetHandle: edge.targetHandle }
        })
      }
    }

    const selectedOrg = organizations[0]
    const selectedRepo = repositories.filter(repo => repo.organizationId === selectedOrg.id)[0]

    putPipeline(selectedOrg.id, selectedRepo.id, requestData)

    console.log(JSON.stringify(requestData))
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
          <Typography variant="body1" sx={{ color: "white" }}>Generate json</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  )
}
