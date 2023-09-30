"use client";

import InventoryTree from "@/components/InventoryTree";
import { Node, nodesList } from "@/lib/api";
import { Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { LoadingButton } from "@mui/lab";

export default function Inventory() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [refreshLoading, setRefreshLoading] = useState(false);

    const fetchNodes = async () => {
        setRefreshLoading(true);
        const paginatedNodes = await nodesList();
        setNodes(paginatedNodes.results ?? []);
        setRefreshLoading(false);
    };

    useEffect(() => {
        fetchNodes();
    }, []);

    return (
        <main>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Inventory
                <LoadingButton
                    startIcon={<RefreshIcon />}
                    loading={refreshLoading}
                    sx={{ float: "right" }}
                    variant="contained"
                    disableElevation
                    onClick={() => fetchNodes()}
                >
                    Refresh
                </LoadingButton>
            </Typography>

            <InventoryTree nodes={nodes} />
        </main>
    );
}

