import { useContext } from "react";
import { PopoverMenuContext } from "./PopoverContext";

export const usePopoverMenuContext = () => {
  const context = useContext(PopoverMenuContext);

  if (context == null) {
    throw new Error("Popover components must be wrapped in <PopoverMenu />");
  }

  return context;
};
