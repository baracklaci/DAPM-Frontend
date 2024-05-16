import { RootState } from "../states";

export const getNodes = (state: RootState) => state.pipelineState.pipelines.find(pipeline => pipeline.id === state.pipelineState.activePipelineId)?.flowData.nodes

export const getEdges = (state: RootState) => state.pipelineState.pipelines.find(pipeline => pipeline.id === state.pipelineState.activePipelineId)?.flowData.edges

export const getNode = (state: RootState, id: string) => state.pipelineState.pipelines.find(pipeline => pipeline.id === state.pipelineState.activePipelineId)?.flowData.nodes.find(node => node.id === id)

export const getActiveFlowData = (state: RootState) => state.pipelineState.pipelines.find(pipeline => pipeline.id === state.pipelineState.activePipelineId)?.flowData

export const getActivePipeline = (state: RootState) => state.pipelineState.pipelines.find(pipeline => pipeline.id === state.pipelineState.activePipelineId)

export const getPipelines = (state: RootState) => state.pipelineState.pipelines