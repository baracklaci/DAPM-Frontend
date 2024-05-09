import { ApiState } from './apiState';
import { NodeState } from './nodeState';
import { PipelineState } from './pipelineState';

export interface RootState {
  nodeState: NodeState
  pipelineState: PipelineState
  apiState: ApiState
}
