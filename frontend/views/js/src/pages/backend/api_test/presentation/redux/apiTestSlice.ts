import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DataTableType } from "@/types";
import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO.ts";
import type {ClientDatabaseTableDTO} from "@/pages/backend/client_database/data/dto/ClientDatabaseTableDTO.ts";


interface TreeViewState {
    dataTableApiTest: DataTableType<ApiTestDTO>;
    clientDatabaseTables: DataTableType<ClientDatabaseTableDTO>;
}

const initialState: TreeViewState = {
    dataTableApiTest: {
        total: "0",
        rows: []
    },
    clientDatabaseTables: {
        total: "0",
        rows: []
    }
}


export const apiTestSlice = createSlice({
    name: "api-test",
    initialState,
    reducers: {
        loadApiTests: (state, action: PayloadAction<DataTableType<ApiTestDTO>>)=> {
            state.dataTableApiTest = action.payload;
        },
        addApiTest: (state, action: PayloadAction<Partial<ApiTestDTO>>) => {
            state.dataTableApiTest.rows.push(action.payload as ApiTestDTO);
        },
        updateApiTests: (state, action: PayloadAction<ApiTestDTO>) => {
            state.dataTableApiTest.rows = state.dataTableApiTest.rows
                .filter((r) => r.UUID !== action.payload.UUID)
                .concat(action.payload);
        },
        removeApiTests: (state, action: PayloadAction<string[]>) => {
            const results = state.dataTableApiTest.rows.filter(
                (row) => !action.payload.includes(row.UUID)
            );

            console.log(results);

            state.dataTableApiTest.rows = results;
        },
        loadClientDatabaseTables: (state, action: PayloadAction<DataTableType<ClientDatabaseTableDTO>>) => {
            state.clientDatabaseTables = action.payload;
        }
    }
});


export const {
    loadApiTests,
    addApiTest,
    updateApiTests,
    removeApiTests,
    loadClientDatabaseTables,
} = apiTestSlice.actions;

export default apiTestSlice.reducer;
