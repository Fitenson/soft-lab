import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel.ts";
import ApiTestEntity from "@/pages/backend/api_test/domain/entity/ApiTestEntity.ts";


interface TreeViewState {
    selectedApiTest: {
        viewModel: ApiTestViewModel | null,
        entity: ApiTestEntity | null
    };
    expandedApiTests: string[];
    menuAction: "rename" | "remove" | null
}

const initialState: TreeViewState = {
    selectedApiTest: {
        viewModel: null,
        entity: null
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
                state.selectedApiTest.entity = null;
            } else {
                state.selectedApiTest.viewModel = action.payload;
                state.selectedApiTest.entity = new ApiTestEntity(action.payload.apiDTO);
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
            state.selectedApiTest.entity = null;
        },
        setRenameApiTest: (state, action: PayloadAction<string | null>) => {
            if(state.selectedApiTest.entity) {
                state.selectedApiTest.entity.testName = action.payload ?? "";
                console.log("Redux", state.selectedApiTest.entity.testName);
            }
        },
        triggerMenuAction: (
            state,
            action: PayloadAction<{
                action: "rename" | "remove";
                viewModel: ApiTestViewModel | null;
                entity: ApiTestEntity | null;
            }>
        ) => {
            state.menuAction = action.payload.action;
            state.selectedApiTest = {
                viewModel: action.payload.viewModel,
                entity: action.payload.entity,
            };

            if (action.payload.action === "rename" && action.payload.entity && state.selectedApiTest.entity) {
                state.selectedApiTest.entity.UUID = action.payload.entity.UUID;
            } else {
                state.selectedApiTest.entity = null;
            }
        }
    }
});


export const {
    toggleSelectedApiTest,
    toggleExpandedApiTests,
    clearSelectedNode,
    setRenameApiTest,
    triggerMenuAction,
} = apiTestUISlice.actions;

export default apiTestUISlice.reducer;
