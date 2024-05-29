import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  NodeProps,
  NodeResizer} from 'reactflow';
import { getNodes } from '../../../redux/selectors';
import { getRelativeNodesBounds } from '../utils';
import { OrganizationNodeData } from '../../../redux/states/pipelineState';


function OrganizationNode({ data, id, selected }: NodeProps<OrganizationNodeData>) {

  const lineStyle: React.CSSProperties = {borderColor: selected ? '#007BFF' : 'white', visibility: 'visible'};

  const childNodes = useSelector(getNodes)?.filter(
    (n) => n.parentNode === id
  );

  const rect = getRelativeNodesBounds(childNodes!);

  const minWidth = rect.x + rect.width
  const minHeight = rect.y + rect.height
  
  return (
    <Box sx={{backgroundColor: "#ffffff10", height: "100%"}}>
      <NodeResizer
        lineStyle={lineStyle}
        minHeight={minHeight}
        minWidth={minWidth}
        isVisible={true}
      />
      <Typography sx={{color: "white"}}>{data?.instantiationData.organization?.name ?? '-'}</Typography>
      
    </Box>
  );
}

export default memo(OrganizationNode)