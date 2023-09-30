import { Node } from "@/lib/api";
import { TreeItem } from "@mui/x-tree-view";
import { useMemo } from "react";

export default function InventoryTreeNode(props: { node: Node; childNodes: Node[] }) {
    const { node, childNodes } = props;

    const children = useMemo(
        () => childNodes.filter((child) => child.ancestors.some((ancestor) => ancestor.id === node.id)),
        [childNodes, node.id]
    );

    return (
        <TreeItem nodeId={node.id} label={node.display_name}>
            {childNodes
                .filter(
                    (child) =>
                        child.ancestors.length !== 0 && child.ancestors[child.ancestors.length - 1].id === node.id
                )
                .map((child) => (
                    <InventoryTreeNode key={child.id} node={child} childNodes={children} />
                ))}
        </TreeItem>
    );
}

