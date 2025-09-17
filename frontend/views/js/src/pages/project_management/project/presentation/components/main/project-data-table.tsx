import {
    type ColumnFiltersState,
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
import TopActionBar from "@/components/app/top-action-bar.tsx";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/core/presentation/store/useAppSelector.ts";
import type { RootState } from "@/core/presentation/store";
import {
    setColumnVisibility,
    setParams,
    setRowSelection,
    setSorting
} from "@/pages/organization/user/presentation/redux/userDataTableSlice.ts";
import ProjectViewModel from "@/pages/project_management/project/presentation/view_models/ProjectViewModel"
import useShowToast from "@/hooks/use-show-toast.ts";
import DataTable from "@/components/app/data-table.tsx";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useProjectService from "@/pages/project_management/project/domain/service/useProjectService";
import useDebounce from "@/hooks/use-debounce";


interface DataTableProps<TData extends ProjectViewModel> {
    columns: ColumnDef<TData>[]
    data: TData[]
    onRefresh?: () => void;
}


export default function ProjectDataTable<TData extends ProjectViewModel>({
    columns,
    data,
    onRefresh
}: DataTableProps<TData>) {
    const [filterParams, setFilterParams] = useState<Record<string, unknown>>({});
    const debouncedFilterParams = useDebounce(filterParams, 100);

    const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnSizingInfo, setColumnSizingInfo] = useState<ColumnSizingInfoState>({
        startOffset: null,
        startSize: null,
        deltaOffset: null,
        deltaPercentage: null,
        isResizingColumn: false,
        columnSizingStart: []
    });

    const dispatch = useDispatch();
    const isLoading = useAppSelector(state => state.loading.global);
    const { rowSelection, sorting, columnVisibility } = useAppSelector(
        (state: RootState) => state.userDataTable
    );
    const showToast = useShowToast();

    const queryClient = useQueryClient();
    const { params } = useAppSelector(state => state.userDataTable);
    const { removeProject } = useProjectService();

    const mutation = useMutation({
        mutationFn: (selectedRows: ProjectViewModel[]) => {
            const UUIDs = selectedRows.map((row) => row.UUID);
            return  removeProject(UUIDs);
        },
        onSuccess: () => {
            showToast("Success", "Successfully remove the project", "success");
            queryClient.invalidateQueries({ queryKey: ["/organization/project/index", params]});
        },
        onError: () => {
            showToast("Error", "Failed to delete project", "error");
        }
    });


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

            if(newValue.length > 0) {
                dispatch(setParams({
                    ...params,
                    sort: newValue[0].id,
                    order: newValue[0].desc ? "desc" : "asc",
                }))
            }
        },
        onColumnVisibilityChange: (updater) => {
            const newValue = typeof updater === "function" ? updater(columnVisibility) : updater;
            dispatch(setColumnVisibility(newValue));
        },
        onColumnFiltersChange: (updater) => {
            const newValue = typeof updater === "function" ? updater(columnFilters) : updater;
            setColumnFilters(newValue);

            const newFilterParams = Object.fromEntries(
                newValue.map((filter) => [
                filter.id,
                typeof filter.value === "object" ? JSON.stringify(filter.value) : String(filter.value ?? "")
            ]));
            setFilterParams(newFilterParams);
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
            columnFilters
        }
    });


    useEffect(() => {
        dispatch(setParams({
            ...params,
            filter: JSON.stringify(debouncedFilterParams)
        }));
    }, [debouncedFilterParams, dispatch]);


    const onSelectRow = (row: Row<TData>) => {
        const project = new ProjectViewModel(row.original as ProjectViewModel);

        router.visit(`/project_management/project/view?id=${project.UUID}`);
    };


    const handleRemoveProject = () => {
        const selectedRows = table.getSelectedRowModel() .rows.map(row => new ProjectViewModel(row.original as ProjectViewModel));
        mutation.mutate(selectedRows);
    }


    return (
        <main className="w-full">
            <div className="overflow-hidden rounded-md border">
                <div className="w-full">
                    <TopActionBar
                        isLoading={isLoading}
                        createAction={{ to: "/project_management/project/create" }}
                        deleteAction={{ action: handleRemoveProject }}
                        refreshAction={{ action: onRefresh }}
                        table={table}
                    />
                </div>
                <DataTable
                    table={table}
                    isLoading={isLoading}
                    onSelectRow={onSelectRow}
                />
            </div>
        </main>
    );
}
