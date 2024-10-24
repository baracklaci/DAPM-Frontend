import { createRoot } from "react-dom/client";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PipelineCard from "./PipelineCard";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPipeline,
  setImageData,
  setPipelines,
} from "../../redux/slices/pipelineSlice";
import { getPipelines } from "../../redux/selectors";
import FlowDiagram from "./ImageGeneration/FlowDiagram";
import { toPng } from "html-to-image";
import { getNodesBounds, getViewportForBounds } from "reactflow";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import {
  getOrganizations,
  getRepositories,
} from "../../redux/selectors/apiSelector";
import { fetchRepositoryPipelineList } from "../../services/backendAPI";
import { Spinner } from "../common/Spinner";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AutoGrid() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Author:
   * - Raihanullah Mehran
   *
   * Description:
   * 1. This part of code calls the fetchRepositoryPipelineList method which returns pipelines.
   * 2. I created setPipelines reducer on the pipelineSlice.ts of redux to hold the fetched pipelines.
   * 3. Updated the rendering code to use createRoot to replace reactDOM.render because it's deprecated.
   */
  const organizations = useSelector(getOrganizations);
  const repositories = useSelector(getRepositories);
  const pipelines = useSelector(getPipelines);

  const fetcDbPipelines = async () => {
    try {
      const selectedOrg = organizations[0];
      const selectedRepo = repositories.filter(
        (repo) => repo.organizationId === selectedOrg.id
      )[0];

      if (!selectedRepo) {
        console.error("No repository found for the selected organization.");
        return [];
      }

      const pipelines = await fetchRepositoryPipelineList(
        selectedOrg.id,
        selectedRepo.id
      );

      return pipelines || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    const updatePipelines = async () => {
      const dbPipelines = await fetcDbPipelines();
      if (dbPipelines) {
        console.log("dbPipelines : ", dbPipelines);
        dispatch(setPipelines(dbPipelines));
      }
    };

    updatePipelines();
  }, [dispatch, organizations, repositories]);

  const createNewPipeline = () => {
    dispatch(
      addNewPipeline({
        id: `pipeline-${uuidv4()}`,
        flowData: { nodes: [], edges: [] },
      })
    );
    {
      navigate("/pipeline");
    }
  };

  pipelines.map(({ pipeline: flowData, id, name }) => {
    const nodes = flowData.nodes;
    const edges = flowData.edges;
    const pipelineId = id;
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.top = "-10000px";
    container.style.width = "800px";
    container.style.height = "600px";
    container.id = pipelineId;

    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(<FlowDiagram nodes={nodes} edges={edges} />);

    setTimeout(() => {
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

      const validPipelineId = CSS.escape(pipelineId);

      const element = document.querySelector(
        `#${validPipelineId} .react-flow__viewport`
      ) as HTMLElement;

      if (element) {
        toPng(element, {
          backgroundColor: "#333",
          width: width,
          height: height,
          style: {
            width: `${width}px`,
            height: `${height}px`,
            transform: `translate(${x}px, ${y}px) scale(${zoom})`,
          },
        })
          .then((dataUrl) => {
            dispatch(setImageData({ id: pipelineId, imgData: dataUrl }));
            document.body.removeChild(container);
          })
          .catch((error) => {
            console.error("Error generating PNG:", error);
            document.body.removeChild(container);
          });
      } else {
        console.error(`Element not found for pipeline: ${pipelineId}`);
      }
    }, 1000);
  });

  return (
    <>
      <Box sx={{ flexGrow: 1, flexBasis: "100%" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => createNewPipeline()}
          sx={{
            backgroundColor: "#bbb",
            "&:hover": { backgroundColor: "#eee" },
            marginBlockStart: "10px",
          }}
        >
          Create New
        </Button>

        {pipelines.length ? (
          <div>
            {pipelines ? (
              <Grid
                container
                spacing={{ xs: 1, md: 1 }}
                sx={{ padding: "10px" }}
              >
                {pipelines.map(({ id, name, imgData }) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <PipelineCard
                      id={id}
                      name={name}
                      imgData={imgData}
                    ></PipelineCard>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <div>No pipelines found!</div>
            )}
          </div>
        ) : (
          <div className="flex justify-center item">
            <Spinner />
          </div>
        )}
      </Box>
    </>
  );
}
