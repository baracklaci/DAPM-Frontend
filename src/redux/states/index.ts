import { Edge, Node } from 'reactflow';

export interface RootState {
  nodeState: NodeState
}

export interface NodeState {
  nodes: Node<NodeData>[],
  edges: Edge[],
}

export interface HandleData {
  type: string,
  id: string,
}

export interface NodeData {
  label: string
  sourceHandles: HandleData[],
  targetHandles: HandleData[],
}
