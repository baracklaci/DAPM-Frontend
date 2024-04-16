import { RootState } from "../states";

export const getNodes = (state: RootState) => state.nodeState

export const getNode = (state: RootState, id: string) => state.nodeState.nodes.find(node => node.id === id)
