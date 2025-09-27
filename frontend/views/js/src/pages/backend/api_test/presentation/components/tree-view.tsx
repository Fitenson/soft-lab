import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Folder } from "lucide-react";
import {
    toggleExpandedNodes,
    toggleSelectedNode,
    type TreeNode
} from "@/pages/backend/api_test/presentation/redux/tree-view-slice.ts";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/core/presentation/store/useAppSelector.ts";


export default function TreeView({ node, level = 0 }: { node: TreeNode, level?: number}) {
    const dispatch = useDispatch();
    const indent = level * 8;
    const { selectedNode, expandedNodes } = useAppSelector((state) => state.treeView);

    const isExpanded = expandedNodes.includes(node.UUID);
    const isSelected = selectedNode?.UUID === node.UUID;

    const handleToggleSelect = (node: TreeNode) => {
        dispatch(toggleSelectedNode(node));
    };

    const handleToggleExpand = (UUID: string) => {
        dispatch(toggleExpandedNodes(UUID));
    };


    if (node.isFolder) {
        return (
            <div>
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
                    <span className="text-sm">{node.title}</span>
                </Button>
                {isExpanded && node.apiTests?.map((child) => (
                    <TreeView key={child.UUID} node={child} level={level + 1} />
                ))}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1" style={{ paddingLeft: `${indent + 8}px` }}>
            <FileText size={16} />
            <Button
                variant="ghost"
                onClick={() => handleToggleSelect(node)}
                className={`w-full flex items-center justify-start gap-1 ${isSelected ? "bg-accent" : ""}`}
            >
                {node.title}
            </Button>
        </div>
    );
}
