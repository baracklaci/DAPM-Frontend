import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PipelineCard from './PipelineCard';
import { Button, Tabs, Tab, Typography, InputBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPipeline, setImageData } from '../../redux/slices/pipelineSlice';
import { getPipelines } from '../../redux/selectors';
import FlowDiagram from './ImageGeneration/FlowDiagram';
import ReactDOM from 'react-dom';
import { toPng } from 'html-to-image';
import { getNodesBounds, getViewportForBounds } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { Edge, Node } from 'reactflow';
import { useState } from 'react';
import { PipelineState, NodeState, EdgeData, NodeData } from '../../redux/states/pipelineState';
import {
  DataSourceInstantiationData,
  DataSinkInstantiationData,
  OperatorInstantiationData,
  OrganizationInstantiationData,
} from '../../redux/states/pipelineState';
import { userInfo } from '../../redux/slices/userSlice';
import SearchIcon from "@mui/icons-material/Search";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Styled Search Components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[200],
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "20ch",
  },
}));

export default function AutoGrid() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pipelines = useSelector(getPipelines);

  const [searchQuery, setSearchQuery] = useState("");

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Function to filter pipelines based on the search query
  const filteredPipelines = pipelines.filter(({ name }) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const createNewPipeline = () => {
    dispatch(addNewPipeline({ id: `pipeline-${uuidv4()}`, flowData: { nodes: [], edges: [] } }));
    navigate("/pipelineTemplate");
  };

  if (!pipelines || pipelines.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          No pipelines available. Create a new one!
        </Typography>
        {userInfo.roles.includes("Admin") &&(<Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={createNewPipeline}
          sx={{
            backgroundColor: "#bbb",
            "&:hover": { backgroundColor: "#eee" },
          }}
        >
          Create New Template
        </Button>)}
      </Box>
    );
  }

  pipelines.map(({ pipeline: flowData, id }) => {
    const nodes = flowData.nodes;
    const edges = flowData.edges;

    const pipelineId = id;
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "-10000px";
    container.id = pipelineId;
    document.body.appendChild(container);

    ReactDOM.render(
      <FlowDiagram nodes={nodes} edges={edges} />,
      container,
      () => {
        const width = 800;
        const height = 600;

        const nodesBounds = getNodesBounds(nodes!);
        const { x, y, zoom } = getViewportForBounds(
          nodesBounds,
          width,
          height,
          0.5,
          2,
          1
        );

        toPng(
          document.querySelector(
            `#${pipelineId} .react-flow__viewport`
          ) as HTMLElement,
          {
            backgroundColor: "#333",
            width: width,
            height: height,
            style: {
              width: `${width}`,
              height: `${height}`,
              transform: `translate(${x}px, ${y}px) scale(${zoom})`,
            },
          }
        ).then((dataUrl) => {
          dispatch(setImageData({ id: pipelineId, imgData: dataUrl }));
          document.body.removeChild(container);
        });
      }
    );
  });



  // const isTemplate = (pipeline: { nodes: { type: string; instantiationData?: any }[]; edges: { type: string; instantiationData?: any }[] }) => {
  //   return pipeline.nodes.every((node: { type: string; instantiationData?: any }) => node.type === 'Template' && !node.instantiationData) &&
  //          pipeline.edges.every((edge: { type: string; instantiationData?: any }) => edge.type === 'Template' && !edge.instantiationData);
  // };
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
  
  

  

  const templates = pipelines.filter(({ pipeline }: { pipeline: { nodes: any[]; edges: any[] } }) => isTemplate(pipeline));
  const instances = pipelines.filter(({ pipeline }: { pipeline: { nodes: any[]; edges: any[] } }) => !isTemplate(pipeline));

  const renderPipelinePreview = (pipelineList: { id: string; name: string; imgData: string }[]) => {
    return pipelineList.map(({ id, name, imgData }) => (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={id}>
        <PipelineCard id={id} name={name} imgData={imgData}></PipelineCard>
      </Grid>
    ));
  };

  return (
    <Box sx={{ flexGrow: 1, flexBasis: "100%" }}>
      {/* Top Bar with Create New and Search */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBlockStart: "10px",
          paddingInline: "10px",
          gap: "16px", // Adds spacing between elements
        }}
      >
        {userInfo.roles.includes("Admin") && (<Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={createNewPipeline}
          sx={{
            backgroundColor: "#bbb",
            "&:hover": { backgroundColor: "#eee" },
          }}
        >
          Create New
        </Button>)}

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Pipelines…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </Search>
      </Box>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ marginBlockStart: "20px" }}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Templates" />
        <Tab label="Instances" />
      </Tabs>

      {/* Grid for Pipelines */}
      <Grid container spacing={{ xs: 1, md: 1 }} sx={{ padding: "10px" }}>
        {activeTab === 0 && renderPipelinePreview(templates)}
        {activeTab === 1 && renderPipelinePreview(instances)}
        {filteredPipelines.map(({ id, name, imgData }) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={id}>
            <PipelineCard id={id} name={name} imgData={imgData}></PipelineCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
