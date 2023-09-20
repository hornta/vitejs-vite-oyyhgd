import { type Dispatch, type SetStateAction, createContext } from "react";
import { type usePopover } from "./usePopover.js";

type PopoverMenuContextValue =
  | (ReturnType<typeof usePopover> & {
      setLabelId: Dispatch<SetStateAction<string | undefined>>;
      setDescriptionId: Dispatch<SetStateAction<string | undefined>>;
    })
  | null;

export const PopoverMenuContext = createContext<PopoverMenuContextValue>(
  null as any
);
