import type { Table } from "@tanstack/react-table";
import SaveButton from "@/components/buttons/save-button";
import DeleteButton from "@/components/buttons/delete-button";
import BrowseButton from "@/components/buttons/browse-button";
import CreateButton from "@/components/buttons/create-button";
import ColumnChooserButton from "@/components/buttons/column-chooser-button";
import RefreshButton from "@/components/buttons/refresh-button";


interface ActionButton {
    to?: string;
    action?: () => void;
}


interface TopActionBarProps<TData> {
    isLoading: boolean;
    table?: Table<TData>;
    createAction?: ActionButton;
    saveAction?: boolean;
    browseAction?: ActionButton;
    deleteAction?: ActionButton;
    refreshAction?: ActionButton;
}


export default function TopActionBar <TData> ({
    isLoading,
    table,
    createAction,
    saveAction = false,
    browseAction,
    deleteAction,
    refreshAction,
}: TopActionBarProps<TData>) {
    return(
        <div className="flex items-center bg-background dark:bg-background rounded-md my-2 mx-2 mb-4 shadow-sm gap-2 col-span-full">
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
