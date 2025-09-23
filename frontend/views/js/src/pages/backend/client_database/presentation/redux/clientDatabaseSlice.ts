import ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";


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
            state.clientDatabase = action.payload as ClientDatabaseViewModel;
        },
        logoutClientDatabase: (state) => {
            state.clientDatabase = null;
        }
    }
});

export const { setClientDatabase, logoutClientDatabase } = clientDatabaseSlice.actions;
export default clientDatabaseSlice.reducer;
