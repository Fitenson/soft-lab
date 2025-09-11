import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import AuthViewModel from "@/pages/auth/presentation/view_models/AuthViewModel";
import type { AuthDTO } from "../../data/dto/AuthDTO";


interface AuthState {
    authViewModel: AuthViewModel | null
}

const initialState: AuthState = {
    authViewModel: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<AuthViewModel>) {
            state.authViewModel = action.payload ?? null;
            localStorage.setItem("auth", JSON.stringify(action.payload.asJson()));
        },
        removeAuth(state) {
            state.authViewModel = null;
            localStorage.removeItem("auth");
        },
        refreshAuth(state) {
            const authString = localStorage.getItem("auth");
        
            if (authString) {
                try {
                    const authDTO: AuthDTO = JSON.parse(authString);
                    state.authViewModel = new AuthViewModel(authDTO);
                } catch (error) {
                    console.error("Failed to parse auth from localStorage", error);
                    state.authViewModel = null;
                    localStorage.removeItem("auth");
                }
            } else {
                state.authViewModel = null;
            }
        }
    }
});


export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
