import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import AuthViewModel from "@/pages/auth/presentation/view_models/AuthViewModel";
import type { AuthDTO } from "../../data/dto/AuthDTO";


interface AuthState {
    auth: AuthViewModel | null
}

const initialState: AuthState = {
    auth: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthViewModel>) {
            state.auth = action.payload ?? null;
            
            if(typeof window !== "undefined") {
                localStorage.setItem("auth", JSON.stringify(action.payload.asJson()));
            }
        },
        removeAuth(state) {
            state.auth = null;
            
            if(typeof window !== "undefined") {
                localStorage.removeItem("auth");
            }
        },
        refreshAuth(state) {
            if(typeof window === "undefined") {
                state.auth = null;
            }

            const authString = localStorage.getItem("auth");
        
            if (authString) {
                try {
                    const authDTO: AuthDTO = JSON.parse(authString);
                    state.auth = new AuthViewModel(authDTO);
                } catch (error) {
                    console.error("Failed to parse auth from localStorage", error);
                    state.auth = null;
                    localStorage.removeItem("auth");
                }
            } else {
                state.auth = null;
            }
        }
    }
});


export const { setAuth, removeAuth, refreshAuth } = authSlice.actions;
export default authSlice.reducer;
