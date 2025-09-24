import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthDTO } from "../../data/dto/AuthDTO";


export interface AuthState {
    auth: AuthDTO | null
}

const initialState: AuthState = {
    auth: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthDTO>) {
            state.auth = action.payload ?? null;
        },
        removeAuth(state) {
            state.auth = null;
        },
        refreshAuth() {
            // if(typeof window === "undefined") {
            //     state.auth = null;
            // }

            // const authString = localStorage.getItem("auth");
        
            // if (authString) {
            //     try {
            //         const authDTO: AuthDTO = JSON.parse(authString);
            //         state.auth = new AuthViewModel(authDTO);
            //     } catch (error) {
            //         console.error("Failed to parse auth from localStorage", error);
            //         state.auth = null;
            //         localStorage.removeItem("auth");
            //     }
            // } else {
            //     state.auth = null;
            // }
        }
    }
});


export const { setAuth, removeAuth, refreshAuth } = authSlice.actions;
export default authSlice.reducer;
