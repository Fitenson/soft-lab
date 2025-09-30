import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DataTableType } from "@/types";
import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO.ts";


interface TreeViewState {
    dataTableApiTest: DataTableType<ApiTestDTO>;
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
        renameApiTest: (
            state,
            action: PayloadAction<{ UUID: string; newName: string }>
        ) => {
            const { UUID, newName } = action.payload;
            if (!UUID) return;

            const index = state.dataTableApiTest.rows.findIndex((r) => r.UUID === UUID);
            if (index !== -1) {
                state.dataTableApiTest.rows[index] = {
                    ...state.dataTableApiTest.rows[index],
                    testName: newName,
                };
            }
        },
        removeApiTests: (state, action: PayloadAction<string[]>) => {
            const results = state.dataTableApiTest.rows.filter(
                (row) => !action.payload.includes(row.UUID)
            );

            console.log(results);

            state.dataTableApiTest.rows = results;
        }
    }
});


export const {
    loadApiTests,
    addApiTest,
    renameApiTest,
    updateApiTests,
    removeApiTests
} = apiTestSlice.actions;

export default apiTestSlice.reducer;
