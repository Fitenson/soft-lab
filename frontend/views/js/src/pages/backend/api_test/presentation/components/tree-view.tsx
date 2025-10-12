import type { PageProps as InertiaPageProps } from "@inertiajs/core";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Folder } from "lucide-react";
import {
    clearSelectedNode,
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
import {updateApiTests, removeApiTests as removeApiTestAction } from "../redux/apiTestSlice";
import { usePage } from "@inertiajs/react";
import { selectClientDatabase } from "@/pages/backend/client_database/presentation/redux/clientDatabaseSelectors";
import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO";
import type { ClientDatabaseDTO } from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO";
import {FormControl, FormField, FormItem} from "@/components/ui/form.tsx";
import ApiTestFormField from "@/pages/backend/api_test/presentation/form/ApiTestFormField.ts";
import {useFormContext} from "react-hook-form";
import type {ApiTestFormModel} from "@/pages/backend/api_test/presentation/schema/apiTestSchema.ts";
import type {MenuActionType} from "@/pages/backend/api_test/presentation/types";
import type {ApiTestDataDTO} from "@/pages/backend/api_test/data/dto/ApiTestDataDTO.ts";


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
    const form = useFormContext<ApiTestFormModel>();

    const isExpanded = expandedApiTests.includes(node.UUID);
    const isSelected = selectedApiTestDTO?.UUID === node.UUID;

    const { createApiTest, removeApiTest } = useApiTestService();

    const handleToggleSelect = (node: ApiTestViewModel) => {
        dispatch(toggleSelectedApiTest(node.apiTestDTO));
    };

    const handleToggleExpand = (UUID: string) => {
        dispatch(toggleExpandedApiTests(UUID));
    };


    const handleSaveTestApi = async () => {
        try {
            if(selectedApiTestDTO &&
                clientDatabase &&
                clientDatabase.password
            ) {
                const formValues = form.getValues("apiTestData") as Partial<ApiTestDataDTO>[];

                const apiTestDataDTO: Partial<ApiTestDataDTO>[] = formValues.map(data => ({
                    enabled: data.enabled ?? 0,
                    key: data.key ?? "",
                    value: data.value ?? "",
                    description: data.description ?? "",
                }));


                const newApiTestDTO: Partial<ApiTestDTO> = {
                    ...form.getValues(),
                    project: projectUUID,
                    clientDatabase: clientDatabase.UUID,
                    apiTestData: apiTestDataDTO as ApiTestDataDTO[] ?? []
                }

                const UUIDs = [selectedApiTestDTO?.UUID].filter(
                    (UUID): UUID is string => UUID !== undefined
                );

                await createApiTest({
                    apiTestDTO: newApiTestDTO,
                    clientDatabaseToken: clientDatabase.password
                }, {
                    onSuccess: (newApiTestViewModel) => {
                        dispatch(removeApiTestAction(UUIDs));
                        dispatch(updateApiTests(newApiTestViewModel));
                        dispatch(triggerMenuAction({ action: null }));
                        dispatch(setSelectedApiTest(newApiTestViewModel.apiTestDTO));
                    },
                    onError: (error) => {
                        console.error(error);
                        showToast("Error", "Failed to create test case", "error");
                        dispatch(clearSelectedNode());
                        dispatch(triggerMenuAction({ action: null }));
                        dispatch(removeApiTestAction(UUIDs));
                    }
                });
            } else {
                throw new Error("Missing Client Database Token");
            }
        } catch(error) {
            console.error(error);
            const message = error instanceof Error ?
                error.message : typeof error === "string" ?
                    error : "Unexpected error occurred";

            showToast("Error", message, "error");
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


    const handleSelectMenuAction = (action: MenuActionType) => {
        switch (action) {
            case "rename":
                dispatch(triggerMenuAction({ action: "rename", dto: {...selectedApiTestDTO} }));
                break;

            case "cancel":
                form.reset({
                    ...form.getValues(),
                    testName: selectedApiTestDTO?.testName ?? "",
                });

                dispatch(triggerMenuAction({ action: "cancel", dto: { ...selectedApiTestDTO } }));
                break;

            default:
                throw new Error("No such action.");
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
                    {menuAction === "rename" && selectedApiTestDTO?.UUID === node.UUID ? (
                        <FormField
                            name={ApiTestFormField.testName.name}
                            control={form.control}
                            render={({ field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value ?? ""}
                                            autoFocus
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && node?.UUID) {
                                                    e.preventDefault();
                                                    handleSaveTestApi();
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
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
                        onClick={() => handleSelectMenuAction("rename")}
                    >
                        Rename
                    </ContextMenuItem>
                    <ContextMenuItem
                        className="cursor-pointer"
                        onClick={handleRemoveApiTest}
                    >
                        Remove
                    </ContextMenuItem>
                    <ContextMenuItem
                        className="cursor-pointer accent-destructive dark:accent-destructive"
                        onClick={() => handleSelectMenuAction("cancel")}
                    >
                        Cancel
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    );
}
