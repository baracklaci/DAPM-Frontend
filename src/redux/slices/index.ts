import { Reducer, combineReducers } from "redux"
import nodeReducer from "./nodeSlice"
import { RootState } from "../states"

const rootReducer: Reducer<RootState> = combineReducers({
    nodeState: nodeReducer,
})

export default rootReducer
