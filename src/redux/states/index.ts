import { Edge, Node } from 'reactflow';

export interface RootState {
  nodeState: NodeState
}

export interface NodeState {
  nodes: Node[],
  edges: Edge[],
}
