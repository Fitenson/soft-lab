import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel.ts";


interface ClientDatabaseState {
    clientDatabase: ClientDatabaseViewModel | null;
    clientDatabases: ClientDatabaseViewModel[] | [];
}

const initialState: ClientDatabaseState = {
    clientDatabase: null,
    clientDatabases: []
}


const clientDatabaseSlice = createSlice({
    name: "client-database",
    initialState,
    reducers: {
        listClientDatabase: (state, action: PayloadAction<ClientDatabaseViewModel[]>) => {
            state.clientDatabases = action.payload;
        },
        setClientDatabase: (state, action: PayloadAction<ClientDatabaseViewModel>) => {
            state.clientDatabase = action.payload as ClientDatabaseViewModel;
        },
        connectClientDatabase: (state, action: PayloadAction<ClientDatabaseViewModel>) => {
            const clientDatabaseViewModel = action.payload as ClientDatabaseViewModel;
            state.clientDatabase = clientDatabaseViewModel;
        },
        logoutClientDatabase: (state) => {
            state.clientDatabase = null;
        }
    }
});

export const { listClientDatabase, setClientDatabase, connectClientDatabase, logoutClientDatabase } = clientDatabaseSlice.actions;
export default clientDatabaseSlice.reducer;
