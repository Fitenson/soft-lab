import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ClientDatabaseDTO } from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO";


interface ClientDatabaseState {
    clientDatabase: Partial<ClientDatabaseDTO> | null;
    clientDatabases: ClientDatabaseDTO[];
}

const initialState: ClientDatabaseState = {
    clientDatabase: null,
    clientDatabases: []
}


const clientDatabaseSlice = createSlice({
    name: "client-database",
    initialState,
    reducers: {
        listClientDatabase: (state, action: PayloadAction<ClientDatabaseDTO[]>) => {
            state.clientDatabases = action.payload;
        },
        addClientDatabase: (state, action: PayloadAction<ClientDatabaseDTO>) => {
            state.clientDatabases.push(action.payload as ClientDatabaseDTO);
        },
        removeClientDatabase: (state, action: PayloadAction<string>) => {
            state.clientDatabases = state.clientDatabases.filter(
                (client) => client.UUID !== action.payload
            );
        },
        setClientDatabase: (state, action: PayloadAction<ClientDatabaseDTO>) => {
            state.clientDatabase = action.payload as ClientDatabaseDTO;
        },
        connectClientDatabase: (state, action: PayloadAction<ClientDatabaseDTO>) => {
            state.clientDatabase = action.payload as ClientDatabaseDTO;
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
