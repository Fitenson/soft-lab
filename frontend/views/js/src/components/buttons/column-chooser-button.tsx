import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { flexRender } from '@tanstack/react-table';
import type { HeaderContext, Table } from '@tanstack/react-table';
import { HiMiniAdjustmentsVertical } from 'react-icons/hi2';


interface ColumnChooserButtonProps<TData> {
    table: Table<TData>
}


function ColumnChooserButton <TData> ({ table }: ColumnChooserButtonProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="cursor-pointer">
                    <HiMiniAdjustmentsVertical size={32} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl shadow-lg">
                {table.getAllLeafColumns().map((column) => (
                    <DropdownMenuCheckboxItem
                        className="bg-background dark:bg-background"
                        key={column.id}
                        checked={column.getIsVisible()}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                        {flexRender(column.columnDef.header, { column, table } as HeaderContext<TData, unknown>)}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


export default ColumnChooserButton;
