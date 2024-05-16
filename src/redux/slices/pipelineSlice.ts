import { addEdge as addFlowEdge, applyEdgeChanges, applyNodeChanges, Connection, Edge, EdgeChange, Node, NodeChange } from "reactflow";

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EdgeData, NodeData, NodeState, PipelineData, PipelineState } from "../states/pipelineState";

export const initialState: PipelineState = {
  pipelines: [],
  activePipelineId: ""
}

const pipelineSlice = createSlice({
  name: 'pipelines',
  initialState: initialState,
  reducers: {
    addNewPipeline: (state, { payload }: PayloadAction<{ id: string, flowData: NodeState }>) => {
      state.pipelines.push({ id: payload.id, name: 'unnamed pipeline', flowData: payload.flowData } as PipelineData)
      state.activePipelineId = payload.id
    },
    setActivePipeline: (state, { payload }: PayloadAction<string>) => {
      state.activePipelineId = payload
    },
    
    // actions for the active pipeline
    
    updatePipelineName: (state, { payload }: PayloadAction<string>) => {
      var activePipeline = state.pipelines.find(pipeline => pipeline.id === state.activePipelineId)
      if (!activePipeline) return
      activePipeline!.name = payload
    },
    addHandle: (state, { payload }: PayloadAction<string>) => {
      var activeFlowData = state.pipelines.find(pipeline => pipeline.id === state.activePipelineId)?.flowData
      activeFlowData?.nodes.find(node => node.id === payload)?.data?.templateData?.sourceHandles.push({ type: 'source', id: "1" })
    },
    updateNode: (state, { payload }: PayloadAction<Node<NodeData> | undefined>) => {
      if (!payload) return
      var activeFlowData = state.pipelines.find(pipeline => pipeline.id === state.activePipelineId)?.flowData
      if (!activeFlowData) return
      const index = activeFlowData?.nodes.findIndex(node => node.id === payload.id)
      activeFlowData.nodes[index] = payload
    },
    addNode: (state, { payload }: PayloadAction<Node>) => {
      var activeFlowData = state.pipelines.find(pipeline => pipeline.id === state.activePipelineId)?.flowData
      activeFlowData?.nodes.push(payload)
    },
    removeNode: (state, { payload }: PayloadAction<Node<NodeData>>) => {
      var activeFlowData = state.pipelines.find(pipeline => pipeline.id === state.activePipelineId)?.flowData
      if (!activeFlowData) return
      activeFlowData.nodes = activeFlowData.nodes.filter(node => node.id !== payload.id && node.parentNode !== payload.id)
      activeFlowData.edges = activeFlowData.edges.filter(edge =>
        !payload.data?.templateData?.sourceHandles.find(data => data.id === edge.sourceHandle) &&
        !payload.data?.templateData?.targetHandles.find(data => data.id === edge.targetHandle))
    },
    removeEdge: (state, { payload }: PayloadAction<Edge>) => {
      var activeFlowData = state.pipelines.find(pipeline => pipeline.id === state.activePipelineId)?.flowData
      if (!activeFlowData) return
      activeFlowData!.edges = activeFlowData?.edges.filter(edge => edge.id !== payload.id)
    },
    addEdge: (state, { payload }: PayloadAction<Edge>) => {
      var activeFlowData = state.pipelines.find(pipeline => pipeline.id === state.activePipelineId)?.flowData
      //console.log("addEdge", payload)
      activeFlowData?.edges.push(payload)
    },
    updateEdge: (state, { payload }: PayloadAction<Edge<EdgeData> | undefined>) => {
      if (!payload) return
      var activeFlowData = state.pipelines.find(pipeline => pipeline.id === state.activePipelineId)?.flowData
      if (!activeFlowData) return
      const index = activeFlowData.edges.findIndex(edge => edge.id === payload.id)
      activeFlowData.edges[index] = payload
    },
    // From react flow example
    onNodesChange: (state, { payload }: PayloadAction<NodeChange[]>) => {
      var activeFlowData = state.pipelines.find(pipeline => pipeline.id === state.activePipelineId)?.flowData
      if (!activeFlowData) return
      activeFlowData.nodes = applyNodeChanges(payload, activeFlowData.nodes);
    },
    onEdgesChange: (state, { payload }: PayloadAction<EdgeChange[]>) => {
      var activeFlowData = state.pipelines.find(pipeline => pipeline.id === state.activePipelineId)?.flowData
      if (!activeFlowData) return
      activeFlowData.edges = applyEdgeChanges(payload, activeFlowData.edges);
    },
    onConnect: (state, { payload }: PayloadAction<Connection>) => {
      var activeFlowData = state.pipelines.find(pipeline => pipeline.id === state.activePipelineId)?.flowData
      if (!activeFlowData) return
      activeFlowData.edges = addFlowEdge({ ...payload, style: { stroke: 'white', strokeOpacity: 1, strokeWidth: "1px" } }, activeFlowData.edges);
    },
    setNodes: (state, { payload }: PayloadAction<Node[]>) => {
      var activeFlowData = state.pipelines.find(pipeline => pipeline.id === state.activePipelineId)?.flowData
      if (!activeFlowData) return
      activeFlowData.nodes = payload;
    },
    setEdges: (state, { payload }: PayloadAction<Edge[]>) => {
      var activeFlowData = state.pipelines.find(pipeline => pipeline.id === state.activePipelineId)?.flowData
      if (!activeFlowData) return
      activeFlowData.edges = payload;
    },
  },
})

export const { addNewPipeline, setActivePipeline, updatePipelineName, addHandle, updateNode, addNode, removeNode, removeEdge, addEdge, updateEdge, onNodesChange, onEdgesChange, onConnect, setNodes, setEdges } = pipelineSlice.actions

export default pipelineSlice.reducer 
