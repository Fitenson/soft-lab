import { combineReducers } from "@reduxjs/toolkit";
import apiTestReducer from "./apiTestSlice";
import apiTestUIReducer from "./apiTestUISlice.ts";


const apiTestRootReducer = combineReducers({
    data: apiTestReducer,
    ui: apiTestUIReducer,
});

export default apiTestRootReducer;
