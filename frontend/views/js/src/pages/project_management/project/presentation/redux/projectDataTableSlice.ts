import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";


export interface ProjectDataTableState {
    columnVisibility: VisibilityState;
    rowSelection: RowSelectionState;
    sorting: SortingState;
    params: {
        order: "asc" | "desc",
        sort: string,
        offset: string,
        limit: string,
        filter: string
    };
}


const initialState: ProjectDataTableState = {
    columnVisibility: {},
    rowSelection: {},
    sorting: [],
    params: {
        order: "desc",
        sort: "createdAtFormat",
        offset: "0",
        limit: "20",
        filter: "{}"
    },
}


const projectDataTableSlice = createSlice({
    name: "project-data-table",
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
        setParams: (state, action: PayloadAction<ProjectDataTableState>) => {
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
} = projectDataTableSlice.actions;

export default projectDataTableSlice.reducer;
