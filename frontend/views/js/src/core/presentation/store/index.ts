import { configureStore } from "@reduxjs/toolkit";

import loadingReducer from "@/core/presentation/store/loadingSlice";
import AuthViewModel from "@/pages/auth/presentation/view_models/AuthViewModel";
import authReducer from "@/pages/auth/presentation/redux/authSlice";
import sidebarReducer from "@/core/presentation/store/sidebarSlice";
import userDataTableReducer from "@/pages/user/presentation/redux/userDataTableSlice.ts";
import departmentDataTableReducer from "@/pages/department/presentation/redux/departmentDataTableSlice.ts";
import type { AuthDTO } from "@/pages/auth/data/dto/AuthDTO";


function loadAuthFromStorage() {
    const jsonString = localStorage.getItem("auth");

    if (!jsonString) {
        return { authViewModel: null };
    }

    try {
        const authDTO: AuthDTO = JSON.parse(jsonString);
        return { authViewModel: new AuthViewModel(authDTO) };
    } catch (error) {
        console.error("Failed to parse auth from localStorage", error);
        localStorage.removeItem("auth");
        return { authViewModel: null };
    }
}


export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        auth: authReducer,
        sidebar: sidebarReducer,
        userDataTable: userDataTableReducer,
        departmentDataTable: departmentDataTableReducer
    },
    preloadedState: {
        auth: loadAuthFromStorage()
    }
});


export type RootState = ReturnType<typeof store.getState>;
