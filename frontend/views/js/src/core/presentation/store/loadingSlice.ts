import { createSlice } from "@reduxjs/toolkit";


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
