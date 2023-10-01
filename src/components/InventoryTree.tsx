import { TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InventoryTreeNode from "./InventoryTreeNode";
import { Node } from "@/lib/api";
import { useEffect, useMemo, useState } from "react";

export default function InventoryTree({
    nodes,
    onSelectedChanged,
    scannedNodeId,
}: {
    nodes: Node[];
    onSelectedChanged?: (selected: string[]) => void;
    scannedNodeId?: string | null;
}) {
    const [selected, setSelected] = useState<string[]>([]);
    const [expanded, setExpanded] = useState<string[]>([]);

    const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setSelected(nodeIds);
    };

    const handleExpand = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    useEffect(() => {
        if (scannedNodeId) {
            const node = nodes.find((node) => node.id === scannedNodeId);

            if (!node) return;

            setExpanded(
                nodes
                    .filter((otherNode) => node.ancestors.some((ancestor) => ancestor.id === otherNode.id))
                    .map((node) => node.id)
            );
            setSelected([scannedNodeId]);
        }
    }, [scannedNodeId, nodes]);

    useEffect(() => {
        onSelectedChanged?.(selected);
    }, [selected, onSelectedChanged]);

    const renderedNodes = useMemo(
        () =>
            nodes
                .filter((node) => node.depth === 1)
                .map((node) => (
                    <InventoryTreeNode
                        key={node.id}
                        node={node}
                        childNodes={nodes.filter((child) =>
                            child.ancestors.some((ancestor) => ancestor.id === node.id)
                        )}
                    />
                )),
        [nodes]
    );

    return (
        <TreeView
            aria-label="inventory tree"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            multiSelect
            selected={selected}
            expanded={expanded}
            onNodeSelect={handleSelect}
            onNodeToggle={handleExpand}
        >
            {renderedNodes}
        </TreeView>
    );
}

