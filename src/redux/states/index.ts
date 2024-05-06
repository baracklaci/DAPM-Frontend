import { NodeState } from './nodeState';
import { ApiState } from './apiState';

export interface RootState {
  nodeState: NodeState,
  apiState: ApiState
}
