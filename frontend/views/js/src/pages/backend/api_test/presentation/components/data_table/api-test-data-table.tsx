import {
    flexRender,
    getCoreRowModel,
    type Table as TableType,
    useReactTable
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import type ApiTestDataViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestDataViewModel.ts";
import { apiTestDataColumns } from "@/pages/backend/api_test/presentation/components/data_table/apiTestDataColumns.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useAppSelector } from "@/core/presentation/store/useAppSelector.ts";
import { selectLoading } from "@/core/presentation/store/loadingSlice.ts";
import { Input } from "@/components/ui/input.tsx";
import ApiTestDataFormField from "@/pages/backend/api_test/presentation/form/ApiTestDataFormField.ts";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem } from "@/components/ui/form.tsx";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import {Fragment, useEffect, useRef, useState} from "react";
import type { ApiTestFormModel } from "@/pages/backend/api_test/presentation/schema/apiTestSchema.ts";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select.tsx";
import {DataFieldType} from "@/pages/backend/api_test/presentation/types";
import TableSelectionPopover from "@/pages/backend/api_test/presentation/components/table-selection-popover.tsx";
import {Button} from "@/components/ui/button.tsx";


const dataKeys = ["key", "value", "description"] as const;
type DataRowKey = typeof dataKeys[number];
const isDataRowKey = (k: string): k is DataRowKey =>
    (dataKeys as readonly string[]).includes(k);
type RowPath = `apiTestData.${number}.${DataRowKey}`;


