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
import Collapse from "@mui/material/Collapse";

function DashboardDrawer({ sidebarItems }) {
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const { user } = useAuthContext();

  if (!user) return null;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    // Implement your logout functionality here
    console.log("Logout");
    // Example: router.push('/login'); // Redirect to login page after logout
  };

  const handleClick = (index) => () => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon color="inherit" fontSize="large" />
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ width: 260 }}
        PaperProps={{
          sx: { bgcolor: 'background.default', color: 'text.primary' }
        }}
      >
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
              backgroundColor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Link href="/">
              <span className="text-lg font-semibold tracking-wide text-slate-800">
                Nuturemite
              </span>
            </Link>
          </Box>
          <List>
            {sidebarItems.map((item, index) => (
              <React.Fragment key={item.title}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={item.items ? "button" : Link}
                    href={item.items ? undefined : item.link}
                    onClick={item.items ? handleClick(index) : undefined}
                  >
                    <ListItemIcon>{<item.icon size={20} />}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
                {item.items && (
                  <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.items.map((subItem) => (
                        <ListItem key={subItem.title} disablePadding>
                          <ListItemButton
                            component={Link}
                            href={subItem.link}
                            sx={{ pl: 4 }}
                          >
                            <ListItemText primary={subItem.title} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
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
  );
}

export default DashboardDrawer;
