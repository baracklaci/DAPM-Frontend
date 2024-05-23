import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PipelineCard from './PipelineCard';
import { Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPipeline, setImageData } from '../../redux/slices/pipelineSlice';
import { getPipelines } from '../../redux/selectors';
import { useEffect, useState } from 'react';
import FlowDiagram from './FlowDiagram';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';
import { Edge, Node, getRectOfNodes, getTransformForBounds } from 'reactflow';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AutoGrid() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const pipelines = useSelector(getPipelines)

  const createNewPipeline = () => {
    dispatch(addNewPipeline({id: `pipeline-${crypto.randomUUID()}`, flowData: {nodes: [], edges: []}}));
    { navigate("/pipeline") }
  }

  useEffect(() => {
    pipelines.map(({ flowData, id }) => {
      const nodes = flowData.nodes;
      const edges = flowData.edges;
      const pipelineId = id;
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.top = '-10000px';
      document.body.appendChild(container);
    
      ReactDOM.render(
        <FlowDiagram nodes={nodes} edges={edges} />,
        container,
        () => {
    
          const nodesBounds = getRectOfNodes(nodes);
          const transform = getTransformForBounds(nodesBounds, 1024, 768, 0.5, 2);
    
          toPng(document.querySelector('.react-flow__viewport') as HTMLElement, {
            backgroundColor: '#1a365d',
            width: 2024,
            height: 1768,
            style: {
              width: '1024',
              height: '768',
              transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
            },
          }).then((dataUrl) => {
            dispatch(setImageData({ id: pipelineId, imgData: dataUrl }));
            document.body.removeChild(container);
          });
        }
      );
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, flexBasis: "100%" }} >
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => createNewPipeline()}
        sx={{ backgroundColor: "#bbb", "&:hover": { backgroundColor: "#eee" }, marginBlockStart: "10px" }}>
        Create New
      </Button>
      <Grid container spacing={{ xs: 1, md: 1 }} sx={{ padding: "10px" }}>
        {pipelines.map(({id, name, imgData}) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <PipelineCard id={id} name={name} imgData={imgData}></PipelineCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
