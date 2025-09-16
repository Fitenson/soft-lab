import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";


export interface UserDataTableState {
    columnVisibility: VisibilityState;
    rowSelection: RowSelectionState;
    sorting: SortingState;
    params: {
        order: "asc" | "desc",
        sort: string,
        offset: string,
        limit: string
    };
}


const initialState: UserDataTableState = {
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


const userDataTableState = createSlice({
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
        setParams: (state, action: PayloadAction<UserDataTableState["params"]>) => {
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
} = userDataTableState.actions;

export default userDataTableState.reducer;
