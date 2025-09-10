import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Auth from "@/pages/auth/domain/entity/AuthEntity";


interface AuthState {
    auth: Auth | null
}

const initialState: AuthState = {
    auth: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<Auth>) {
            state.auth = action.payload ?? null;
            localStorage.setItem("auth", JSON.stringify(action.payload.asJson()));
        },
        removeAuth(state) {
            state.auth = null;
            localStorage.removeItem("auth");
        },
        refreshAuth(state) {
            const auth = localStorage.getItem("auth");
            if(auth) {
                state.auth = Auth.fromJson(auth);
            }
        }
    }
});


export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
