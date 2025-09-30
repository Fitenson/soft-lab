import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO";
import type { MenuActionType } from "../types";


interface TreeViewState {
    selectedApiTest: Partial<ApiTestDTO> | null;
    expandedApiTests: string[];
    menuAction: MenuActionType
}

const initialState: TreeViewState = {
    selectedApiTest: null,
    expandedApiTests: [],
    menuAction: null,
}


export const apiTestUISlice = createSlice({
    name: "api-test-ui",
    initialState,
    reducers: {
        toggleSelectedApiTest: (state, action: PayloadAction<Partial<ApiTestDTO>>) => {
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
        clearSelectedNode: (state) => {
            state.selectedApiTest = null;
        },
        setRenameSelectedApiTest: (state, action: PayloadAction<string>) => {
            if (state.selectedApiTest) {
                state.selectedApiTest = {
                    ...state.selectedApiTest,
                    testName: action.payload,
                };
            }
        },
        triggerMenuAction: (state, action) => {
            state.menuAction = action.payload.action;
            const apiTestDTO = action.payload.dto;
        
            if (action.payload.action === "rename" && apiTestDTO) {
                state.selectedApiTest = {
                    ...state.selectedApiTest,
                    ...apiTestDTO,
                };
            }
        },
        setSelectedApiTest: (state, action: PayloadAction<ApiTestDTO>) => {
            state.selectedApiTest = action.payload;
        }
    }
});


export const {
    toggleSelectedApiTest,
    toggleExpandedApiTests,
    clearSelectedNode,
    setRenameSelectedApiTest,
    triggerMenuAction,
    setSelectedApiTest,
} = apiTestUISlice.actions;

export default apiTestUISlice.reducer;
