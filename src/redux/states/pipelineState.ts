import { Edge, Node } from 'reactflow';
import { NodeState } from './nodeState';

export interface PipelineState {
  pipelines: PipelineData[]
}

export interface PipelineData {
    id: string;
    isActive: boolean;
    flowData: NodeState;
}