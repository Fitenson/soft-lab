import { Popover, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Label } from "@/components/ui/label.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";


export default function TableSelectionPopover({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {


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
                    <div className="relative z-50 w-80 p-4 text-center
                                                                                        bg-neutral-900 border border-neutral-700 rounded-xl
                                                                                        shadow-2xl text-gray-100"
                    >
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
                                    <CommandItem>User</CommandItem>
                                    <CommandItem>Project</CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </div>
                </div>
            )}
        </Popover>
    );
}
