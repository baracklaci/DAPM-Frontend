import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActiveFlowData, getActivePipeline } from "../../redux/selectors";
import React, { useState } from "react";
import { setImageData, updatePipelineName } from "../../redux/slices/pipelineSlice";
import EditIcon from '@mui/icons-material/Edit';
import { getNodesBounds, getRectOfNodes, getTransformForBounds, getViewportForBounds } from "reactflow";
import { toPng } from "html-to-image";

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

  const pipelineName = useSelector(getActivePipeline)?.name

  const setPipelineName = (name: string) => {
    dispatch(updatePipelineName(name))
  }

  const flowData = useSelector(getActiveFlowData)

  const activePipeline = useSelector(getActivePipeline);

  const generateJson = () => {
    const requestData = {
      nodes: flowData?.nodes?.filter(node => node.type !== 'organization').map(node => {
        return { type: node.type, templateData: node?.data?.templateData, instantiationData: node?.data?.instantiationData }
      }),
      edges: flowData?.edges.map(edge => {
        return { sourceHandle: edge.sourceHandle, targetHandle: edge.targetHandle, data: edge.data }
      })
    }

    // const nodes = flowData?.nodes;

    // const width = 800
    // const height = 600

    // const nodesBounds = getNodesBounds(nodes!);
    // const {x, y, zoom} = getViewportForBounds(nodesBounds, width, height, 0.5, 2);
    // const pipelineId = activePipeline?.id!;

    // toPng(document.querySelector('.react-flow__viewport') as HTMLElement, {
    //             //backgroundColor: '#1a365d',
    //             width: width,
    //             height: height,
    //             style: {
    //               width: `${width}`,
    //               height: `${height}`,
    //               transform: `translate(${x}px, ${y}px) scale(${zoom})`,
    //             },
    //           }).then((dataUrl) => {
    //             dispatch(setImageData({ id: pipelineId, imgData: dataUrl }));
    //           });

    console.log(JSON.stringify(requestData))
  }

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ flexGrow: 1 }}>
        <Button onClick={() => navigate('/')}>
          <ArrowBackIosNewIcon sx={{ color: "white" }} />
        </Button>
        {/* <TextField sx={{width: '100%'}} value={pipelineName} id="outlined-basic" label="Filename" variant="outlined" onChange={(event) => setPipelineName(event?.target.value as string)} /> */}
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
            <Box onClick={handleStartEditing} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
              <Typography>{pipelineName}</Typography>
              <EditIcon sx={{paddingLeft: '10px'}}/>
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
