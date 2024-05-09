import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PipelineCard from './PipelineCard';
import { Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewPipeline } from '../../redux/slices/pipelineSlice';

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

  const createNewPipeline = () => {
    dispatch(addNewPipeline({id: `pipeline-${crypto.randomUUID()}`, flowData: {nodes: [], edges: []}}));
    { navigate("/pipeline") }
  }

  return (
    <Box sx={{ flexGrow: 1, flexBasis: "100%" }} >
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => createNewPipeline()}
        sx={{ backgroundColor: "#bbb", "&:hover": { backgroundColor: "#eee" }, marginBlockStart: "10px" }}>
        Create New
      </Button>
      <Grid container spacing={{ xs: 1, md: 1 }} sx={{ padding: "10px" }}>
        {Array.from(Array(6).keys()).map((value) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <PipelineCard></PipelineCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}