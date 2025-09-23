import { Dialog, DialogHeader, DialogContent, DialogClose } from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import ClientDatabaseFormField from "@/pages/backend/client_database/presentation/form/ClientDatabaseFormField.ts";
import { Input } from "@/components/ui/input.tsx";
import type {ClientDatabaseDTO} from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO.ts";
import useClientDatabaseForm from "@/pages/backend/client_database/presentation/hooks/useClientDatabaseForm.ts";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import SaveButton from "@/components/buttons/save-button.tsx";
import useClientDatabaseService from "@/pages/backend/client_database/domain/service/useClientDatabaseService.ts";
import useShowToast from "@/hooks/use-show-toast.ts";
import { useAppSelector } from "@/core/presentation/store/useAppSelector.ts";


type DatabaseDialogProps = {
    clientDatabaseDTO?: ClientDatabaseDTO | undefined;
    open: boolean;
    onOpenChange: (open: boolean) => void
}


export default function DatabaseDialog({ clientDatabaseDTO, open, onOpenChange }: DatabaseDialogProps) {
    const { form, setFormError, clientDatabaseViewModel, setClientDatabaseViewModel } = useClientDatabaseForm({ clientDatabaseDTO: clientDatabaseDTO });
    const { createClientDatabase, updateClientDatabase } = useClientDatabaseService();
    const showToast = useShowToast();
    const isLoading = useAppSelector(state => state.loading.global);


    const submit = async () => {
        const formValues = form.getValues();
        const clientDatabaseDTO = {
            ...formValues,
            ...(clientDatabaseViewModel?.UUID ? { UUID: clientDatabaseViewModel.UUID } : {}),
        };


        if(clientDatabaseDTO?.UUID) {
            await updateClientDatabase(clientDatabaseDTO, {
                onSuccess: (newClientDatabaseViewModel) => {
                    setClientDatabaseViewModel(newClientDatabaseViewModel);
                    onOpenChange(false);
                },
                onError: (error) => {
                    setFormError(error, {
                        setToastError(message) {
                            showToast("Error", message, "error");
                        },
                    });
                }
            });
        } else {
            await createClientDatabase(clientDatabaseDTO, {
                onSuccess: (newClientDatabaseViewModel) => {
                    setClientDatabaseViewModel(newClientDatabaseViewModel);
                    onOpenChange(false);
                },
                onError: (error) => {
                    setFormError(error, {
                        setToastError(message) {
                            showToast("Error", message, "error");
                        },
                    });
                }
            });
        }
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px]" showCloseButton={false}>
                <div className="w-full">
                    <Form {...form}>
                        <form className="grid grid-cols-2 gap-4" onSubmit={form.handleSubmit(submit)}>
                            <DialogHeader className="mb-4 col-span-2 flex flex-row items-center justify-start">
                                <SaveButton />
                                <DialogClose asChild>
                                    <Button
                                        variant="ghost"
                                        type="button"
                                        className="cursor-pointer rounded-full"
                                    >
                                        <X className="h-5 w-5 text-accent-foreground dark:text-accent-foreground" />
                                    </Button>
                                </DialogClose>
                            </DialogHeader>

                            <FormField
                                control={form.control}
                                name={ClientDatabaseFormField.databaseName.name}
                                render={({ field }) => (
                                    <FormItem className="my-1 ml-1 mb-1">
                                        <FormLabel>{ClientDatabaseFormField.databaseName.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                required
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
                                    <FormItem className="my-1 ml-1 mb-1">
                                        <FormLabel>{ClientDatabaseFormField.databaseSchema.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                required
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
                                    <FormItem className="my-1 ml-1 mb-1">
                                        <FormLabel>{ClientDatabaseFormField.host.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                required
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
                                    <FormItem className="my-1 ml-1 mb-1">
                                        <FormLabel>{ClientDatabaseFormField.port.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                required
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
                                    <FormItem className="my-1 ml-1 mb-1">
                                        <FormLabel>{ClientDatabaseFormField.username.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                required
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
                                    <FormItem className="my-1 ml-1 mb-1">
                                        <FormLabel>{ClientDatabaseFormField.password.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                required
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
