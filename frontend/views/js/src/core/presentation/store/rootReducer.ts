import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "@/core/presentation/store/loadingSlice";
import authReducer from "@/pages/auth/presentation/redux/authSlice";
import sidebarReducer from "@/core/presentation/store/sidebarSlice";
import userDataTableReducer from "@/pages/organization/user/presentation/redux/userDataTableSlice.ts";
import departmentDataTableReducer from "@/pages/department/presentation/redux/departmentDataTableSlice.ts";
import projectDataTableReducer from "@/pages/project_management/project/presentation/redux/projectDataTableSlice";
import clientDatabaseReducer from "@/pages/backend/client_database/presentation/redux/clientDatabaseSlice.ts";
import treeViewReducer from "@/pages/backend/api_test/presentation/redux/tree-view-slice.ts";


const rootReducer = combineReducers({
    loading: loadingReducer,
    auth: authReducer,
    sidebar: sidebarReducer,
    clientDatabase: clientDatabaseReducer,
    userDataTable: userDataTableReducer,
    departmentDataTable: departmentDataTableReducer,
    projectDataTable: projectDataTableReducer,
    treeView: treeViewReducer
});

export default rootReducer;
