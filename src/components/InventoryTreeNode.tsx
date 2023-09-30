import { Node } from "@/lib/api";
import { TreeItem } from "@mui/x-tree-view";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function InventoryTreeNode(props: { node: Node; childNodes: Node[] }) {
    const router = useRouter();

    const { node, childNodes } = props;

    const children = useMemo(
        () => childNodes.filter((child) => child.ancestors.some((ancestor) => ancestor.id === node.id)),
        [childNodes, node.id]
    );

    return (
        <TreeItem nodeId={node.id} label={node.display_name} onDoubleClick={() => router.push(`/node/${node.id}`)}>
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

