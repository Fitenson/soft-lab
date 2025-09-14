import {
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import type {
    ColumnDef,
    ColumnSizingInfoState,
    ColumnSizingState,
    Row,
} from "@tanstack/react-table";
import { router } from "@inertiajs/react";
import TopActionBar from "@/components/app/top-action-bar";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import type { RootState } from "@/core/presentation/store";
import { setColumnVisibility, setRowSelection, setSorting } from "@/pages/user/presentation/redux/userDataTableSlice.ts";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import useUserService from "@/pages/user/domain/service/useUserService";
import UserViewModel from "@/pages/user/presentation/view-models/UserViewModel"
// import useShowToast from "@/hooks/use-show-toast";
import DataTable from "@/components/app/data-table.tsx";
import { useState } from "react";


interface DataTableProps<TData extends UserViewModel> {
    columns: ColumnDef<TData>[]
    data: TData[]
    onRefresh?: () => void;
}


export default function UserDataTable<TData extends UserViewModel>({
        columns,
        data,
        onRefresh
    }: DataTableProps<TData>) {
    const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
    const [columnSizingInfo, setColumnSizingInfo] = useState<ColumnSizingInfoState>({
        startOffset: null,
        startSize: null,
        deltaOffset: null,
        deltaPercentage: null,
        isResizingColumn: false,
        columnSizingStart: []
    });

    const dispatch = useDispatch();
    const isLoading = useAppSelector(state => state.loading);
    const { rowSelection, sorting, columnVisibility } = useAppSelector(
        (state: RootState) => state.userDataTable
    );
    // const showToast = useShowToast();

    // const queryClient = useQueryClient();
    // const { params } = useAppSelector(state => state.userDataTable);
    // const { removeUser } = useUserService();

    // const mutation = useMutation({
    //     mutationFn: (selectedRows: UserViewModel[]) => removeUser(selectedRows),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["/user/index", params]});
    //     },
    //     onError: (error) => {
    //         console.log(error);
    //         showToast("Error", "Failed to delete user", "error");
    //     }
    // });


    const table = useReactTable({
        data,
        columns,
        columnResizeMode: "onChange",
        enableRowSelection: true,
        enableMultiRowSelection: true,
        enableColumnFilters: true,
        onColumnSizingChange: setColumnSizing,
        onColumnSizingInfoChange: setColumnSizingInfo,
        onRowSelectionChange: (updater) => {
            const newValue = typeof updater === "function" ? updater(rowSelection) : updater;
            dispatch(setRowSelection(newValue));
        },
        onSortingChange: (updater) => {
            const newValue = typeof updater === "function" ? updater(sorting) : updater;
            dispatch(setSorting(newValue));
        },
        onColumnVisibilityChange: (updater) => {
            const newValue = typeof updater === "function" ? updater(columnVisibility) : updater;
            dispatch(setColumnVisibility(newValue));
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            rowSelection,
            sorting,
            columnVisibility,
            columnSizing,
            columnSizingInfo,
        }
    });


    const onSelectRow = (row: Row<TData>) => {
        const user = new UserViewModel(row.original as UserViewModel);

        router.visit(`/user/view?id=${user.UUID}`);
    };


    // const handleRemove = () => {
    //     const selectedRows = table.getSelectedRowModel() .rows.map(row => new UserViewModel(row.original as UserViewModel));
    //     mutation.mutate(selectedRows);
    // }


    return (
        <main className="w-full">
            <div className="overflow-hidden rounded-md border">
                <div className="w-full">
                    <TopActionBar
                        createAction={{ to: "/user/create" }}
                        deleteAction={{ action: () => "deleteUser" }}
                        refreshAction={{ action: onRefresh }}
                        table={table}
                    />
                </div>
                <DataTable
                    table={table}
                    isLoading={isLoading.global}
                    onSelectRow={onSelectRow}
                />
            </div>
        </main>
    );
}
