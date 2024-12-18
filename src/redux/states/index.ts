import { ApiState } from './apiState';
import { PipelineState } from './pipelineState';
import { AuthState } from "../slices/userSlice";

export interface RootState {
  pipelineState: PipelineState
  apiState: ApiState
  auth: AuthState
}
