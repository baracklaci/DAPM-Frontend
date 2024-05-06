import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getNodes } from "../../redux/selectors";
import nodeSlice from "../../redux/slices/nodeSlice";

export default function PipelineAppBar() {
  const navigate = useNavigate();

  const flowData = useSelector(getNodes)

  const generateJson = () => {
    const requestData = {
      nodes: flowData.nodes.map(node => {
        return { type: node.type, templateData: node?.data?.templateData, instantiationData: node?.data?.instantiationData }
      }),
      edges: flowData.edges.map(edge => {
        return {sourceHandle: edge.sourceHandle, targetHandle: edge.targetHandle}
      })
    }

    //alert(JSON.stringify(requestData))
    console.log(JSON.stringify(requestData))
  } 

    return (
    <AppBar position="fixed">
        <Toolbar sx={{flexGrow: 1}}>
          <Button onClick={() => navigate('/')}>
            <ArrowBackIosNewIcon sx={{color: "white"}}/>
          </Button>
          <Typography sx={{width: '100%', textAlign: 'center'}} variant="h6" noWrap component="div">
            very cool DAPM pipeline maker
          </Typography>
          <Button onClick={() => generateJson()}>
            <Typography variant="body1" sx={{color: "white"}}>Generate json</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    )
}
