import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";

export default function PipelineAppBar() {
  const navigate = useNavigate();
    return (
    <AppBar position="fixed">
        <Toolbar sx={{flexGrow: 1}}>
          <Button onClick={() => navigate('/')}>
            <ArrowBackIosNewIcon sx={{color: "white"}}/>
          </Button>
          <Typography sx={{width: '100%', textAlign: 'center'}} variant="h6" noWrap component="div">
            very cool DAPM pipeline maker
          </Typography>
        </Toolbar>
      </AppBar>
    )
}