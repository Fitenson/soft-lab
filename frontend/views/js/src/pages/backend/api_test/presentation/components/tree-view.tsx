import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Folder } from "lucide-react";
import {
    toggleExpandedApiTests,
    toggleSelectedApiTest,
} from "@/pages/backend/api_test/presentation/redux/api-test-form-slice.ts";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/core/presentation/store/useAppSelector.ts";
import type ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";


export default function TreeView({ node, level = 0 }: { node: ApiTestViewModel, level?: number}) {
    const dispatch = useDispatch();
    const indent = level * 8;
    const { selectedApiTest, expandedApiTests } = useAppSelector((state) => state.apiTest);

    const isExpanded = expandedApiTests.includes(node.UUID);
    const isSelected = selectedApiTest?.UUID === node.UUID;

    const handleToggleSelect = (node: ApiTestViewModel) => {
        dispatch(toggleSelectedApiTest(node));
    };

    const handleToggleExpand = (UUID: string) => {
        dispatch(toggleExpandedApiTests(UUID));
    };


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
                    <Button
                        variant="ghost"
                        onClick={() => handleToggleSelect(node)}
                        className={`w-full flex items-center justify-start gap-1 ${isSelected ? "bg-accent" : ""}`}
                    >
                        <FileText size={16} />
                        {node.testName}
                    </Button>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem className="cursor-pointer">Rename</ContextMenuItem>
                    <ContextMenuItem className="cursor-pointer">Remove</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    );
}
