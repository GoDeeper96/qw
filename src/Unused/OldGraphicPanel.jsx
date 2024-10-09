import React from 'react'

const OldGraphicPanel = () => {
  return (
    <div>
        
    </div>
    // <DragDropContext
    // onDragEnd={result => onDragEndToPanelGrafico(result, Graficos,PanelGraficos,setPanelGraficos, setGraficos,openNotificationWithIcon)}
    // >
  
    //   <div className='col mt-2'>
  
    //   {Object.entries(PanelGraficos).map(([columnId, column],
    //    index) => {
    //     return (
          
            
    //       <div 
       
    //       key={columnId}>
    //           <div style={{ margin: 8 }}>
    //           <Droppable 
    //           droppableId={columnId} 
    //           key={columnId}  
    //           index={index}>
    //             {(provided, snapshot) => {
    //               return (
    //                 <div
    //                   {...provided.droppableProps}
    //                   ref={provided.innerRef}
    //                   style={{
    //                     // background: snapshot.isDraggingOver
    //                     //   ? "#f1f1f1"
    //                     //   : "#dcefff",
    //                     padding: 10,
    //                     width: '100%',
    //                     // minHeight:200,
    //                     // maxHeight: 200,
    //                     borderRadius:2
    //                   }}
    //                   className='h-screen overflow-y-lg-auto'
    //                 >
    //                   {column.items.map((item,index)=>{
    //                     return (<div
    //                         className='col'
    //                       key={index} 
    //                     >
    //                      <CubitoSync  
    //                      loading={loading}
    //                          dataSourceSettings={DatosCalculo}/>
    //                     </div>)
    //                   })}
    //                   {/* <DropDrag>
    //                 {column.items.map((item,index)=>{
    //                   return (
    //                     <div
    //                     // key={item.id}
    //                     key={index} 
    //                     data-grid={
    //                       { 
    //                         // w: 2, 
    //                         // h: 2, 
    //                         // x: index * 2 % 12, 
    //                         // y: 0, 
    //                         w: 5,  // Anchura en columnas
    //                         h: 2,  // Altura en filas
    //                         x: (index % 2) * 5, // Posición horizontal
    //                         y: Math.floor(index / 2) * 2, // Posición vertical
    //                         i: index.toString() 
                          
    //                       }}
    //                     className='col'
    //                     style={{
    //                       userSelect: "none",
    //                       padding: 1,
    //                       margin: 3,
    //                       color: '#0d4178',
    //                     }}
    //                   >
    //                     <CubitoSync />
    //                   </div>
    //                       // <Draggable
    //                       // draggableId={item.id} 
    //                       // key={item.id} 
    //                       // index={index}
    //                       // // data-grid={
    //                       // //   { 
    //                       // //     // w: 2, 
    //                       // //     // h: 2, 
    //                       // //     // x: index * 2 % 12, 
    //                       // //     // y: 0, 
    //                       // //     w: 5,  // Anchura en columnas
    //                       // //     h: 2,  // Altura en filas
    //                       // //     x: (index % 2) * 5, // Posición horizontal
    //                       // //     y: Math.floor(index / 2) * 2, // Posición vertical
    //                       // //     i: index.toString() 
                            
    //                       // //   }}
    //                       //   >
    //                       //     {(provided,snapshot)=>{
    //                       //       return(
                                    
    //                       //         <div
    //                       //         className='col'
    //                       //         ref={provided.innerRef}
    //                       //         {...provided.draggableProps}
    //                       //         {...provided.dragHandleProps}
    //                       //         style={{
    //                       //           userSelect: "none",
    //                       //           padding: 1,
    //                       //           margin:3,
    //                       //           // borderRadius:2,
    //                       //           // fontSize:'14px',
    //                       //           color:'#0d4178',
                                    
    //                       //           // fontWeight:500,
    //                       //           // borderBottomWidth:'0.2px',
    //                       //           // borderColor:'#a8a8a8',
    //                       //           // backgroundColor:'#ffffff',
    //                       //           // backgroundColor: snapshot.isDragging
    //                       //           //   ? "#263B4A"
    //                       //           //   : "black",
    //                       //           // color: "white",
    //                       //           ...provided.draggableProps.style
    //                       //         }}
    //                       //         >
                                  
    //                       //               <CubitoSync />
    //                       //         </div>
    //                       //       )
    //                       //     }}
                          
    //                       // </Draggable>
    //                        )
    //                   })}
    //                </DropDrag> */}
                      
    //                   {provided.placeholder}
    //                 </div>
    //               );
    //             }}
    //           </Droppable>
    //           </div>
    //       </div>
      
    //     );
    //   })}
    //   </div>
      
    //   <div className='col px-0 aling-items-center justify-content-center'
    //   style={{background:'#e8edf7',maxWidth:'14rem',borderLeftWidth:'1px',borderColor:'#adadad'}}
    //   >
    //     <div className='d-flex col aling-items-center justify-content-center mt-2'>
    //       <IconButton style={{padding:'1px',marginRight:'16px'}} >
    //         <FaChartBar size={14}/>
    //       </IconButton>
    //       <TituloBarra1>Galeria</TituloBarra1>
    //       </div>
    //       <p>Integrado</p>
    //       <div 
    //       // className='flex-lg-1 h-screen  overflow-y-lg-auto  ' 
    //       style={{
    //                     background: "#e8edf7",
    //                     padding: 10,
    //                     // width: 'auto',

    //                     // maxHeight:'84vh',
    //                     borderRadius:5
    //                   }}
    //                   >
    //             {Object.entries(Graficos).map(([columnId,column],index)=>{

    //               return(
    //                 <Droppable
    //                 droppableId={columnId} 
    //                 key={columnId}  
    //                 index={index}
    //                 >
    //                   {(provided,snapshot)=>{
    //                     return(
    //                       <div
    //                       className='row row-cols-4 d-flex justify-content-center align-items-center'
    //                       {...provided.droppableProps}
    //                       ref={provided.innerRef}
    //                       style={{
    //                         // background: snapshot.isDraggingOver
    //                         //   ? "#A29D9D"
    //                         //   : "lightgrey",
                           
                          
    //                         borderRadius:2
    //                       }}
              
    //                       >
    //                         {
    //                           column.items.map((item,index)=>{
    //                             return(
    //                               <Draggable
    //                               key={item.id}
    //                               draggableId={item.id}
    //                               index={index}
    //                               >
    //                                 {(provided, snapshot)=>{
    //                                   return(
                                      
    //                                     <div
    //                                     className='col justify-content-center align-items-center d-flex'
    //                                     ref={provided.innerRef}
    //                                     {...provided.draggableProps}
    //                                     {...provided.dragHandleProps}
    //                                     style={{
    //                                       userSelect: "none",
    //                                       padding: 1,
    //                                       margin:3,
    //                                       borderRadius:4,
    //                                       fontSize:'14px',
    //                                       color:'#0d4178',
                                          
    //                                       fontWeight:500,
    //                                       borderBottomWidth:'0.2px',
    //                                       borderColor:'#a8a8a8',
    //                                       backgroundColor:'#ffffff',
    //                                       // backgroundColor: snapshot.isDragging
    //                                       //   ? "#263B4A"
    //                                       //   : "black",
    //                                       // color: "white",
    //                                       ...provided.draggableProps.style
    //                                     }}
    //                                     >

    //                                       {item.icono}
                                    
    //                                     </div>
                                        
    //                                   )
    //                                 }}
    //                               </Draggable>
    //                             )
    //                           })}
    //                           {provided.placeholder}
    //                       </div>
    //                     )
    //                   }}
    //                 </Droppable>
    //               )
    //             })
    //             }

    //       </div>

    //       </div>     
    //       </DragDropContext>
  )
}

export default OldGraphicPanel