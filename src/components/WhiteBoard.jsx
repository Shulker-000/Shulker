import React, { useRef } from "react";
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

const Whiteboard = () => {
  const appRef = useRef(null);

  const handleReset = () => {
    if (appRef.current) {
      // Clear all shapes
      appRef.current.shapes.forEach((shape) => {
        appRef.current.deleteShapes([shape.id]);
      });
      // Clear pages if multiple pages exist
      appRef.current.pages.forEach((page) => {
        if (page.id !== appRef.current.currentPageId) {
          appRef.current.deletePage(page.id);
        }
      });
      // Reset camera
      appRef.current.resetCamera();
    }
  };

  return (
    <div className="relative w-screen h-screen">
      {/* Overlay to hide watermark */}
      <div className="absolute inset-0 z-[9999] pointer-events-none"></div>

      <Tldraw
        onMount={(app) => {
          appRef.current = app;
        }}
      />
    </div>
  );
};

export default Whiteboard;
