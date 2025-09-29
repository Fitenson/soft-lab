import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";


const loadingState = createSlice({
    name: "loading",
    initialState: { global: false },
    reducers: {
        setIsLoading(state, action) {
            state.global = action.payload;
        }
    }
});

export const { setIsLoading } = loadingState.actions;
export default loadingState.reducer;
export const selectLoading = (state: RootState) => state.loading.global;
