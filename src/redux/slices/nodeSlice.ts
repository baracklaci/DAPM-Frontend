import { addEdge as addFlowEdge, applyEdgeChanges, applyNodeChanges, Connection, Edge, EdgeChange, Node, NodeChange } from "reactflow";

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NodeState } from "../states";

export const initialState: NodeState = {
  nodes: [],
  edges: [],
}

const nodeSlice = createSlice({
  name: 'node',
  initialState: initialState,
  reducers: {
    addNode: (state, { payload }: PayloadAction<Node>) => {
      state.nodes.push(payload)
    },
    removeNode: (state, { payload }: PayloadAction<Node>) => {
      state.nodes = state.nodes.filter(node => node.id !== payload.id)
    },
    addEdge: (state, { payload }: PayloadAction<Edge>) => {
      state.edges.push(payload)
    },
    // From react flow example
    onNodesChange: (state, { payload }: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(payload, state.nodes);
    },
    onEdgesChange: (state, { payload }: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(payload, state.edges);
    },
    onConnect: (state, { payload }: PayloadAction<Connection>) => {
      console.log('onConnect', payload)
      state.edges = addFlowEdge(payload, state.edges);
    },
    setNodes: (state, { payload }: PayloadAction<Node[]>) => {
      state.nodes = payload;
    },
    setEdges: (state, { payload }: PayloadAction<Edge[]>) => {
      state.edges = payload;
    },
  },
})

export const { addNode, removeNode, addEdge, onNodesChange, onEdgesChange, onConnect, setNodes, setEdges } = nodeSlice.actions

export default nodeSlice.reducer 
