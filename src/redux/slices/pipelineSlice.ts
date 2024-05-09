import { addEdge as addFlowEdge, applyEdgeChanges, applyNodeChanges, Connection, Edge, EdgeChange, Node, NodeChange } from "reactflow";

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EdgeData, NodeData, NodeState } from "../states/nodeState";
import { PipelineData, PipelineState } from "../states/pipelineState";
import { useDispatch } from "react-redux";

export const initialState: PipelineState = {
    pipelines: []
}

const pipelineState = createSlice({
    name: 'pipelines',
    initialState: initialState,
    reducers: {
        addNewPipeline: (state, { payload }: PayloadAction<{id: string, flowData: NodeState}>) => {
            state.pipelines.push({ id: payload.id, flowData: payload.flowData } as PipelineData)
        },
    },
})

export const { addNewPipeline, } = pipelineState.actions

export default pipelineState.reducer 
