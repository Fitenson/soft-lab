import { Dialog, DialogHeader, DialogContent, DialogClose } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import ClientDatabaseFormField from "@/pages/backend/client_database/presentation/form/ClientDatabaseFormField.ts";
import { Input } from "@/components/ui/input.tsx";
import type {ClientDatabaseDTO} from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO.ts";
import useClientDatabaseForm from "@/pages/backend/client_database/presentation/hooks/useClientDatabaseForm.ts";
import TopActionBar from "@/components/app/top-action-bar";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import { X } from "lucide-react";


type DatabaseDialogProps = {
    clientDatabaseDTO?: ClientDatabaseDTO | undefined;
    open: boolean;
    onOpenChange: (open: boolean) => void
}


export default function DatabaseDialog({ clientDatabaseDTO, open, onOpenChange }: DatabaseDialogProps) {
    const { form } = useClientDatabaseForm({ clientDatabaseDTO: clientDatabaseDTO });
    const isLoading = useAppSelector(state => state.loading.global);


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px]" showCloseButton={false}>
                <div className="w-full">
                    <Form {...form}>
                        <form className="grid grid-cols-2 gap-4">
                            <DialogHeader className="mb-4 col-span-2 flex flex-row items-center justify-between">
                                <TopActionBar
                                    saveAction
                                    isLoading={isLoading}
                                />
                                <DialogClose asChild>
                                    <button type="button" className="cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                        <X className="h-5 w-5" />
                                    </button>
                                </DialogClose>
                            </DialogHeader>

                            <FormField
                                control={form.control}
                                name={ClientDatabaseFormField.databaseName.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{ClientDatabaseFormField.databaseName.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={ClientDatabaseFormField.databaseSchema.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{ClientDatabaseFormField.databaseSchema.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={ClientDatabaseFormField.host.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{ClientDatabaseFormField.host.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={ClientDatabaseFormField.port.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{ClientDatabaseFormField.port.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={ClientDatabaseFormField.username.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{ClientDatabaseFormField.username.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={ClientDatabaseFormField.password.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{ClientDatabaseFormField.password.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
