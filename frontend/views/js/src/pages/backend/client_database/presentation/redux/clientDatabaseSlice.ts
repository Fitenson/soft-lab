import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel.ts";


interface ClientDatabaseState {
    clientDatabase: ClientDatabaseViewModel | null;
    clientDatabases: ClientDatabaseViewModel[];
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
        addClientDatabase: (state, action: PayloadAction<ClientDatabaseViewModel>) => {
            state.clientDatabases.push(action.payload as ClientDatabaseViewModel);
        },
        removeClientDatabase: (state, action: PayloadAction<string>) => {
            state.clientDatabases = state.clientDatabases.filter(
                (client) => client.UUID !== action.payload
            );
        },
        setClientDatabase: (state, action: PayloadAction<ClientDatabaseViewModel>) => {
            const clientDatabaseViewModel = action.payload as ClientDatabaseViewModel;
            state.clientDatabase = new ClientDatabaseViewModel({
                ...clientDatabaseViewModel.dto,
                refreshToken: clientDatabaseViewModel.dto.password
            });
        },
        connectClientDatabase: (state, action: PayloadAction<ClientDatabaseViewModel>) => {
            state.clientDatabase = action.payload as ClientDatabaseViewModel;
        },
        logoutClientDatabase: (state) => {
            state.clientDatabase = null;
        }
    }
});

export const {
    listClientDatabase,
    addClientDatabase,
    setClientDatabase,
    connectClientDatabase,
    logoutClientDatabase,
    removeClientDatabase,
} = clientDatabaseSlice.actions;
export default clientDatabaseSlice.reducer;
