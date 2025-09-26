import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import type ProjectListViewModel from "@/pages/backend/api_test/presentation/view_models/ProjectListViewModel.ts";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu.tsx";
import type ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel.ts";
import useClientDatabaseService from "@/pages/backend/client_database/domain/service/useClientDatabaseService";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import { useDispatch } from "react-redux";
import { setClientDatabase } from "@/pages/backend/client_database/presentation/redux/clientDatabaseSlice";
import useShowToast from "@/hooks/use-show-toast";
import { router } from "@inertiajs/react";


export default function ProjectCard({ projectViewModel }: { projectViewModel: ProjectListViewModel }) {
    const dispatch = useDispatch();
    const [selectedDatabase, setSelectedDatabase] = React.useState<ClientDatabaseViewModel>();
    const { connectClientDatabase } = useClientDatabaseService();
    const clientDatabase = useAppSelector(state => state.clientDatabase.clientDatabase);
    const showToast = useShowToast();


    const handleConnectClientDatabase = async () => {
        if(clientDatabase?.UUID != selectedDatabase?.UUID) {
            await connectClientDatabase(selectedDatabase?.UUID ?? "", {
                onSuccess: (data: ClientDatabaseViewModel) => {
                    dispatch(setClientDatabase(data));
                    showToast("Success", "Successfully connecting user to database", "success");
                },
                onError: () => {
                    showToast("Error", "Failed to connect user to database", "error");
                }
            });
        } else {
            if (clientDatabase) {
                setSelectedDatabase(clientDatabase);
            }
            
            showToast("Success", "Successfully connecting user to database", "success");
        }

        router.visit(`/backend/api-test/dashboard?id=${selectedDatabase?.UUID}`);
    }


    return (
        <Card className="w-full h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-center font-semibold">{projectViewModel.projectCode}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 flex-1 mb-2">
                <div className="text-start text-foreground dark:text-foreground">
                    <span className="font-medium">Project: </span>
                    <span className="font-normal">{projectViewModel.projectName}</span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            {selectedDatabase ? selectedDatabase.databaseName : "Select Database"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {projectViewModel.clientDatabases.map((database) => (
                            <DropdownMenuItem
                                key={database.UUID}
                                onClick={() => setSelectedDatabase(database)}
                            >
                                {database.databaseName}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardContent>
            <CardFooter className="flex flex-col w-full mt-auto">
                <Button className="w-full" onClick={handleConnectClientDatabase}>
                    Connect
                </Button>
            </CardFooter>
        </Card>
    );
}
