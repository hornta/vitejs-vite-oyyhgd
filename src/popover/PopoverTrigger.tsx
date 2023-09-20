import { useMergeRefs } from "@floating-ui/react";
import {
  type ReactNode,
  forwardRef,
  type HTMLProps,
  isValidElement,
  cloneElement,
} from "react";
import { usePopoverMenuContext } from "./usePopoverMenuContext.js";

interface TriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export const PopoverTrigger = forwardRef<
  HTMLElement,
  TriggerProps & HTMLProps<HTMLElement>
>(function PopoverTrigger({ children, asChild, ...props }, propRef) {
  const context = usePopoverMenuContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed",
      })
    );
  }
  return (
    <button
      ref={ref}
      type="button"
      data-state={context.open ? "open" : "closed"}
      className="cursor-pointer"
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});
