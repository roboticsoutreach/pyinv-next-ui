import { TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InventoryTreeNode from "./InventoryTreeNode";
import { Node } from "@/lib/api";
import { useMemo, useState } from "react";

export default function InventoryTree({ nodes }: { nodes: Node[] }) {
    const [selected, setSelected] = useState<string[]>([]);

    const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setSelected(nodeIds.filter((nodeId) => nodes.find((node) => node.id === nodeId)?.asset !== null));
    };

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
            onNodeSelect={handleSelect}
        >
            {renderedNodes}
        </TreeView>
    );
}

