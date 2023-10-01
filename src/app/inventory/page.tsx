"use client";

import InventoryTree from "@/components/InventoryTree";
import { Node, nodesList } from "@/lib/api";
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { LoadingButton } from "@mui/lab";
import AssetSummary from "@/components/AssetSummary";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function Inventory() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [refreshLoading, setRefreshLoading] = useState(false);

    const [scannedNodeId, setScannedNodeId] = useState<string | null>(null);

    const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
    const selectedAsset = selectedNodes.length === 1 ? nodes.find((node) => node.id === selectedNodes[0])?.asset : null;

    const [scannerOpen, setScannerOpen] = useState(false);

    const fetchNodes = async () => {
        setRefreshLoading(true);
        const paginatedNodes = await nodesList();
        setNodes(paginatedNodes.results ?? []);
        setRefreshLoading(false);
    };

    useEffect(() => {
        fetchNodes();
    }, []);

    useEffect(() => {
        if (!scannerOpen) return;

        const scanner = new Html5QrcodeScanner(
            "qr-reader",
            {
                qrbox: {
                    width: 200,
                    height: 200,
                },
                fps: 5,
            },
            false
        );

        scanner.render(success, () => {});

        function success(text: string) {
            if (!scannerOpen) return;

            const node = nodes.find((node) => node.asset && node.asset.first_asset_code === text);
            const nodeId = node?.id;
            setScannedNodeId(nodeId ?? null);
            setScannerOpen(false);
            scanner.clear();
        }
    });

    return (
        <main>
            <Dialog open={scannerOpen} onClose={() => setScannerOpen(false)} maxWidth="sm" fullWidth keepMounted>
                <DialogTitle>Asset Code Scanner</DialogTitle>
                <DialogContent>
                    <div id="qr-reader"></div>
                </DialogContent>
            </Dialog>

            <Typography variant="h4" sx={{ mb: 2 }}>
                Inventory
                <Stack direction="row" sx={{ float: "right" }} spacing={2}>
                    <IconButton onClick={() => setScannerOpen(true)}>
                        <QrCodeScannerIcon />
                    </IconButton>
                    <LoadingButton
                        startIcon={<RefreshIcon />}
                        loading={refreshLoading}
                        variant="contained"
                        disableElevation
                        onClick={() => fetchNodes()}
                    >
                        Refresh
                    </LoadingButton>
                </Stack>
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
                                setSelectedNodes(selected);
                            }}
                            scannedNodeId={scannedNodeId}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="h5" sx={{ mb: 1 }}>
                            Selected asset
                        </Typography>

                        {selectedAsset && <AssetSummary asset={selectedAsset} />}
                    </Paper>
                </Grid>
            </Grid>
        </main>
    );
}

