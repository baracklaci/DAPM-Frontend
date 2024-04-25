import { Box } from "@mui/material";
import { relative } from "path";
import { memo, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import styled from "styled-components";
import { NodeData } from "../../../redux/states";
import { getNode, getNodes } from "../../../redux/selectors";
import { useSelector } from "react-redux";

// const CustomNode = ({
//   id,
//   data,
//   selected
// }: NodeProps<NodeData>) => {
function CustomNode({id}: NodeProps<NodeData>) {
  const node = useSelector(getNodes).nodes.find(node => node.id === id);
  const data = node?.data;
  const selected = node?.selected;

  return (
    <Box sx={{backgroundColor: '#556677', padding: '10px', color: 'white', position: "relative", border: selected ? '2px solid black' : '2px solid #556677'}}>
      <Box style={{display: "flex", flexDirection: "column", justifyContent: "space-around", position: "absolute", top: "0", bottom: "0", left: "0"}}>
      {data?.sourceHandles?.map(handle => <Handle
        key={handle.id}
        id={handle.id}
        type="target"
        position={Position.Left}
        style={{position: "relative", transform: "none", top: "auto"}}
      />)}
      </Box>
      {data?.label}
      <Box style={{display: "flex", flexDirection: "column", justifyContent: "space-around", position: "absolute", top: "0", bottom: "0", right: "0"}}>
      {data?.targetHandles?.map(handle => <Handle
        key={handle.id}
        id={handle.id}
        type="source"
        position={Position.Right}
        style={{position: "relative", transform: "none", top: "auto"}}
      />)}
      </Box>
    </Box>
  );
}

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);
