import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import {
  NodeProps,
  NodeResizer} from 'reactflow';


function OrganizationNode({ data, id, selected }: NodeProps) {

  const lineStyle: React.CSSProperties = {borderColor: selected ? '#007BFF' : 'white', visibility: 'visible'};

  return (
    <Box sx={{backgroundColor: "#ffffff10", height: "100%"}}>
      <NodeResizer
        lineStyle={lineStyle}
        isVisible={true}
      />
      <Typography sx={{color: "white"}}>{data?.label}</Typography>
      
    </Box>
  );
}

export default memo(OrganizationNode)