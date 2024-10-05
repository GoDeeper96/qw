import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DropDrag = ({
  children,
  className = "layout",
//   rowWidth=400,
  rowHeight = 300,
  onLayoutChange = () => {},
  cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  containerPadding = [0, 0],
}) => {
  const [layouts, setLayouts] = useState({
    lg: children.map((child, i) => ({
      x: (i * 2) % 12,
      y: Math.floor(i / 6) * 2,
      w: 2,
      h: 2,
      i: i.toString(),
      static: true,
    })),
  });

  return (
    <ResponsiveReactGridLayout
      className={className}
    //   rowWidth={rowWidth}
      rowHeight={rowHeight}
      layouts={layouts}
      onLayoutChange={onLayoutChange}
      cols={cols}
      breakpoints={breakpoints}
      containerPadding={containerPadding}
      isDraggable={false}
      isResizable={true} 
    >
      {children}
    </ResponsiveReactGridLayout>
  );
};

export default DropDrag;