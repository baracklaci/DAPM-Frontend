import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActivePipeline } from '../../redux/slices/pipelineSlice';

export interface PipelineCardProps {
  id: string;
  name: string;
  imgData: string;
  status: 'not started' | 'running' | 'faulty' | 'completed';
  output: string; // Pipeline output text
}

export default function MediaCard({ id, name, imgData, status, output }: PipelineCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);  // State to control dialog open/close

  const navigateToPipeline = () => {
    dispatch(setActivePipeline(id));
    navigate('/pipeline');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '#4caf50'; // Green
      case 'faulted':
        return '#f44336'; // Red
      case 'running':
        return '#ff9800'; // Orange
      default:
        return '#9e9e9e'; // Grey
    }
  };

  const handleDialogOpen = (event: React.MouseEvent) => {
    event.stopPropagation();  // Prevent triggering the navigation when clicking the smaller button
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  // Function to handle downloading the pipeline output as a .txt file
  const downloadOutputAsText = () => {
    const blob = new Blob([output], { type: 'text/plain' }); // Create a Blob from the output text
    const link = document.createElement('a'); // Create a temporary anchor element
    link.href = URL.createObjectURL(blob); // Create an object URL for the blob
    link.download = `${name}_output.txt`; // Set the filename
    link.click(); // Trigger the download
    URL.revokeObjectURL(link.href); // Clean up the object URL
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={navigateToPipeline}>
        <CardMedia
          sx={{ height: 140 }}
          title={name}
          image={imgData}
        />
        <CardContent>
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              width: 15,
              height: 15,
              borderRadius: '50%',
              backgroundColor: getStatusColor(status),
              border: '2px solid white',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
              zIndex: 2,
            }}
          />
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click this to modify the pipeline
          </Typography>
        </CardContent>

        {/* Conditional rendering of the smaller ("View Output") button */}
        {(status === 'faulty' || status === 'completed') && (
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button size="small" color="primary" onClick={handleDialogOpen}>
              View Output
            </Button>
          </CardActions>
        )}
      </CardActionArea>

      {/* Dialog to display the pipeline's output */}
      <Dialog open={open} onClose={handleDialogClose}>
        {/* <DialogTitle>Pipeline Output</DialogTitle> */}
        <DialogTitle>Pipeline Output: {name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {output}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={downloadOutputAsText} color="primary">
            Download as .txt
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );

  
}