import { RootState } from "../states";

export const getOrganizations = (state: RootState) => state.apiState.organizations
export const getRepositories = (state: RootState) => state.apiState.repositories
export const getResources = (state: RootState) => state.apiState.resources
export const getShowStatusEnable = (state: RootState) => state.pipelineState.showStatusEnable
export const getNodeStatus = (state: RootState) => state.pipelineState.nodeStatus;