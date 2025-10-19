import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ClientDatabaseDTO } from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO";
import type {DataTableType} from "@/types";
import type {ClientDatabaseTableDTO} from "@/pages/backend/client_database/data/dto/ClientDatabaseTableDTO.ts";


interface ClientDatabaseState {
    clientDatabase: Partial<ClientDatabaseDTO> | null;
    clientDatabases: ClientDatabaseDTO[];
    clientDatabaseTables: DataTableType<ClientDatabaseTableDTO>;
}

const initialState: ClientDatabaseState = {
    clientDatabase: null,
    clientDatabases: [],
    clientDatabaseTables: {
        total: "0",
        rows: []
    }
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
        },
        loadClientDatabaseTables: (state, action: PayloadAction<DataTableType<ClientDatabaseTableDTO>>) => {
            state.clientDatabaseTables = action.payload;
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
    loadClientDatabaseTables,
} = clientDatabaseSlice.actions;
export default clientDatabaseSlice.reducer;
