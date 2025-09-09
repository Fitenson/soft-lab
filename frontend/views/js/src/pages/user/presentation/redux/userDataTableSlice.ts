import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";
import type { UserModel } from "@/pages/user/data/models/UserModel";
import type { MainItem } from "@/types";


export interface UserDataTableState {
    columnVisibility: VisibilityState;
    rowSelection: RowSelectionState;
    sorting: SortingState;
    params: {
        per_page: number,
        order: "asc" | "desc",
        sort: string
    };
    data: MainItem<UserModel> | null;
}


const initialState: UserDataTableState = {
    columnVisibility: {},
    rowSelection: {},
    sorting: [],
    params: {
        per_page: 20,
        order: "desc",
        sort: "createdAtFormat"
    },
    data: null,
}


const userDataTableState = createSlice({
    name: "user-data-table",
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
        setIndexData: (state, action: PayloadAction<MainItem<UserModel>>) => {
            state.data = action.payload;
        },
        resetTable: () => initialState,
    }
});


export const {
    setColumnVisibility,
    setRowSelection,
    setSorting,
    setParams,
    setIndexData,
    resetTable,
} = userDataTableState.actions;

export default userDataTableState.reducer;
