import { type Placement, type UseRoleProps } from "@floating-ui/react";
import { clsx } from "clsx";
import { type ReactNode } from "react";
import { PopoverMenuContext } from "./PopoverContext";
import { usePopover } from "./usePopover.js";
import { PopoverContent } from "./PopoverContent.js";
import { PopoverTrigger } from "./PopoverTrigger.js";

interface ContentContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

const ContentContainer = ({
  children,
  className,
  ...rest
}: ContentContainerProps) => (
  <div
    {...rest}
    className={clsx(
      "bg-white rounded-[8px] shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.05),0px_12px_16px_-4px_rgba(16,24,40,0.1)] border border-gray-300",
      className
    )}
  >
    {children}
  </div>
);

interface PopoverProps {
  children: ReactNode;
  placement?: Placement;
  open?: boolean;
  setOpen?: (open: boolean, event?: Event) => void;
  role?: UseRoleProps["role"];
}

export const Popover = ({
  children,
  placement,
  role: ariaRole = "menu",
  open: controlledOpen,
  setOpen: controlledSetOpen,
}: PopoverProps) => {
  const context = usePopover({
    placement,
    controlledOpen,
    controlledSetOpen,
    ariaRole,
  });

  return (
    <PopoverMenuContext.Provider value={context}>
      {children}
    </PopoverMenuContext.Provider>
  );
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.ContentContainer = ContentContainer;
