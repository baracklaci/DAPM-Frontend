import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActivePipeline } from '../../redux/slices/pipelineSlice';

export interface PipelineCardProps {
  id: string;
  name: string;
  imgData: string;
}

export default function MediaCard({ id, name, imgData }: PipelineCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToPipeline = () => {
    dispatch(setActivePipeline(id));
    navigate('/pipeline');
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