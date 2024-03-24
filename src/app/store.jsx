import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice"
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore (rootReducer, applyMiddleware(thunk));

export default store;