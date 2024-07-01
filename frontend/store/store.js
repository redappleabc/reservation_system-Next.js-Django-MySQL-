import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authReducer from "./slices/authSlice";
// import agentSlice from "../features/agent/agentSlice";
// import { api } from "../features/api/api";
// import filterSlice from "../features/filter/filterSlice";
// import propertiesSlice from "../features/properties/propertiesSlice";

const rootReducer = combineReducers({
    auth: authReducer,
})

export const store = configureStore({
    reducer: rootReducer,
});
