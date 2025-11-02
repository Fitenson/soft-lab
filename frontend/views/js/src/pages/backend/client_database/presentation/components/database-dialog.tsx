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
import {DropdownTable} from "@/components/ui/dropdown-table.tsx";
import {projectDropdownColumns} from "@/core/presentation/table/DropdownDataTableColumns.tsx";
import useUniversalService from "@/core/domain/service/useUniversalService";
import { useQuery } from "@tanstack/react-query";
import type { ProjectDTO } from "@/pages/project_management/project/data/dto/ProjectDTO";
import ProjectViewModel from "@/pages/project_management/project/presentation/view_models/ProjectViewModel";
import type { Params } from "@/types";
import { useEffect } from "react";
import {useDispatch} from "react-redux";
import {addClientDatabase} from "@/pages/backend/client_database/presentation/redux/clientDatabaseSlice.ts";


type DatabaseDialogProps = {
    clientDatabaseDTO?: ClientDatabaseDTO | undefined;
    open: boolean;
    onOpenChange: (open: boolean) => void
}


export default function DatabaseDialog({ clientDatabaseDTO, open, onOpenChange }: DatabaseDialogProps) {
    const dispatch = useDispatch();
    const { form, setFormError, clientDatabaseViewModel, setClientDatabaseViewModel } = useClientDatabaseForm({ clientDatabaseDTO: clientDatabaseDTO });
    const { createClientDatabase, updateClientDatabase } = useClientDatabaseService();
    const { dropdownTable } = useUniversalService();

    const params: Params = {
        offset: "0",
        limit: "20",
        sort: "createdAtFormat",
        order: "desc",
        filter: "{}"
    };

    const { data, refetch } = useQuery({
        queryKey: ["/universal/dropdown-table", params],
        queryFn: async () =>
            await dropdownTable<
                { project: ProjectDTO },
                { project: typeof ProjectViewModel }
            >(
                params,
                ["project"],
                { project: ProjectViewModel }
            ),
        enabled: false,
    });


    useEffect(() => {
        refetch();
    }, [refetch]);


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
                    dispatch(addClientDatabase(newClientDatabaseViewModel));
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
            <DialogContent className="sm:max-w-[720px]" showCloseButton={false}>
                <div className="w-full">
                    <Form {...form}>
                        <form className="grid grid-cols-3 gap-4" onSubmit={form.handleSubmit(submit)}>
                            <DialogHeader className="mb-4 col-span-3 flex flex-row items-center justify-start">
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

                            <FormField
                                name={ClientDatabaseFormField.project.name}
                                render={({ field }) => (
                                    <FormItem className="hidden">
                                        <Input {...field} />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name={ClientDatabaseFormField.projectName.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{ClientDatabaseFormField.projectName.label}</FormLabel>
                                        <FormControl>
                                            <DropdownTable
                                                {...field}
                                                columns={projectDropdownColumns}
                                                data={data?.project?.rows ?? []}
                                                isLoading={isLoading}
                                                label={ClientDatabaseFormField.project.label}
                                                onSelect={(row) => {
                                                    field.onChange(row.projectName);
                                                    form.setValue("project", row.UUID);
                                                }}
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
