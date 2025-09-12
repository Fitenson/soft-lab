import type { Params } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";


export interface DepartmentDataTableState {
    columnVisibility: VisibilityState;
    rowSelection: RowSelectionState;
    sorting: SortingState;
    params: Params
}


const initialState: DepartmentDataTableState = {
    columnVisibility: {},
    rowSelection: {},
    sorting: [],
    params: {
        order: "desc",
        sort: "createdAtFormat",
        offset: "0",
        limit: "20",
    },
}


const departmentDataTableState = createSlice({
    name: "department-data-table",
    initialState,
    reducers: {
        setColumnVisibility: (state, action: PayloadAction<VisibilityState>) => {
            state.columnVisibility = action.payload;
        },
        setRowSelection: (state, action: PayloadAction<RowSelectionState>) => {
            state.rowSelection = action.payload;
        },
        setSorting: (state, action: PayloadAction<SortingState>) => {
            state.sorting = action.payload;
        },
        setParams: (state, action: PayloadAction<DepartmentDataTableState["params"]>) => {
            state.params = {...state.params, ...action.payload};
        },
        resetTable: () => initialState,
    }
});


export const {
    setColumnVisibility,
    setRowSelection,
    setSorting,
    setParams,
    resetTable,
} = departmentDataTableState.actions;

export default departmentDataTableState.reducer;
