import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

export interface ITrailer {
  open: boolean;
  children: React.ReactNode;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ModalTrailer = (props: ITrailer) => {
  return (
    <Dialog
      open={props.open}
      maxWidth={"lg"}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="dialog-slide-trailer"
    >
      {props.children}
    </Dialog>
  );
};

export default ModalTrailer;
