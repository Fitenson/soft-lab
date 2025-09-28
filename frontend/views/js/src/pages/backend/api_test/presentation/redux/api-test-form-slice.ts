import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel.ts";
import type {DataTableType} from "@/types";

interface TreeViewState {
    dataTableApiTest: DataTableType<ApiTestViewModel>;
    selectedApiTest: ApiTestViewModel | null;
    expandedApiTests: string[];
}

const initialState: TreeViewState = {
    dataTableApiTest: {
        total: "0",
        rows: []
    },
    selectedApiTest: null,
    expandedApiTests: [],
}


export const apiTestFormSlice = createSlice({
    name: "api-test-form",
    initialState,
    reducers: {
        loadApiTests: (state, action: PayloadAction<DataTableType<ApiTestViewModel>>)=> {
            state.dataTableApiTest = action.payload;
        },
        toggleSelectedApiTest: (state, action: PayloadAction<ApiTestViewModel>) => {
            if (state.selectedApiTest?.UUID === action.payload.UUID) {
                state.selectedApiTest = null;
            } else {
                state.selectedApiTest = action.payload;
            }
        },
        toggleExpandedApiTests: (state, action: PayloadAction<string>) => {
            const UUID = action.payload;
            if (state.expandedApiTests.includes(UUID)) {
                state.expandedApiTests = state.expandedApiTests.filter((id) => id !== UUID);
            } else {
                state.expandedApiTests.push(UUID);
            }
        },
        addApiTest: (state, action: PayloadAction<ApiTestViewModel>) => {
            state.dataTableApiTest.rows.push(action.payload);
        },
        clearSelectedNode: (state) => {
            state.selectedApiTest = null;
        }
    }
});


export const {
    loadApiTests,
    toggleSelectedApiTest,
    toggleExpandedApiTests,
    addApiTest,
    clearSelectedNode,
} = apiTestFormSlice.actions;

export default apiTestFormSlice.reducer;
