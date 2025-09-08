import { configureStore } from "@reduxjs/toolkit";

import loadingReducer from "@/core/presentation/store/loadingSlice";
import Auth from "@/pages/auth/domain/entity/Auth";
import authReducer from "@/pages/auth/presentation/redux/authSlice";
// import userDataTableReducer from "@/pages/user/presentation/redux/userDataTableSlice";
// import userReducer from "@/pages/user/presentation/redux/userSlice";


function loadAuthFromStorage() {
    const stored = localStorage.getItem("auth");
    if(stored) {
        return { auth: new Auth(JSON.parse(stored))};
    }
    return { auth: null };
}


export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        auth: authReducer
        // userDataTable: userDataTableReducer,
        // user: userReducer
    },
    preloadedState: {
        auth: loadAuthFromStorage()
    }
});


export type RootState = ReturnType<typeof store.getState>;
