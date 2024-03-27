import { Box } from "@mui/material";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import styled from "styled-components";

const CustomNode = ({
  data,
  selected,
}: NodeProps) => {
  return (
    <Box sx={{backgroundColor: '#556677', padding: '10px', color: 'white', border: selected ? '2px solid black' : '2px solid #556677'}}>
      <Box sx={{display: "flex"}}>
      <Handle
        type="target"
        position={Position.Left}
      />
      </Box>
      {data?.label}
      <Handle
        type="source"
        position={Position.Right}
      />
    </Box>
  );
};

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);
