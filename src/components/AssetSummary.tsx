import { Asset } from "@/lib/api";
import { Grid, Typography } from "@mui/material";

export default function AssetSummary({ asset }: { asset: Asset }) {
    return (
        <Grid container rowSpacing={1}>
            <Grid item xs={12} md={6}>
                <Typography variant="h6">Code</Typography>
                <Typography variant="body1">
                    <code>{asset.first_asset_code}</code>
                </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
                <Typography variant="h6">Model</Typography>
                <Typography variant="body1">{asset.asset_model.name}</Typography>
            </Grid>
        </Grid>
    );
}

