import { Reducer, combineReducers } from "redux"
import nodeReducer from "./nodeSlice"
import apiReducer from "./apiSlice"
import { RootState } from "../states"

const rootReducer: Reducer<RootState> = combineReducers({
    nodeState: nodeReducer,
    apiState: apiReducer
})

export default rootReducer
