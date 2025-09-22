import type ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";


interface ClientDatabaseState {
    clientDatabaseViewModel: ClientDatabaseViewModel | null;
}

const initialState: ClientDatabaseState = {
    clientDatabaseViewModel: null,
}


const clientDatabaseSlice = createSlice({
    name: "client-database",
    initialState,
    reducers: {
        setClientDatabaseViewModel: (state, action: PayloadAction<ClientDatabaseViewModel>) => {
            state.clientDatabaseViewModel = action.payload as ClientDatabaseViewModel;
        },
        logoutClientDatabase: (state) => {
            state.clientDatabaseViewModel = null;
        }
    }
});

export const { setClientDatabaseViewModel, logoutClientDatabase } = clientDatabaseSlice.actions;
export default clientDatabaseSlice.reducer;
