import { Box } from "@mui/material";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import SourceIcon from '@mui/icons-material/Source';

const DataSourceNode = ({
    data,
}: NodeProps) => {

    return (
        <Box sx={{ backgroundColor: '#556677', padding: '10px', color: 'white' }}>
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
