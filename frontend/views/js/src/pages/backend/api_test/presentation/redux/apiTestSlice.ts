import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel.ts";
import type { DataTableType } from "@/types";


interface TreeViewState {
    dataTableApiTest: DataTableType<ApiTestViewModel>;
}

const initialState: TreeViewState = {
    dataTableApiTest: {
        total: "0",
        rows: []
    }
}


export const apiTestSlice = createSlice({
    name: "api-test",
    initialState,
    reducers: {
        loadApiTests: (state, action: PayloadAction<DataTableType<ApiTestViewModel>>)=> {
            state.dataTableApiTest = action.payload;
        },
        addApiTest: (state, action: PayloadAction<ApiTestViewModel>) => {
            state.dataTableApiTest.rows.push(action.payload);
        },
        updateApiTests: (state, action: PayloadAction<ApiTestViewModel>) => {
            const index = state.dataTableApiTest.rows.findIndex(
                (r) => r.UUID === action.payload.UUID
            );
        
            if (index !== -1) {
                state.dataTableApiTest.rows[index] = action.payload;
            } else {
                state.dataTableApiTest.rows.push(action.payload);
            }
        },
        renameApiTest: (
            state,
            action: PayloadAction<{ UUID: string; newName: string }>
        ) => {
            const { UUID, newName } = action.payload;
            const row = state.dataTableApiTest.rows.find((r) => r.UUID === UUID);
            if (row) {
                row.testName = newName;
            }
        },
    }
});


export const {
    loadApiTests,
    addApiTest,
    renameApiTest,
    updateApiTests,
} = apiTestSlice.actions;

export default apiTestSlice.reducer;
