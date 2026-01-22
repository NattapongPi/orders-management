import { Box } from "@mui/material";
import SideMenu from "./SideMenu";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  const drawerWidth = 240;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: "100vh",
            bgcolor: "#f5f5f5",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
