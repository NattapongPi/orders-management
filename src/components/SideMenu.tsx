import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";

export default function SideMenu() {
  const location = useLocation();

  const drawerWidth = 240;

  const menuItems = [
    { text: "Orders", path: "/" },
    { text: "Product", path: "/product" },
    { text: "Order Type", path: "/price-tier" },
    { text: "Customer", path: "/customer" },
    { text: "Warehouse", path: "/warehouse" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                // แถม: ใส่ sx เพื่อไฮไลท์เวลาเมาส์วาง
                sx={{
                  "&:hover": {
                    bgcolor: "primary.light",
                    color: "white",
                  },
                }}
                selected={location.pathname === item.path}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
}
