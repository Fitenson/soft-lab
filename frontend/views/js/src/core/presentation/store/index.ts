import { configureStore } from "@reduxjs/toolkit";

import loadingReducer from "@/core/presentation/store/loadingSlice";
// import userDataTableReducer from "@/pages/user/presentation/redux/userDataTableSlice";
// import userReducer from "@/pages/user/presentation/redux/userSlice";

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        // userDataTable: userDataTableReducer,
        // user: userReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
