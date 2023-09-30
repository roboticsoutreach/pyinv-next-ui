"use client";

import InventoryTree from "@/components/InventoryTree";
import { Asset, Node, nodesList } from "@/lib/api";
import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { LoadingButton } from "@mui/lab";
import AssetSummary from "@/components/AssetSummary";

export default function Inventory() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [refreshLoading, setRefreshLoading] = useState(false);

    const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

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
            <Typography variant="h4" sx={{ mb: 2 }}>
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

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="h5" sx={{ mb: 1 }}>
                            Asset tree
                        </Typography>
                        <InventoryTree
                            nodes={nodes}
                            onSelectedChanged={(selected) => {
                                if (selected.length === 1 && nodes.find((node) => node.id === selected[0])?.asset) {
                                    setSelectedAsset(selected[0]);
                                } else {
                                    setSelectedAsset(null);
                                }
                            }}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="h5" sx={{ mb: 1 }}>
                            Selected asset
                        </Typography>

                        {selectedAsset && (
                            <AssetSummary asset={nodes.find((node) => node.id === selectedAsset)!.asset as Asset} />
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </main>
    );
}

