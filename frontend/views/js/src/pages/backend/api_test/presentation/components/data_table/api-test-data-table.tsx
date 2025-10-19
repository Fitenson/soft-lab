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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form.tsx";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import {Fragment, useEffect, useRef, useState} from "react";
import type { ApiTestFormModel } from "@/pages/backend/api_test/presentation/schema/apiTestSchema.ts";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select.tsx";
import {DataFieldType} from "@/pages/backend/api_test/presentation/types";
import TableSelectionPopover from "@/pages/backend/api_test/presentation/components/table-selection-popover.tsx";
import useClientDatabaseService from "@/pages/backend/client_database/domain/service/useClientDatabaseService.ts";
import type ClientDatabaseTableViewModel
    from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseTableViewModel.ts";
import type {Params} from "@/types";
import {selectClientDatabase} from "@/pages/backend/client_database/presentation/redux/clientDatabaseSelectors.ts";


const dataKeys = ["key", "value", "description"] as const;
type DataRowKey = typeof dataKeys[number];
const isDataRowKey = (k: string): k is DataRowKey =>
    (dataKeys as readonly string[]).includes(k);
type RowPath = `apiTestData.${number}.${DataRowKey}`;


export default function ApiTestDataTable({ form }: { form: UseFormReturn<ApiTestFormModel> }) {
    const [tables, setTables] = useState<ClientDatabaseTableViewModel[]>();
    const { getTableList } = useClientDatabaseService();
    const selectedClientDatabaseDTO = useAppSelector(selectClientDatabase);

    useEffect(() => {
        const fetchTables = async () => {
            const params: Params = {
                offset: "0",
                limit: "10",
                sort: "table",
                order: "asc",
                filter: ""
            };

            await getTableList({ params: params, clientDatabaseToken: selectedClientDatabaseDTO?.password ?? "" }, {
                callbacks: {
                    onSuccess: (data) => {
                        setTables(data.rows);
                    }
                }
            });
        };

        fetchTables();
    }, []);

    const [openTablePopover, setOpenTablePopover] = useState(false);

    const { fields, append } = useFieldArray({
        control: form.control,
        name: "apiTestData",
    });


    const table: TableType<ApiTestDataViewModel> = useReactTable({
        data: (form.getValues("apiTestData") ?? []) as ApiTestDataViewModel[],
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
        append({ enabled: 0, key: "", value: "", description: "", fieldType: fieldType.asJSONString() }, { shouldFocus: false });
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


    useEffect(() => {
        if (fields.length === 0) {
            append({ enabled: 0, key: "", value: "", description: "" }, { shouldFocus: false });
            lastAppendFromIndexRef.current = null;
        }
    }, [fields.length, append]);


    return (
        <Form {...form}>
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
                        // 🔹 Form-connected rows (useFieldArray)
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
                                                                onClick={(e) => e.stopPropagation()}
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
                                                        render={({ field }) => (
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
                                                        )}
                                                    />

                                                    <FormField
                                                        name={`apiTestData.${rowIndex}.${ApiTestDataFormField.fieldType.name}`}
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    {column.id === ApiTestDataFormField.value.name && (
                                                                        <Fragment>
                                                                            <Select
                                                                                onValueChange={(value) => {
                                                                                    const fieldType = new DataFieldType();
                                                                                    fieldType.setField(value as "text" | "file" | "dropdown");

                                                                                    if (value === "dropdown") {
                                                                                        setTimeout(() => setOpenTablePopover(true), 500);
                                                                                        fieldType.setDropdown("user");
                                                                                    }

                                                                                    field.onChange(fieldType.asJSONString());
                                                                                }}
                                                                            >
                                                                                <SelectTrigger className="h-6 w-6 flex items-center justify-center rounded-md border text-xs p-1" />
                                                                                <SelectContent>
                                                                                    <SelectItem value="text">Text</SelectItem>
                                                                                    <SelectItem value="dropdown">Dropdown</SelectItem>
                                                                                    <SelectItem value="file">File</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>

                                                                            <TableSelectionPopover data={tables ?? []} isOpen={openTablePopover} setIsOpen={setOpenTablePopover}/>
                                                                        </Fragment>
                                                                    )}
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </TableCell>
                                ))}
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
        </Form>
    );
}
