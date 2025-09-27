import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface TreeNode {
    UUID: string;
    title: string;
    isFolder: boolean;
    apiTests?: TreeNode[];
}

interface TreeViewState {
    selectedNode: TreeNode | null;
    expandedNodes: string[];
}

const initialState: TreeViewState = {
    selectedNode: null,
    expandedNodes: [],
}


export const treeViewSlice = createSlice({
    name: "tree-view",
    initialState,
    reducers: {
        toggleSelectedNode: (state, action: PayloadAction<TreeNode>) => {
            if (state.selectedNode?.UUID === action.payload.UUID) {
                state.selectedNode = null;
            } else {
                state.selectedNode = action.payload;
            }
        },
        toggleExpandedNodes: (state, action: PayloadAction<string>) => {
            const UUID = action.payload;
            if (state.expandedNodes.includes(UUID)) {
                state.expandedNodes = state.expandedNodes.filter((id) => id !== UUID);
            } else {
                state.expandedNodes.push(UUID);
            }
        },
        clearSelectedNode: (state) => {
            state.selectedNode = null;
        }
    }
});

export const { toggleSelectedNode, clearSelectedNode, toggleExpandedNodes } = treeViewSlice.actions;

export default treeViewSlice.reducer;
