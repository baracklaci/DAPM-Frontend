import { Box } from "@mui/material";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import SourceIcon from '@mui/icons-material/Source';

const DataSourceNode = ({
    data,
    selected
}: NodeProps) => {

    return (
        <Box sx={{ backgroundColor: '#556677', padding: '10px', color: 'white', border: selected ? '2px solid black' : '2px solid #556677'}}>
            <SourceIcon/>
            <Handle
                type="source"
                position={Position.Right}
            />
        </Box>
    );
};

DataSourceNode.displayName = "DataSource";

export default memo(DataSourceNode);
