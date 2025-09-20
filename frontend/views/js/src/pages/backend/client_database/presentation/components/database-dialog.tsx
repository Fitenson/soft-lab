import { Dialog, DialogHeader, DialogTrigger } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import ClientDatabaseFormField from "@/pages/backend/client_database/presentation/form/ClientDatabaseFormField.ts";
import { Input } from "@/components/ui/input.tsx";
import type {ClientDatabaseDTO} from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO.ts";
import useClientDatabaseForm from "@/pages/backend/client_database/presentation/hooks/useClientDatabaseForm.ts";


type DatabaseDialogProps = {
    clientDatabaseDTO: ClientDatabaseDTO;
}


export default function DatabaseDialog({ clientDatabaseDTO }: DatabaseDialogProps) {
    const { form } = useClientDatabaseForm({ clientDatabaseDTO: clientDatabaseDTO });


    return (
        <Dialog>
            <DialogTrigger>
                <Button>Add connection</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[520px]">
                <DialogHeader>
                    <DialogTitle>Add new database connection</DialogTitle>
                </DialogHeader>

                <div className="w-full">
                    <Form {...form}>
                        <form>
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
