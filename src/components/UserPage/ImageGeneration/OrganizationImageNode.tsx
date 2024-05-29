import { Box, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  NodeProps,
  NodeResizer} from 'reactflow';
import { getNodes } from '../../../redux/selectors';


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