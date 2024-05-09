import { RootState } from "../states";

export const getNodes = (state: RootState) => state.nodeState

export const getNode = (state: RootState, id: string) => state.nodeState.nodes.find(node => node.id === id)

export const getActivePipeline = (state: RootState) => state.pipelineState.pipelines.find(pipeline => pipeline.isActive)?.flowData