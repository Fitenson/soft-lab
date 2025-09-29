import type { RootState } from "@/core/presentation/store";


export const selectApiTests = (state: RootState) => state.apiTest.data.dataTableApiTest;
export const selectSelectedApiTest = (state: RootState) => state.apiTest.ui.selectedApiTest;
export const selectExpandedApiTests = (state: RootState) => state.apiTest.ui.expandedApiTests;
export const selectMenuAction = (state: RootState) => state.apiTest.ui.menuAction;