export default function ApiTestDataTable({ form }: { form: UseFormReturn<ApiTestFormModel> }) {
    const [openTablePopover, setOpenTablePopover] = useState<number | null>(null);

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "apiTestData",
    });

    const table: TableType<ApiTestDataViewModel> = useReactTable({
        data: structuredClone(fields) as unknown as ApiTestDataViewModel[],
        columns: apiTestDataColumns,
        enableRowSelection: true,
        enableSorting: false,
        enableFilters: false,
        enableSortingRemoval: false,
        getCoreRowModel: getCoreRowModel(),
    });

    const isLoading = useAppSelector(selectLoading);

    const lastAppendFromIndexRef = useRef<number | null>(null);
    const addEmptyRow = (fromIndex?: number) => {
        if (typeof fromIndex === "number") {
            if (lastAppendFromIndexRef.current === fromIndex) return;
            lastAppendFromIndexRef.current = fromIndex;
        }

        const fieldType = new DataFieldType();
        fieldType.setField("text");

        append({ isNew: 1, enabled: 0, key: "", value: "", description: "", fieldType: fieldType.asJSONString() }, { shouldFocus: false });
    };

    const handleEnabledToggle = (rowIndex: number, next: number) => {
        form.setValue(`apiTestData.${rowIndex}.enabled`, next);
        if (rowIndex === fields.length - 1 && next === 1) {
            addEmptyRow(rowIndex);
        }
    };


    const handleInputFocus = (rowIndex: number) => {
        const enabled = form.getValues(`apiTestData.${rowIndex}.enabled`);
        if (enabled !== 1) {
            form.setValue(`apiTestData.${rowIndex}.enabled`, 1);
        }

        if (rowIndex === fields.length - 1) {
            addEmptyRow(rowIndex);
        }
    };


    const handleRemoveRow = (rowIndex: number) => {
        form.setValue(`apiTestData.${rowIndex}.isDelete`, 1);
        remove(rowIndex);
    }


    useEffect(() => {
        if (fields.length === 0) {
            const fieldType = new DataFieldType();
            fieldType.setField("text");

            append({ isNew: 1, enabled: 0, key: "", value: "", description: "", fieldType: fieldType.asJSONString() }, { shouldFocus: false });
            lastAppendFromIndexRef.current = null;
        }
    }, [fields.length, append]);


    return (
        <div className="h-full overflow-y-auto">
            <Table className="card">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="border-b border-accent dark:border-accent">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        className="m-0 p-0 border-r border-accent dark:border-accent last:border-r-0"
                                        key={header.id}
                                        style={{  width: header.getSize() }}
                                    >
                                        {header.isPlaceholder ? null :
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}

                                        {header.column.getCanResize() && (
                                            <div
                                                onMouseDown={header.getResizeHandler()}
                                                onTouchStart={header.getResizeHandler()}
                                                className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none
                                            ${header.column.getIsResizing() ? "bg-blue-500" : "bg-transparent hover:bg-gray-400"}`}
                                            />
                                        )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        // 🔹 Loading state
                        Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={`skeleton-${i}`}>
                                {table.getAllLeafColumns().map((column) => (
                                    <td key={column.id} className="px-2 py-2">
                                        <Skeleton className="h-4 w-full rounded-2xl p-4 m-1 gap-2" />
                                    </td>
                                ))}
                            </TableRow>
                        ))
                    ) : fields.length > 0 ? (
                        fields.map((field, rowIndex) => (
                            <TableRow
                                key={field.id}
                                className="cursor-pointer p-2 border border-accent dark:border-accent text-foreground dark:text-foreground"
                            >
                                {table.getAllLeafColumns().map((column) => (
                                    <TableCell key={column.id} className="p-2">
                                        {column.id === ApiTestDataFormField.enabled.name ? (
                                            <FormField
                                                control={form.control}
                                                name={`apiTestData.${rowIndex}.enabled` as `apiTestData.${number}.enabled`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div
                                                                onClick={(e ) => e.stopPropagation()}
                                                                className="flex items-center"
                                                            >
                                                                <Checkbox
                                                                    checked={field.value === 1}
                                                                    onCheckedChange={(v) => {
                                                                        const next = v ? 1 : 0;
                                                                        field.onChange(next);
                                                                        handleEnabledToggle(rowIndex, next);
                                                                    }}
                                                                    aria-label="Toggle"
                                                                    className="cursor-pointer h-6 w-6 shrink-0 translate-y-[1px]"
                                                                />
                                                            </div>
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        ) : (
                                            isDataRowKey(column.id) && (
                                                <div className="flex flex-row gap-1">
                                                    <FormField
                                                        control={form.control}
                                                        name={`apiTestData.${rowIndex}.${column.id}` as RowPath}
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            value={field.value ?? ""}
                                                                            onChange={(e) => field.onChange(e.target.value)}
                                                                            onFocus={() => handleInputFocus(rowIndex)}
                                                                            className="w-full h-8"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )
                                                        }}
                                                    />

                                                    <FormField
                                                        name={`apiTestData.${rowIndex}.${ApiTestDataFormField.fieldType.name}`}
                                                        control={form.control}
                                                        render={({ field }) => {
                                                            const currentType = (() => {
                                                                try {
                                                                    if (!field.value) return "text";
                                                                    const parsed =
                                                                        typeof field.value === "string"
                                                                            ? JSON.parse(field.value)
                                                                            : field.value;

                                                                    // Extract the first key (e.g. "dropdown", "text", "file")
                                                                    const type = parsed ? Object.keys(parsed)[0] : "text";
                                                                    return type || "text";
                                                                } catch {
                                                                    return "text";
                                                                }
                                                            })();

                                                            return (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        {column.id === ApiTestDataFormField.value.name && (
                                                                            <Fragment>
                                                                                <Select
                                                                                    value={currentType}
                                                                                    onValueChange={(value) => {
                                                                                        const fieldType = new DataFieldType();
                                                                                        fieldType.setField(value as "text" | "file" | "dropdown");

                                                                                        field.onChange(fieldType.asJSONString());

                                                                                        if (value === "dropdown") {
                                                                                            setTimeout(() => setOpenTablePopover(rowIndex), 300);
                                                                                        } else {
                                                                                            setTimeout(() => setOpenTablePopover(null), 300);
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <SelectTrigger className="h-6 w-6 flex items-center justify-center rounded-md border text-xs p-1" />
                                                                                    <SelectContent>
                                                                                        <SelectItem value="text">Text</SelectItem>
                                                                                        <SelectItem value="dropdown">Dropdown</SelectItem>
                                                                                        <SelectItem value="file">File</SelectItem>
                                                                                    </SelectContent>
                                                                                </Select>

                                                                                <TableSelectionPopover
                                                                                    rowIndex={rowIndex}
                                                                                    isOpen={openTablePopover === rowIndex}
                                                                                    setIsOpen={(isOpen: boolean) =>
                                                                                        setOpenTablePopover(isOpen ? rowIndex : null)
                                                                                    }
                                                                                />
                                                                            </Fragment>
                                                                        )}
                                                                    </FormControl>
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </TableCell>
                                ))}

                                <TableCell className="text-center w-4">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleRemoveRow(rowIndex)}
                                        className="h-8 w-8 p-2 rounded-full"
                                    >
                                        ✕
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        // 🔹 Empty state
                        <TableRow>
                            <TableCell
                                colSpan={table.getAllLeafColumns().length}
                                className="h-24 text-center text-muted-foreground"
                            >
                                No test data rows found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
