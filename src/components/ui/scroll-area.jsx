"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

function ScrollArea({ className, children, showOverflowHint = true, showBottomHint = true, showTopHint = true, viewportRef: externalViewportRef = null, ...props }) {
  const internalViewportRef = React.useRef(null);
  const viewportRef = externalViewportRef || internalViewportRef;
  const [hasOverflow, setHasOverflow] = React.useState(false);
  const [atBottom, setAtBottom] = React.useState(true);
  const [atTop, setAtTop] = React.useState(true);

  const recalc = React.useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const { scrollHeight, clientHeight, scrollTop } = vp;
    const overflow = scrollHeight > clientHeight + 1; // tolerance
    setHasOverflow(overflow);
    if (!overflow) {
      setAtBottom(true);
      setAtTop(true);
    } else {
      const maxTop = scrollHeight - clientHeight - 1; // tolerance
      setAtBottom(scrollTop >= maxTop);
      setAtTop(scrollTop <= 1);
    }
  }, []);

  React.useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    recalc();
    const onScroll = () => recalc();
    vp.addEventListener("scroll", onScroll, { passive: true });

    // Observe size/content changes
    const ro = new ResizeObserver(() => recalc());
    ro.observe(vp);
    return () => {
      vp.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [recalc]);

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
        style={{ scrollbarGutter: "stable both-edges" }}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      {/* Top and Bottom fade hints when content overflows */}
  {showOverflowHint && showTopHint && hasOverflow && !atTop && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-8 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.98), rgba(255,255,255,0))",
          }}
        />
      )}
  {showOverflowHint && showBottomHint && hasOverflow && !atBottom && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-8 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,0.98), rgba(255,255,255,0))",
          }}
        />
      )}

      <ScrollBar />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({ className, orientation = "vertical", ...props }) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "absolute flex touch-none p-px transition-colors select-none bg-transparent",
        orientation === "vertical" && "right-0 top-0 bottom-0 h-full w-2.5",
        orientation === "horizontal" && "h-2.5 flex-col",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full"
        style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
