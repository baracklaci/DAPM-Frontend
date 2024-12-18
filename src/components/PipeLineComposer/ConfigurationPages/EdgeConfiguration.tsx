import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Edge } from "reactflow";
import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateEdge } from '../../../redux/slices/pipelineSlice';
import { getActiveFlowData, getNodes } from '../../../redux/selectors';
import { RootState } from '../../../redux/states';


export interface AlgorithmConfugurationProps {
    edgeProp: Edge | undefined;
}

export default function EdgeConfiguration({ edgeProp }: AlgorithmConfugurationProps) {

    const dispatch = useDispatch()

    const edge = useSelector(getActiveFlowData)?.edges.find(edge => edge.id === edgeProp?.id);

    const setFilename = (edgeText: string) => {
        dispatch(updateEdge({ ...edge!, data: { filename: edgeText } }))
    }

    const showTemplateData = useSelector((state:RootState) => state.pipelineState.showTemplateDataEnable);
    
    return (
        <List>
            <>
                <ListItem>
                    <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
                        <TextField value={edge?.data?.filename} id="outlined-basic" label="Filename" variant="outlined" onChange={(event) => setFilename(event?.target.value as string)} />
                    </Box>
                </ListItem>
            </>
        </List >
    );
}
