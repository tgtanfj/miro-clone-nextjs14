"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useSelf, useStorage } from "@/liveblocks.config";
import { LayerType, Side, XYWH } from "@/types/canvas";
import { memo } from "react";

interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
}

const HANDLE_WIDTH = 8;

const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    );

    const bounds = useSelectionBounds();

    if (!bounds) {
      return null;
    }

    return (
      <>
        <rect
          className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
          style={{ transform: `translate(${bounds.x}px, ${bounds.y}px)` }}
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.height}
        />
        {isShowingHandles && (
          <>
            <rect
              className="fill-white stroke-1 stroke-blue-500 hover:cursor-nw-resize"
              x={0}
              y={0}
              style={{
                color: `nwse-resize`,
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${
                  bounds.y - HANDLE_WIDTH / 2
                }px)`,
              }}
              onPointerDown={(e) => {
                onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
                e.stopPropagation();
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 hover:cursor-n-resize"
              x={0}
              y={0}
              style={{
                color: `ns-resize`,
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2
                }px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                onResizeHandlePointerDown(Side.Top, bounds);
                e.stopPropagation();
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 hover:cursor-sw-resize"
              x={0}
              y={0}
              style={{
                color: `nesw-resize`,
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x - HANDLE_WIDTH / 2 + bounds.width
                }px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
                e.stopPropagation();
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 hover:cursor-ew-resize"
              x={0}
              y={0}
              style={{
                color: `ew-resize`,
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x - HANDLE_WIDTH / 2 + bounds.width
                }px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
              }}
              onPointerDown={(e) => {
                onResizeHandlePointerDown(Side.Right, bounds);
                e.stopPropagation();
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 hover:cursor-nwse-resize"
              x={0}
              y={0}
              style={{
                color: `nwse-resize`,
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x - HANDLE_WIDTH / 2 + bounds.width
                }px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
              }}
              onPointerDown={(e) => {
                onResizeHandlePointerDown(Side.Right + Side.Bottom, bounds);
                e.stopPropagation();
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 hover:cursor-ns-resize"
              x={0}
              y={0}
              style={{
                color: `ns-resize`,
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${
                  bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2
                }px, ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)`,
              }}
              onPointerDown={(e) => {
                onResizeHandlePointerDown(Side.Bottom, bounds);
                e.stopPropagation();
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 hover:cursor-nesw-resize"
              x={0}
              y={0}
              style={{
                color: `nesw-resize`,
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${
                  bounds.y - HANDLE_WIDTH / 2 + bounds.height
                }px)`,
              }}
              onPointerDown={(e) => {
                onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
                e.stopPropagation();
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500 hover:cursor-ew-resize"
              x={0}
              y={0}
              style={{
                color: `ew-resize`,
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${
                  bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2
                }px)`,
              }}
              onPointerDown={(e) => {
                onResizeHandlePointerDown(Side.Left, bounds);
                e.stopPropagation();
              }}
            />
          </>
        )}
      </>
    );
  }
);

export default SelectionBox;

SelectionBox.displayName = "SelectionBox";
