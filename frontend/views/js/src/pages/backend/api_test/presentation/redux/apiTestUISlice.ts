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
        setRenameApiTest: (state, action: PayloadAction<string | null>) => {
            if (action.payload !== null) {
                if (state.selectedApiTest) {
                    state.selectedApiTest = {
                        ...state.selectedApiTest,
                        testName: action.payload,
                    };
                }
            } else {
                state.menuAction = null;
            }
        },
        triggerMenuAction: (
            state,
            action: PayloadAction<{
                action: MenuActionType;
                dto: Partial<ApiTestDTO> | null;
            }>
        ) => {
            state.menuAction = action.payload.action;
            const apiTestDTO = action.payload.dto;

            state.selectedApiTest = {
                ...apiTestDTO,
                UUID: apiTestDTO?.UUID
            };

            if (action.payload.action === "rename" && action.payload.dto && state.selectedApiTest) {
                state.selectedApiTest.UUID = action.payload.dto.UUID;
            } else {
                state.selectedApiTest = null;
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
    setRenameApiTest,
    triggerMenuAction,
    setSelectedApiTest,
} = apiTestUISlice.actions;

export default apiTestUISlice.reducer;
