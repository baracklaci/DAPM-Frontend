import { RootState } from "../states";

export const getNodes = (state: RootState) => state.pipelineState.pipelines.find(pipeline => pipeline.id === state.pipelineState.activePipelineId)?.pipeline.nodes

export const getEdges = (state: RootState) => state.pipelineState.pipelines.find(pipeline => pipeline.id === state.pipelineState.activePipelineId)?.pipeline.edges

export const getNode = (state: RootState, id: string) => state.pipelineState.pipelines.find(pipeline => pipeline.id === state.pipelineState.activePipelineId)?.pipeline.nodes.find(node => node.id === id)

export const getActiveFlowData = (state: RootState) => state.pipelineState.pipelines.find(pipeline => pipeline.id === state.pipelineState.activePipelineId)?.pipeline

export const getActivePipeline = (state: RootState) => state.pipelineState.pipelines.find(pipeline => pipeline.id === state.pipelineState.activePipelineId)

export const getPipelines = (state: RootState) => state.pipelineState.pipelines

export const getShowTemplateData = (state: RootState) => state.pipelineState.showTemplateDataEnable