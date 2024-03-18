import { AppBar, Toolbar, Typography } from "@mui/material";

export default function PipelineAppBar() {
    return (
    <AppBar position="fixed">
        <Toolbar sx={{flexGrow: 1}}>
          <Typography sx={{width: '100%', textAlign: 'center'}} variant="h6" noWrap component="div">
            very cool DAPM pipeline maker
          </Typography>
        </Toolbar>
      </AppBar>
    )
}