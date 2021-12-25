import { Drawer } from "@mui/material";
import React from "react";

interface IDrawer {
  children: any;
  open: boolean;
  toggle: (open: boolean) => void;
}

const DrawerComponent = (props: IDrawer) => {
  const { open, toggle, children } = props;

  return (
    <Drawer anchor="left" open={open} onClose={toggle}>
      {children}
    </Drawer>
  );
};

export default DrawerComponent;
