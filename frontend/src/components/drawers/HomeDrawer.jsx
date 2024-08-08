import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ShopIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WishlistIcon from "@mui/icons-material/Favorite";
import OrdersIcon from "@mui/icons-material/Receipt";
import AddressIcon from "@mui/icons-material/LocationOn";
import CartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { ToggleButton } from "@mui/material";
import { useAuthContext } from "@/context/authprovider";

// Define menu items
const sections = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "Shop", icon: <ShopIcon />, path: "/shop" },
];

const accountItems = [
  { text: "Account", icon: <AccountCircleIcon />, path: "/account" },
  { text: "Wishlist", icon: <WishlistIcon />, path: "/wishlist" },
  { text: "Orders", icon: <OrdersIcon />, path: "/orders" },
  { text: "Address", icon: <AddressIcon />, path: "/address" },
];

const cartItem = { text: "Cart", icon: <CartIcon />, path: "/cart" };

export default function HomeDrawer() {
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated, logout } = useAuthContext();

  const toggleDrawer = newOpen => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const renderListItems = items =>
    items.map(({ text, icon, path }) => (
      <ListItem key={text} disablePadding>
        <ListItemButton component={Link} href={path}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    ));

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon color="inherit" fontSize="large" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>{renderListItems(sections)}</List>
          <Divider />
          <List>{renderListItems(accountItems)}</List>
          <Divider />
          <List>{renderListItems([cartItem])}</List>
          <Divider />
          <List>
            {!isAuthenticated ? (
              <ListItem disablePadding>
                <ListItemButton component={Link} href="/login">
                  <ListItemIcon>{<AccountCircleIcon />}</ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>{<AccountCircleIcon />}</ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
