import { TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InventoryTreeNode from "./InventoryTreeNode";
import { Node } from "@/lib/api";
import { useMemo } from "react";

export default function InventoryTree({ nodes }: { nodes: Node[] }) {
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
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {renderedNodes}
        </TreeView>
    );
}

