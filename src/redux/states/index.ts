import { ApiState } from './apiState';
import { PipelineState } from './pipelineState';

export interface RootState {
  pipelineState: PipelineState
  apiState: ApiState
}
