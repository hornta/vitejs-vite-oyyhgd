import {
  useMergeRefs,
  useTransitionStyles,
  FloatingPortal,
  FloatingFocusManager,
  FloatingArrow,
} from "@floating-ui/react";
import { forwardRef, type ComponentProps } from "react";
import { usePopoverMenuContext } from "./usePopoverMenuContext.js";

const ARROW_WIDTH = 14;
const ARROW_HEIGHT = 7;

export const PopoverContent = forwardRef<HTMLElement, ComponentProps<"div">>(
  function PopoverContent({ children, style, ...rest }, propRef) {
    const {
      context: floatingContext,
      arrowRef,
      floatingStyles,
      middlewareData,
      getFloatingProps,
      ...context
    } = usePopoverMenuContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);

    const arrowX = middlewareData.arrow?.x ?? 0;
    const arrowY = middlewareData.arrow?.y ?? 0;
    const transformX = arrowX + ARROW_WIDTH / 2;
    const transformY = arrowY + ARROW_HEIGHT;

    const { styles: transitionStyles, isMounted } = useTransitionStyles(
      floatingContext,
      {
        duration: 100,
        initial: {
          opacity: 0,
          transform: "scale(0.95)",
        },
        common: ({ side }) => ({
          transformOrigin: {
            top: `${transformX}px calc(100% + ${ARROW_HEIGHT}px)`,
            bottom: `${transformX}px ${-ARROW_HEIGHT}px`,
            left: `calc(100% + ${ARROW_HEIGHT}px) ${transformY}px`,
            right: `${-ARROW_HEIGHT}px ${transformY}px`,
          }[side],
        }),
      }
    );

    if (!isMounted) return null;

    const floatingProps = getFloatingProps({ className: "z-10", ...rest });

    return (
      <FloatingPortal>
        <FloatingFocusManager context={floatingContext}>
          <div
            ref={ref}
            style={{
              ...floatingStyles,
              ...style,
              zIndex: style?.zIndex ?? 1400,
            }}
            {...floatingProps}
          >
            <div
              style={transitionStyles}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
            >
              {children}
              <FloatingArrow
                ref={arrowRef}
                context={floatingContext}
                width={ARROW_WIDTH}
                height={ARROW_HEIGHT}
                strokeWidth={1}
                tipRadius={1}
                className="fill-white [&>path:first-of-type]:stroke-gray-300"
              />
            </div>
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  }
);
