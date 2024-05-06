import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Edge } from "reactflow";
import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateEdge } from '../../../redux/slices/nodeSlice';
import { getNodes } from '../../../redux/selectors';


export interface AlgorithmConfugurationProps {
    edgeProp: Edge | undefined;
}

export default function EdgeConfiguration({ edgeProp }: AlgorithmConfugurationProps) {

    const dispatch = useDispatch()

    const edge = useSelector(getNodes).edges.find(edge => edge.id === edgeProp?.id);

    const setEdge = (edgeText: string) => {
        dispatch(updateEdge({ ...edge!, data: { text: edgeText } }))
    }
    return (
        <List>
            <>
                <ListItem>
                    <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
                        <TextField value={edge?.data?.text} id="outlined-basic" label="Outlined" variant="outlined" onChange={(event) => setEdge(event?.target.value as string)} />
                    </Box>
                </ListItem>
            </>
        </List >
    );
}
