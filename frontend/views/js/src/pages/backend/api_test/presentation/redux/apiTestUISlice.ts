import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel.ts";
import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO";


interface TreeViewState {
    selectedApiTest: {
        viewModel: ApiTestViewModel | null,
        dto: Partial<ApiTestDTO> | null
    };
    expandedApiTests: string[];
    menuAction: "rename" | "remove" | null
}

const initialState: TreeViewState = {
    selectedApiTest: {
        viewModel: null,
        dto: null
    },
    expandedApiTests: [],
    menuAction: null,
}


export const apiTestUISlice = createSlice({
    name: "api-test-ui",
    initialState,
    reducers: {
        toggleSelectedApiTest: (state, action: PayloadAction<ApiTestViewModel>) => {
            if (state.selectedApiTest.viewModel?.UUID === action.payload.UUID) {
                state.selectedApiTest.viewModel = null;
                state.selectedApiTest.dto = null;
            } else {
                state.selectedApiTest.viewModel = action.payload;
                state.selectedApiTest.dto = action.payload.apiDTO;
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
            state.selectedApiTest.viewModel = null;
            state.selectedApiTest.dto = null;
        },
        setRenameApiTest: (state, action: PayloadAction<string | null>) => {
            if(state.selectedApiTest.dto) {
                state.selectedApiTest.dto.testName = action.payload ?? "";

                if(!action.payload) {
                    state.menuAction = null;
                }
            }
        },
        triggerMenuAction: (
            state,
            action: PayloadAction<{
                action: "rename" | "remove";
                viewModel: ApiTestViewModel | null;
                dto: Partial<ApiTestDTO> | null;
            }>
        ) => {
            state.menuAction = action.payload.action;
            const apiTestDTO = action.payload.dto;

            state.selectedApiTest.dto = {
                ...apiTestDTO,
                UUID: apiTestDTO?.UUID
            };

            if (action.payload.action === "rename" && action.payload.dto && state.selectedApiTest.dto) {
                state.selectedApiTest.dto.UUID = action.payload.dto.UUID;
            } else {
                state.selectedApiTest.dto = null;
            }
        },
        setSelectedApiTest: (state, action: PayloadAction<ApiTestViewModel>) => {
            const apiTestViewModel = action.payload;
            state.selectedApiTest.viewModel = apiTestViewModel;
            state.selectedApiTest.dto = apiTestViewModel.apiDTO;
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
