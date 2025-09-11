import { configureStore } from "@reduxjs/toolkit";

import loadingReducer from "@/core/presentation/store/loadingSlice";
import AuthViewModel from "@/pages/auth/presentation/view_models/AuthViewModel";
import authReducer from "@/pages/auth/presentation/redux/authSlice";
import sidebarReducer from "@/core/presentation/store/sidebarSlice";
import userDataTableReducer from "@/pages/user/presentation/redux/userDataTableSlice";
import type { AuthDTO } from "@/pages/auth/data/dto/AuthDTO";
// import userReducer from "@/pages/user/presentation/redux/userSlice";


function loadAuthFromStorage() {
    const jsonString = localStorage.getItem("auth");
    const authDTO: AuthDTO = JSON.parse(jsonString ?? "");

    if(authDTO) {
        const authViewModel = new AuthViewModel(authDTO);
        return { authViewModel: authViewModel };
    }
    return { authViewModel: null };
}


export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        auth: authReducer,
        sidebar: sidebarReducer,
        userDataTable: userDataTableReducer,
        // user: userReducer
    },
    preloadedState: {
        auth: loadAuthFromStorage()
    }
});


export type RootState = ReturnType<typeof store.getState>;
