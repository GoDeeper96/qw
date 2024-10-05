import React, { useState, useEffect,useRef } from "react";
import { PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import './CuboSyncfusion.css';
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Spin } from "antd";


const ResponsiveReactGridLayout = WidthProvider(Responsive);


const CubitoSync = (props) =>{
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const pivotRef = useRef(null)

  const layout = [
    { i: 'pivot', x: 0, y: 0, w: 12, h: 8, minW: 6, minH: 4 }
  ]

  useEffect(() => {
    if (pivotRef.current) {
      pivotRef.current.refresh()
    }
  }, [dimensions])

  const onLayoutChange = (layout, layouts) => {
    const pivotLayout = layout.find(l => l.i === 'pivot')
    if (pivotLayout) {
      setDimensions({
        width: pivotLayout.w * 100, // Assuming 100px per unit width
        height: pivotLayout.h * 50, // Assuming 50px per unit height
      })
    }
  }
    return (
        
      <ResponsiveReactGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
      >
       
        <div key="pivot" className="border border-gray-300 rounded shadow-sm overflow-hidden">
          <div>
            {props.loading?
            <Spin/>:
                <PivotViewComponent id='PivotView' 
                
              dataSourceSettings={props.dataSourceSettings} 
              
                ref={pivotRef}
            height={`${dimensions.height}px`}
            width="100%"
               
                >
                </PivotViewComponent>}
                </div>
                </div>
        </ResponsiveReactGridLayout>
   
           );
}
export default CubitoSync;
