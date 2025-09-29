import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Folder } from "lucide-react";
import {
    setRenameApiTest,
    setSelectedApiTest,
    toggleExpandedApiTests,
    toggleSelectedApiTest, triggerMenuAction,
} from "@/pages/backend/api_test/presentation/redux/apiTestUISlice.ts";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/core/presentation/store/useAppSelector.ts";
import type ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import {
    selectApiTestDTO,
    selectExpandedApiTests, selectMenuAction,
    selectSelectedApiTest
} from "@/pages/backend/api_test/presentation/redux/apiTestSelectors.ts";
import {Input} from "@/components/ui/input.tsx";
import useApiTestService from "@/pages/backend/api_test/domain/service/useApiTestService";
import useShowToast from "@/hooks/use-show-toast";
import { updateApiTests } from "../redux/apiTestSlice";
import { usePage } from "@inertiajs/react";
import { selectClientDatabase } from "@/pages/backend/client_database/presentation/redux/clientDatabaseSelectors";


interface PageProps extends InertiaPageProps {
    id: string;
}


export default function TreeView({ node, level = 0 }: { node: ApiTestViewModel, level?: number}) {
    const { id: projectUUID } = usePage<PageProps>().props;
    const dispatch = useDispatch();
    const indent = level * 8;
    const selectedApiTest = useAppSelector(selectSelectedApiTest);
    const apiTestDTO = useAppSelector(selectApiTestDTO);
    const expandedApiTests = useAppSelector(selectExpandedApiTests);
    const menuAction = useAppSelector(selectMenuAction);
    const clientDatabase = useAppSelector(selectClientDatabase);
    const showToast = useShowToast();

    const isExpanded = expandedApiTests.includes(node.UUID);
    const isSelected = selectedApiTest?.UUID === node.UUID;

    const { createApiTest } = useApiTestService();

    const handleToggleSelect = (node: ApiTestViewModel) => {
        dispatch(toggleSelectedApiTest(node));
    };

    const handleToggleExpand = (UUID: string) => {
        dispatch(toggleExpandedApiTests(UUID));
    };


    const handleSaveTestApi = async () => {
        try {
            if(apiTestDTO && clientDatabase) {
                const newApiTestDTO = {
                    ...apiTestDTO,
                    project: projectUUID,
                    transmission: 'formData',
                    clientDatabase: clientDatabase.UUID,
                    seq: 1
                }

                await createApiTest(newApiTestDTO, clientDatabase.refreshToken, {
                    onSuccess: (newApiTestViewModel) => {
                        dispatch(setRenameApiTest(null));
                        dispatch(updateApiTests(newApiTestViewModel));
                        dispatch(setSelectedApiTest(newApiTestViewModel));
                    }
                });
            }
        } catch(error) {
            console.error(error);
            showToast("Error", "Unexpected error", "error");
        }
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
                    {menuAction === "rename" && selectedApiTest?.UUID === node.UUID ? (
                        <Input
                            defaultValue={node.testName}
                            autoFocus
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch(setRenameApiTest(e.target.value));
                            }}
                            onBlur={() => dispatch(setRenameApiTest(null))}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSaveTestApi();
                                }
                            }}
                        />
                    ) : (
                        <Button
                            variant="ghost"
                            onClick={() => handleToggleSelect(node)}
                            className={`w-full flex items-center justify-start gap-1 ${
                                isSelected ? "bg-accent" : ""
                            }`}
                        >
                            <FileText size={16} />
                            {node.testName}
                        </Button>
                    )}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem
                        className="cursor-pointer"
                        onClick={() => dispatch(triggerMenuAction({ action: "rename", viewModel: node, dto: node.apiDTO }))}
                    >
                        Rename
                    </ContextMenuItem>
                    <ContextMenuItem
                        className="cursor-pointer"
                    >
                        Remove
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    );
}
