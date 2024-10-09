import React, { useState, useEffect,useRef } from "react";
import { PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import './CuboSyncfusion.css';
const NormalCube = (props) => {
    const pivotRef = useRef(null)
  return (
<PivotViewComponent id='PivotView' 
                
                dataSourceSettings={props.dataSourceSettings} 
                  ref={pivotRef}
              height={props.height}
              width={props.width}
                 
                  >
            </PivotViewComponent>
  )
}

export default NormalCube