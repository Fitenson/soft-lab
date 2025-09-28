import type { RootState } from "@/core/presentation/store";


export const selectApiTests = (state: RootState) => state.apiTest.data.dataTableApiTest;
export const selectSelectedApiTest = (state: RootState) => state.apiTest.ui.selectedApiTest.viewModel;
export const selectSelectedApiTestEntity = (state: RootState) => state.apiTest.ui.selectedApiTest.entity;
export const selectTestName = (state: RootState) => state.apiTest.ui.selectedApiTest.entity?.testName;
export const selectExpandedApiTests = (state: RootState) => state.apiTest.ui.expandedApiTests;
export const selectMenuAction = (state: RootState) => state.apiTest.ui.menuAction;
