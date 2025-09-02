import SaveButton from '@/components/buttons/save-button';
import DeleteButton from '@/components/buttons/delete-button';
import BrowseButton from '@/components/buttons/browse-button';
import CreateButton from '@/components/buttons/create-button';
import { useAppSelector } from '@/core/presentation/store/useAppSelector';
import type { Table } from '@tanstack/react-table';
import ColumnChooserButton from '@/components/buttons/column-chooser-button';
import RefreshButton from '@/components/buttons/refresh-button';
import { cn } from "@/lib/utils";


interface ActionButton {
    to?: string;
    action?: () => void;
}


interface TopActionBarProps<TData> {
    className?: string;
    table?: Table<TData>;
    createAction?: ActionButton;
    saveAction?: ActionButton;
    browseAction?: ActionButton;
    deleteAction?: ActionButton;
    refreshAction?: ActionButton;
}


function GuestTopActionBar <TData> ({
    className
}: TopActionBarProps<TData>) {
    return (
        <div className={cn(
            "flex items-center bg-background dark:bg-background rounded-md my-2 mx-2 mb-4 gap-2 col-span-full",
            className
        )}>
        </div>
    );
}


function DataTableTopActionBar<TData> ({
    className
}: TopActionBarProps<TData>) {
    return (
        <div className={cn(
            "flex items-center bg-background dark:bg-background rounded-md my-2 mx-2 mb-4 gap-2 col-span-full",
            className
        )}>

        </div>
    );
}


function FormTopActionBar <TData> ({
    className,
    table,
    createAction,
    saveAction,
    browseAction,
    deleteAction,
    refreshAction,
}: TopActionBarProps<TData>) {
    const isLoading = useAppSelector(state => state.loading.global);

    return (
        <div className={cn(
            "flex items-center bg-background dark:bg-background rounded-md my-2 mx-2 mb-4 gap-2 col-span-full",
            className
        )}>
            {createAction && createAction.to && <CreateButton to={createAction.to} disabled={isLoading} />}
            {saveAction && <SaveButton disabled={isLoading} />}
            {deleteAction && deleteAction.action && <DeleteButton disabled={isLoading} onDelete={deleteAction.action} />}
            {browseAction && <BrowseButton to={browseAction.to ?? ''} disabled={isLoading} />}

            <div className="flex ml-auto gap-2">
                {refreshAction && refreshAction.action && <RefreshButton onRefresh={refreshAction.action} />}
                {table && <ColumnChooserButton table={table} />}
            </div>
        </div>
    );
}


export { GuestTopActionBar, DataTableTopActionBar, FormTopActionBar }
