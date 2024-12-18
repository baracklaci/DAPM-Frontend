import { Reducer, combineReducers } from "redux"
import nodeReducer from "./pipelineSlice"
import apiReducer from "./apiSlice"
import pipelineReducer from "./pipelineSlice"
import authReducer from "./userSlice"
import { RootState } from "../states"

const rootReducer: Reducer<RootState> = combineReducers({
    apiState: apiReducer,
    pipelineState: pipelineReducer,
    auth: authReducer,
})

export default rootReducer
