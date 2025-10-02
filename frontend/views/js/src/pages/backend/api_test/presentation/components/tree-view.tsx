import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Folder } from "lucide-react";
import {
    clearSelectedNode,
    setRenameSelectedApiTest,
    setSelectedApiTest,
    toggleExpandedApiTests,
    toggleSelectedApiTest,
    triggerMenuAction,
} from "@/pages/backend/api_test/presentation/redux/apiTestUISlice.ts";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/core/presentation/store/useAppSelector.ts";
import type ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import {
    selectExpandedApiTests, selectMenuAction,
    selectSelectedApiTest
} from "@/pages/backend/api_test/presentation/redux/apiTestSelectors.ts";
import {Input} from "@/components/ui/input.tsx";
import useApiTestService from "@/pages/backend/api_test/domain/service/useApiTestService";
import useShowToast from "@/hooks/use-show-toast";
import {renameApiTest, updateApiTests, removeApiTests as removeApiTestAction } from "../redux/apiTestSlice";
import { usePage } from "@inertiajs/react";
import { selectClientDatabase } from "@/pages/backend/client_database/presentation/redux/clientDatabaseSelectors";
import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO";
import type { ClientDatabaseDTO } from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO";


interface PageProps extends InertiaPageProps {
    id: string;
}


export default function TreeView({ node, level = 0 }: { node: ApiTestViewModel, level?: number}) {
    const { id: projectUUID } = usePage<PageProps>().props;
    const dispatch = useDispatch();
    const indent = level * 8;
    const selectedApiTestDTO: Partial<ApiTestDTO> | null = useAppSelector(selectSelectedApiTest);
    const expandedApiTests = useAppSelector(selectExpandedApiTests);
    const menuAction = useAppSelector(selectMenuAction);
    const clientDatabase: Partial<ClientDatabaseDTO> | null = useAppSelector(selectClientDatabase);
    const showToast = useShowToast();

    const isExpanded = expandedApiTests.includes(node.UUID);
    const isSelected = selectedApiTestDTO?.UUID === node.UUID;

    const { createApiTest, removeApiTest } = useApiTestService();

    const handleToggleSelect = (node: ApiTestViewModel) => {
        dispatch(toggleSelectedApiTest(node.apiDTO));
    };

    const handleToggleExpand = (UUID: string) => {
        dispatch(toggleExpandedApiTests(UUID));
    };


    const handleSaveTestApi = async () => {
        try {
            if(selectedApiTestDTO && 
                clientDatabase && 
                clientDatabase.refreshToken
            ) {
                const newApiTestDTO = {
                    ...selectedApiTestDTO,
                    project: projectUUID,
                    transmission: 'formData',
                    clientDatabase: clientDatabase.UUID,
                    seq: 1
                }

                const UUIDs = [selectedApiTestDTO?.UUID].filter(
                    (UUID): UUID is string => UUID !== undefined
                );

                await createApiTest(newApiTestDTO, clientDatabase.refreshToken, {
                    onSuccess: (newApiTestViewModel) => {
                        dispatch(removeApiTestAction(UUIDs));
                        dispatch(updateApiTests(newApiTestViewModel));
                        dispatch(triggerMenuAction({ action: null }));
                        dispatch(renameApiTest({ UUID: "", newName: "" }));
                        dispatch(setSelectedApiTest(newApiTestViewModel));
                    },
                    onError: (error) => {
                        console.error(error);
                        showToast("Error", "Failed to create test case", "error");
                        dispatch(clearSelectedNode());
                        dispatch(triggerMenuAction({ action: null }));
                        dispatch(removeApiTestAction(UUIDs));
                    }
                });
            }
        } catch(error) {
            console.error(error);
            showToast("Error", "Unexpected error", "error");
        }
    }


    const handleRemoveApiTest =  async () => {
        const UUIDs = [selectedApiTestDTO?.UUID].filter(
            (UUID): UUID is string => UUID !== undefined
        );

        await removeApiTest(UUIDs, {
            onSuccess: (result) => {
                if(result.success.length > 0) {
                    dispatch(clearSelectedNode());
                    dispatch(removeApiTestAction(UUIDs));
                }
            },
            onError: () => {
                showToast("Error", "Server error", "error");
            }
        });
    }


    const handleRenameApiTest = () => {
        dispatch(triggerMenuAction({ action: "rename", dto: {...selectedApiTestDTO} }));
    }


    if (node.isFolder) {
        return (
            <div>
                <ContextMenu>
                    <ContextMenuTrigger>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                handleToggleExpand(node.UUID);
                                handleToggleSelect(node);
                            }}
                            className={`w-full flex items-center justify-start gap-1 ${isSelected ? "bg-accent" : ""}`}
                            style={{ paddingLeft: `${indent}px` }}
                        >
                            <ChevronRight
                                className={`h-4 w-4 transform transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
                            />
                            <Folder size={16} />
                            <span className="text-sm">{node.testName}</span>
                        </Button>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem>Rename</ContextMenuItem>
                        <ContextMenuItem>Remove</ContextMenuItem>                        
                    </ContextMenuContent>
                </ContextMenu>
                {isExpanded && node.apiTests?.map((child) => (
                    <TreeView key={child.UUID} node={child} level={level + 1} />
                ))}
            </div>
        );
    }


    return (
        <div className="flex items-center gap-1 w-full" style={{ paddingLeft: `${indent + 8}px` }}>
            <ContextMenu>
                <ContextMenuTrigger className="w-full">
                    {menuAction === "rename" && selectedApiTestDTO?.UUID === node.UUID ? (
                        <Input
                            value={selectedApiTestDTO?.testName}
                            autoFocus
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch(setRenameSelectedApiTest(e.target.value));
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && node?.UUID) {
                                    dispatch(renameApiTest({
                                        UUID: node.UUID,
                                        newName: selectedApiTestDTO.testName ?? "",
                                    }));
                                    handleSaveTestApi();
                                }
                            }}
                        />
                    ) : (
                        <Button
                            variant="ghost"
                            onClick={() => handleToggleSelect(node)}
                            className={`w-full flex items-center justify-start gap-1 ${isSelected ? "bg-accent" : ""}`}
                        >
                            <FileText size={16} />
                            {node.testName}
                        </Button>
                    )}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem
                        className="cursor-pointer"
                        onClick={handleRenameApiTest}
                    >
                        Rename
                    </ContextMenuItem>
                    <ContextMenuItem
                        className="cursor-pointer"
                        onClick={handleRemoveApiTest}
                    >
                        Remove
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    );
}
