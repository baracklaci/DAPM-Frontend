import { Box } from "@mui/material";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import SaveIcon from '@mui/icons-material/Save';

const DataSinkNode = ({
    data,
    selected
}: NodeProps) => {

    return (
        <Box sx={{ backgroundColor: '#556677', padding: '10px', color: 'white', border: selected ? '2px solid red' : 'none' }}>
            <SaveIcon/>
            <Handle
                type="target"
                position={Position.Left}
            />
        </Box>
    );
};

DataSinkNode.displayName = "DataSink";

export default memo(DataSinkNode);
