"use client";

import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

export default function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div">
                    SRO Inventory
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 2 }}>
                    <Button sx={{ display: "block", color: "white" }}>Assets</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

