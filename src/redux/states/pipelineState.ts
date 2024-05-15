import { Edge, Node } from 'reactflow';
import { NodeState } from './nodeState';

export interface PipelineState {
  pipelines: PipelineData[]
  activePipelineId: string
}

export interface PipelineData {
    id: string;
    flowData: NodeState;
}