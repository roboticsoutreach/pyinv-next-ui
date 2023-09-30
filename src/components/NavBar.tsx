"use client";

import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Link from "next/link";

interface Link {
    name: string;
    href: string;
}

const links: Link[] = [{ name: "Inventory", href: "/inventory" }];

export default function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div">
                    SRO Inventory
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 2 }}>
                    {links.map((link) => (
                        <Button
                            key={link.name}
                            href={link.href}
                            sx={{ display: "block", color: "white" }}
                            LinkComponent={Link}
                        >
                            {link.name}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

