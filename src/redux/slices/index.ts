import { Reducer, combineReducers } from "redux"
import nodeReducer from "./pipelineSlice"
import apiReducer from "./apiSlice"
import pipelineReducer from "./pipelineSlice"
import { RootState } from "../states"

const rootReducer: Reducer<RootState> = combineReducers({
    //nodeState: nodeReducer,
    apiState: apiReducer,
    pipelineState: pipelineReducer
})

export default rootReducer
