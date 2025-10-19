import { Popover, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command.tsx";
import { useAppSelector } from "@/core/presentation/store/useAppSelector.ts";
import { selectLoading } from "@/core/presentation/store/loadingSlice.ts";
import ClientDatabaseTableViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseTableViewModel.ts";
import {Loader2} from "lucide-react";
import {
    selectClientDatabaseTables
} from "@/pages/backend/client_database/presentation/redux/clientDatabaseSelectors.ts";
import {useEffect, useState} from "react";


export default function TableSelectionPopover({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
    const isLoading = useAppSelector(selectLoading);
    const tables = useAppSelector(selectClientDatabaseTables);
    const [clientDatabaseTables, setClientDatabaseTables] = useState<ClientDatabaseTableViewModel[]>();


    useEffect(() => {
        setClientDatabaseTables(tables.rows.map((row) => new ClientDatabaseTableViewModel(row)));
    }, [tables]);


    return (
        <Popover modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button className="hidden" type="button"></button>
            </PopoverTrigger>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Dark background overlay */}
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Centered Popover content */}
                    <div className="relative z-50 w-80 p-4 text-center bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl text-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <Label className="text-gray-300 text-sm">Table</Label>
                            <button
                                className="text-gray-500 hover:text-gray-200"
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <Command>
                            <CommandInput
                                placeholder="Search for a table"
                                className="placeholder-gray-500"
                            />
                            <CommandList>
                                <CommandEmpty>No results found</CommandEmpty>
                                <CommandGroup heading={"Suggestion"}>
                                    {isLoading ? (
                                        <div className="flex justify-center py-6 text-gray-400">
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Loading tables...
                                        </div>
                                    ) : (
                                        <>
                                            {clientDatabaseTables && clientDatabaseTables.length > 0 ? (
                                                <CommandGroup heading="Tables">
                                                    {clientDatabaseTables?.map((table) => (
                                                        <CommandItem
                                                            key={table.table}
                                                            value={table.table}
                                                            onSelect={() => {
                                                                setIsOpen(false);
                                                            }}
                                                        >
                                                            {table.table}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            ) : (
                                                <CommandEmpty>No tables found</CommandEmpty>
                                            )}
                                        </>
                                    )}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                </div>
            )}
        </Popover>
    );
}
