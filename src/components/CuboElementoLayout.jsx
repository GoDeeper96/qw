import React, { useRef,useEffect,useState } from 'react'
import { PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import { IconButton } from '@mui/material';
import { MdOutlineDragIndicator } from "react-icons/md";
import { CgDuplicate } from "react-icons/cg";
import { SlOptionsVertical } from "react-icons/sl";
import { IoArrowUndoSharp, IoClose } from "react-icons/io5";
import { Input } from 'antd';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const defaultCols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
const rowHeight = 100;
const CuboElementoLayout = (props) => {
    const refsArray = useRef([]);
    const refsArray2 = useRef(null);
    const [newCounter, setNewCounter] = useState(0);
    const [cols, setCols] = useState(defaultCols);
    const [items, setItems] = useState(
        [0, 1, 2, 3, 4].map((i, key, list) => ({
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 4,
          h: 4,
          
          minW:  4, 
          minH:  4 ,
          add: i === list.length - 1,
        }))
      );
      const onRemoveItem = (i) => {
        console.log("removing", i);
        setItems(items.filter(item => item.i !== i));
      };
      const onBreakpointChange = (breakpoint, cols) => {
        console.log(cols)
        setCols(cols);
      };
      const onAddItem = () => {
        console.log("adding", "n" + newCounter);
        setItems([
          ...items,
          {
            i: "n" + newCounter,
            x: (items.length * 2) % (cols || 12),
            y: Infinity, // lo pone al final
            w: 4,
            h: 4,
            
            minW:  4, 
            minH:  4 ,
            
          }
        ]);
      setNewCounter(newCounter + 1); // Aumenta el contador
      };
    const onLayoutChange = (newLayout) => {
        // console.log(newLayout);
      
        // Actualiza el estado de items con los nuevos valores del layout
        const updatedItems = items.map(item => {
          const layoutItem = newLayout.find(l => l.i === item.i);
          return layoutItem
            ? {
                ...item,
                x: layoutItem.x,
                y: layoutItem.y,
                w: layoutItem.w,
                h: layoutItem.h,
              }
            : item; // Si no encuentra el item en el layout, deja el item sin cambios
        });
        if(refsArray2.current)
        {
        console.log(refsArray2.current.state.width)
        }
        setItems(updatedItems);  // Actualiza los items con los nuevos valores
       
      };
     
      
     console.log(1070/cols*4)
    return (
        <ResponsiveReactGridLayout
        draggableHandle=".react-grid-dragHandleExample"
   onLayoutChange={onLayoutChange}
   onBreakpointChange={onBreakpointChange}
        ref={refsArray2}
   className="layout"
   cols={defaultCols}
   rowHeight={rowHeight}
  >
    {items.map((el, index) =>
    {
        return (<div key={el.i} data-grid={el} 
            style={{borderWidth:'1px'}}
            ref={(ref) => refsArray.current[index] = ref}
            className='col'
            >
              
            <div className='row gx-0'>
              <div className='d-flex justify-content-between my-1'>
              <IconButton size='small'  className='react-grid-dragHandleExample'>
                <MdOutlineDragIndicator/>
              </IconButton>
                
                <IconButton
                size='small' 
                  className="add text"
                  onClick={onAddItem}
                 
                >
                  
                  <CgDuplicate />
          
                </IconButton>
        
              
              
              <Input className='mx-2' placeholder="Filled" variant="filled" />
              <IconButton size='small' >
                <SlOptionsVertical/>
              </IconButton>
              <IconButton size='small'   className="remove" onClick={() => onRemoveItem(el.i)}>
                <IoClose/>
              </IconButton>
              </div>
              </div>
            
             <div className='row gx-0 px-2'>
                
              <PivotViewComponent 
                  id='PivotView' 
               
                  dataSourceSettings={props.DatosCalculo} 
                  height={`${((el.h) * 100)}px`}  // Aplica la altura calculada
                  width={`${el.w * cols}px`}  
              />
        
              </div>
            </div>)
    }
    )}
    
    </ResponsiveReactGridLayout>
  )
}

export default CuboElementoLayout