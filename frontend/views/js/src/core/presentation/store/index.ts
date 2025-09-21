import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

import loadingReducer from "@/core/presentation/store/loadingSlice";
import authReducer from "@/pages/auth/presentation/redux/authSlice";
import sidebarReducer from "@/core/presentation/store/sidebarSlice";
import userDataTableReducer from "@/pages/organization/user/presentation/redux/userDataTableSlice.ts";
import departmentDataTableReducer from "@/pages/department/presentation/redux/departmentDataTableSlice.ts";
import projectDataTableReducer from "@/pages/project_management/project/presentation/redux/projectDataTableSlice";


const rootReducer = combineReducers({
    loading: loadingReducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    userDataTable: userDataTableReducer,
    departmentDataTable: departmentDataTableReducer,
    projectDataTable: projectDataTableReducer
});


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["authViewModel"],
}


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
