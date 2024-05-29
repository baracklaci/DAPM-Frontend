import { Box } from "@mui/material";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeData, OperatorNodeData } from "../../../redux/states/pipelineState";

function CustomNode({data, selected}: NodeProps<OperatorNodeData>) {

  return (
    <Box sx={{backgroundColor: '#556677', padding: '10px', color: 'white', position: "relative", border: selected ? '2px solid #007bff' : '2px solid #556677'}}>
      <Box style={{display: "flex", flexDirection: "column", justifyContent: "space-around", position: "absolute", top: "0", bottom: "0", left: "0"}}>
      {data?.templateData.targetHandles?.map(handle => <Handle
        key={handle.id}
        id={handle.id}
        type="target"
        position={Position.Left}
        style={{position: "relative", transform: "none", top: "auto"}}
      />)}
      </Box>
      {data?.templateData.hint}
      <Box style={{display: "flex", flexDirection: "column", justifyContent: "space-around", position: "absolute", top: "0", bottom: "0", right: "0"}}>
      {data?.templateData.sourceHandles?.map(handle => <Handle
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
