import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  type Placement,
  type UseRoleProps,
  arrow,
} from "@floating-ui/react";
import { useState, useMemo, useRef } from "react";

export const usePopover = ({
  controlledOpen,
  controlledSetOpen,
  placement = "bottom",
  ariaRole,
}: {
  controlledOpen?: boolean;
  controlledSetOpen?: (open: boolean) => void;
  placement?: Placement;
  ariaRole?: UseRoleProps["role"];
}) => {
  const [unControlledOpen, unControlledSetOpen] = useState(false);
  const [labelId, setLabelId] = useState<string | undefined>(undefined);
  const [descriptionId, setDescriptionId] = useState<string | undefined>(
    undefined
  );
  const arrowRef = useRef(null);

  const isControlled =
    typeof controlledOpen === "boolean" &&
    typeof controlledSetOpen === "function";
  const open = isControlled ? controlledOpen : unControlledOpen;
  const setOpen = isControlled ? controlledSetOpen : unControlledSetOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "end",
        padding: 4,
      }),
      shift({ padding: 4 }),
      arrow({ element: arrowRef, padding: 10 }),
    ],
  });

  const click = useClick(data.context, {
    enabled: true,
    keyboardHandlers: false,
  });
  const dismiss = useDismiss(data.context);
  const role = useRole(data.context, {
    role: ariaRole,
  });

  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      ...interactions,
      ...data,
      isControlled,
      open,
      setOpen,
      labelId,
      setLabelId,
      descriptionId,
      setDescriptionId,
      arrowRef,
    }),
    [
      isControlled,
      open,
      setOpen,
      interactions,
      data,
      labelId,
      setLabelId,
      descriptionId,
      setDescriptionId,
    ]
  );
};
