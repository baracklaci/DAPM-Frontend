import { Box } from "@mui/material";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import SaveIcon from '@mui/icons-material/Save';

const DataSinkNode = ({
    data,
    selected
}: NodeProps) => {

    return (
        <Box sx={{ backgroundColor: '#556677', padding: '10px', color: 'white', border: selected ? '2px solid black' : '2px solid #556677'}}>
            <SaveIcon/>
            <Handle
                id="3"
                key="3"
                type="target"
                position={Position.Left}
            />
        </Box>
    );
};

DataSinkNode.displayName = "DataSink";

export default memo(DataSinkNode);
