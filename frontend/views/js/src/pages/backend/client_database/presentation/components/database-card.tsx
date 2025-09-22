import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel.ts";
import type { ClientDatabaseDTO } from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO.ts";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import useClientDatabaseService from "@/pages/backend/client_database/domain/service/useClientDatabaseService.ts";
import useShowToast from "@/hooks/use-show-toast.ts";
import React from "react";


export default function DatabaseCard({ clientDatabaseDTO }: { clientDatabaseDTO: ClientDatabaseDTO }) {
    const [open, setOpen] = React.useState(false);
    const clientDatabaseViewModel = new ClientDatabaseViewModel(clientDatabaseDTO);
    const showToast = useShowToast();

    const { removeClientDatabase, connectClientDatabase } = useClientDatabaseService();

    const handleRemoveClientDatabase = async () => {
        const UUIDs = [
            clientDatabaseViewModel.UUID
        ];

        await removeClientDatabase(UUIDs, {
            onSuccess: (data)=> {
                if (data.success && data.success.length > 0) {
                    showToast("Success", "Connection successfully removed", "success");
                    setOpen(false);
                } else {
                    showToast("Error", "Failed to remove the connection", "error");
                }
            },
            onError: ()=> {
                showToast("Error", "Server error", "error");
            }
        });
    }


    const handleConnectClientDatabase = async () => {
        await connectClientDatabase(clientDatabaseDTO.UUID, {
            onSuccess: (data)=> {
                setOpen(false);
            }
        });
    }


    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle className="text-center font-semibold">{clientDatabaseViewModel.databaseName}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-xs">
                <div className="text-start text-foreground dark:text-foreground">
                    <span className="font-medium">Schema: </span>
                    <span className="font-normal">{clientDatabaseViewModel.databaseName}</span>
                </div>
                <div className="text-start text-foreground dark:text-foreground">
                    <span className="font-medium">Port: </span>
                    <span className="font-normal">{clientDatabaseViewModel.port}</span>
                </div>
                <div className="text-start text-foreground dark:text-foreground">
                    <span className="font-medium">Username: </span>
                    <span className="font-normal">{clientDatabaseViewModel.username}</span>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col w-full gap-2">
                <Button className="w-full" onClick={() => connectClientDatabase(clientDatabaseDTO.UUID)}>
                    Connect
                </Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                            Delete
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Delete Connection</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this connection? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                            <DialogClose asChild>
                                <Button variant="outline" className="sm:w-auto w-full">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                onClick={handleRemoveClientDatabase}
                                variant="destructive"
                                className="sm:w-auto w-full"
                            >
                                Remove
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
}
