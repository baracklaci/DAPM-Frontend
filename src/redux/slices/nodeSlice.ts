import { addEdge as addFlowEdge, applyEdgeChanges, applyNodeChanges, Connection, Edge, EdgeChange, Node, NodeChange } from "reactflow";

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EdgeData, NodeData, NodeState } from "../states/nodeState";

export const initialState: NodeState = {
  nodes: [],
  edges: [],
}

const nodeSlice = createSlice({
  name: 'node',
  initialState: initialState,
  reducers: {
    addHandle: (state, { payload }: PayloadAction<string>) => {
      state.nodes.find(node => node.id === payload)?.data?.templateData?.sourceHandles.push({ type: 'source', id: "1"})
    },
    updateNode: (state, { payload }: PayloadAction<Node<NodeData> | undefined>) => {
      if (!payload) return
      const index = state.nodes.findIndex(node => node.id === payload.id)
      state.nodes[index] = payload
    },
    addNode: (state, { payload }: PayloadAction<Node>) => {
      state.nodes.push(payload)
    },
    removeNode: (state, { payload }: PayloadAction<Node<NodeData>>) => {
      state.nodes = state.nodes.filter(node => node.id !== payload.id && node.parentNode !== payload.id)
      state.edges = state.edges.filter(edge => 
        !payload.data?.templateData?.sourceHandles.find(data => data.id === edge.sourceHandle) && 
        !payload.data?.templateData?.targetHandles.find(data => data.id === edge.targetHandle))
    },
    removeEdge: (state, { payload }: PayloadAction<Edge>) => {
      state.edges = state.edges.filter(edge => edge.id !== payload.id)
    },
    addEdge: (state, { payload }: PayloadAction<Edge>) => {
      //console.log("addEdge", payload)
      state.edges.push(payload)
    },
    updateEdge: (state, { payload }: PayloadAction<Edge<EdgeData> | undefined>) => {
      if (!payload) return
      const index = state.edges.findIndex(edge => edge.id === payload.id)
      state.edges[index] = payload
    },
    // From react flow example
    onNodesChange: (state, { payload }: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(payload, state.nodes);
    },
    onEdgesChange: (state, { payload }: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(payload, state.edges);
    },
    onConnect: (state, { payload }: PayloadAction<Connection>) => {
      state.edges = addFlowEdge({...payload, style: {stroke: 'white', strokeOpacity: 1, strokeWidth: "1px"}}, state.edges);
    },
    setNodes: (state, { payload }: PayloadAction<Node[]>) => {
      state.nodes = payload;
    },
    setEdges: (state, { payload }: PayloadAction<Edge[]>) => {
      state.edges = payload;
    },
  },
})

export const { addHandle, updateNode, addNode, removeNode, removeEdge, addEdge, updateEdge, onNodesChange, onEdgesChange, onConnect, setNodes, setEdges } = nodeSlice.actions

export default nodeSlice.reducer 
