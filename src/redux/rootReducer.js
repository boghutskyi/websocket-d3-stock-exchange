import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { stocksReducer } from "./stocksReducer";

export const rootReducer = combineReducers({
    stocks: stocksReducer,
    app: appReducer
})