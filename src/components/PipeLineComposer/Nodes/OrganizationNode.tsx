import { Box, Typography } from '@mui/material';
import { memo, useState } from 'react';
import {
  NodeProps,
  NodeResizer} from 'reactflow';

const lineStyle = { borderColor: 'white', Visibility: 'visible'};

function OrganizationNode({ data, id }: NodeProps) {
  
  const minWidth = 100;
  const minHeight = 100;

  return (
    <Box sx={{backgroundColor: "#ffffff10", height: "100%"}}>
      <NodeResizer
        lineStyle={lineStyle}
        minHeight={minHeight}
        minWidth={minWidth}
        isVisible={true}
      />
      <Typography sx={{color: "white"}}>{data?.label}</Typography>
      
    </Box>
  );
}

export default memo(OrganizationNode)