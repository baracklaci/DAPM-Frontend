import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePipeline } from '../../redux/slices/pipelineSlice';
import { PipelineState, NodeState, EdgeData, NodeData } from '../../redux/states/pipelineState';
import {
  DataSourceInstantiationData,
  DataSinkInstantiationData,
  OperatorInstantiationData,
  OrganizationInstantiationData,
} from '../../redux/states/pipelineState';
import { Edge, Node } from 'reactflow';
import { useState } from 'react';
import { RootState } from '../../redux/states';


export interface PipelineCardProps {
  id: string;
  name: string;
  imgData: string;
}

export default function MediaCard({ id, name, imgData }: PipelineCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pipelines = useSelector((state: RootState) => state.pipelineState.pipelines);
  const activePipeline = pipelines.find(pipeline => pipeline.id === id);

  const isTemplate = (pipeline: NodeState): boolean => {
      const isInstantiationDataEmpty = (data: NodeData): boolean => {
        const instantiationData = data.instantiationData;
    
        if ('resource' in instantiationData) {
  
          return !(instantiationData as DataSourceInstantiationData).resource;
        } else if ('repository' in instantiationData) {
  
          const instData = instantiationData as DataSinkInstantiationData;
          return !instData.repository && !instData.name;
        } else if ('algorithm' in instantiationData) {
  
          return !(instantiationData as OperatorInstantiationData).algorithm;
        }
    
        if ('organization' in instantiationData) {
          return true;
        }
  
        return !instantiationData || Object.keys(instantiationData).length === 0;
      };
    
      const allNodesAreTemplates = pipeline.nodes.every((node: Node<NodeData>) => {
        return node.data.templateData && isInstantiationDataEmpty(node.data);
      });
    
      const allEdgesAreTemplates = pipeline.edges.every((edge: Edge<EdgeData>) => {
        return !edge.data?.filename;
      });
    
      return allNodesAreTemplates && allEdgesAreTemplates;
    };



  const navigateToPipeline = () => {
    dispatch(setActivePipeline(id));
    if (activePipeline && isTemplate(activePipeline.pipeline)) {
      navigate('/pipelineTemplate');
    } else {
      navigate("/pipelineInstantiation");
    }
  
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={navigateToPipeline}>
        <CardMedia
          sx={{ height: 140 }}
          title="green iguana"
          image={imgData}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click this to modify the pipeline
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  
}