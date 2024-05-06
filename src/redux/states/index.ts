import { Edge, Node } from 'reactflow';
import { ApiState } from './apiState';

export interface RootState {
  nodeState: NodeState,
  apiState: ApiState
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
