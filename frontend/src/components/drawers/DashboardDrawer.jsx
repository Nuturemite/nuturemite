"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/context/authprovider";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function DashboardDrawer({ sidebarItems }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();

  if (!user) return;

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {};

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon color="inherit" fontSize="large" />
      </IconButton>
      <div className="bg-gray-800 text-white">
        <Drawer open={open} onClose={toggleDrawer(false)} sx={{ width: 260 }}>
          <Box
            sx={{
              width: 260,
              transition: "width 0.3s",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
              }}
            >
              <Link href="/">
                <span className="text-lg font-semibold tracking-wide text-slate-800">
                  Nuturemite
                </span>
              </Link>
            </Box>
            <List>
              {sidebarItems.map(item => (
                <ListItem key={item.title} disablePadding>
                  <ListItemButton component={Link} href={item.link}>
                    <ListItemIcon>{<item.icon size={20} />}</ListItemIcon>
                    {<ListItemText primary={item.title} />}
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </div>
    </div>
  );
}

export default DashboardDrawer;
