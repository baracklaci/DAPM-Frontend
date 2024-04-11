import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function PipelineAppBar() {
    return (
    <AppBar position="fixed">
        <Toolbar sx={{flexGrow: 1}}>
          <Button href="/">
            <ArrowBackIosNewIcon sx={{color: "white"}}/>
          </Button>
          <Typography sx={{width: '100%', textAlign: 'center'}} variant="h6" noWrap component="div">
            very cool DAPM pipeline maker
          </Typography>
        </Toolbar>
      </AppBar>
    )
}