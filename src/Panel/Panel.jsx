import { SettingOutlined } from '@ant-design/icons'
import { FilterAltOutlined } from '@mui/icons-material'
import { Button, Collapse, Segmented } from 'antd'
import React, { useState } from 'react'
import { PiSquaresFourFill } from 'react-icons/pi'
import TituloSecundario1 from '../components/TituloSecundario1'
import useThemeTokens from '../utilities/useThemeTokens'
import { ExamplePanel } from '../data/ExamplePanel'
import RowsColumnsValues from './RowsColumnsValues/RowsColumnsValues'
import Filters from './Filters/Filters'
import FormatCssCube from './FormatCssCube/FormatCssCube'
import Search from 'antd/es/input/Search'
import { IconButton } from '@mui/material'
import { FaDatabase } from 'react-icons/fa'
import TituloBarra1 from '../components/TituloBarra1'
import { SlOptionsVertical } from 'react-icons/sl'
import { ConjuntoData } from '../data/EjemploConjuntoData'
import ColumnConjuntoData from '../components/ColumnConjuntoData'
import { ColumnasCubo } from '../data/EjemploColumnas'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const SegmentedComponents = ({Componente})=>{
  switch (Componente) {
    case 'Editor':
      return(
       <RowsColumnsValues/> 
      )
    case 'Filtros':
      return(
        <Filters/>
      )
    case 'Formato':
      return(
        <FormatCssCube/>
      )
    default:
     return(
      <RowsColumnsValues/> 
     )
  }
}
const Panel = (props) => {
  const [Columnas,setColumnas] = useState({})
  // const [Graficos,setGraficos] = useState(ExGraficos)
  const [PanelGraficos,setPanelGraficos] = useState([])
  const [DatosCalculo,SetDatosCalculo] = useState([])
  const [PanelFiltros,SetPanelFiltros] = useState({})
  const [PanelColumnas,SetPanelColumnas] = useState({})
  const [ModalLoading,SetModalLoading] = useState(false)
  const [PanelValores,SetPanelValores] = useState({})
  const [PanelFilas,SetPanelFilas] = useState({})
const onDragEnd = (result, 
  Columnas,  
  setColumnas,
  PanelFiltros,
  SetPanelFiltros, 
  openNotificationWithIcon,
  PanelColumnas,
  SetPanelColumnas,
  PanelValores,
  SetPanelValores,
  PanelFilas,
  SetPanelFilas)=>{
    
}

  const handleCollapseChange = (key) => {
    console.log(key)
    // setActiveKey(key); // Guarda el panel activo
  };
  return (

    <DragDropContext
    onDragEnd={result => onDragEnd(
      result, 
      Columnas,  
      setColumnas,
      PanelFiltros,
      SetPanelFiltros, 
      props.openNotificationWithIcon,
      PanelColumnas,
      SetPanelColumnas,
      PanelValores,
      SetPanelValores,
      PanelFilas,
      SetPanelFilas
    )}
    >
      <div className="col-auto px-0" style={{
      maxWidth: '11.5rem',
      height: '100%',
      background: '#FFFFFF',
      borderRight: '1px solid #adadad'
    }}>
         {/* PANEL DE COLUMNAS */}
         {props.HiddenPanelElementosCDatos?
        <div className='d-flex flex-column '  
        // style={{background:'#e8edf7',maxWidth:'11.5rem',
        //   height:`${windowHeight}px`,
        // borderRightWidth:'1px',borderColor:'#adadad'}}
        >
            <div className='d-flex col aling-items-center justify-content-center mt-2'>
            <IconButton style={{padding:'1px',marginRight:'16px'}} >
              <FaDatabase  size={14}/>
            </IconButton>
            <TituloBarra1>CONJUNTO DE DATOS</TituloBarra1>
            <IconButton style={{padding:'1px',marginLeft:'16px'}} >
              <SlOptionsVertical  size={14}/>
            </IconButton>
            </div>
            <div 
            className="flex-grow-1 overflow-auto my-2 py-1" style={{ maxHeight: '90vh', padding:'0px !important' }}
                        >
              <div className='col d-flex justify-content-center'>
              <Search
                placeholder="Buscar"
                size='small'
                style={{
                  borderRadius:'1px',
                  width: '8.5rem',
                }}
              />      
              </div>  
                  
              <Collapse 
              ghost
              // activeKey={activeKey}  // Propiedad para manejar paneles activos
              onChange={handleCollapseChange}
              >                
                {ConjuntoData.map((x,index)=>{
                return(
                  <Collapse.Panel
               
                  header={x.Tabla} key={x.key}>

                    <Droppable
                        droppableId={x.Tabla} 
                        key={x.Tabla}  
                        index={index}
  
                     >
                      {(provided,snapshot)=>{
                        return(
                          <div 
                          className="flex-grow-1 overflow-auto my-2 py-3" style={{ maxHeight:'80vh',background:'#faf9f9',borderTopWidth:'0.2px',borderBottomWidth:'0.2px' }}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                                     
                                     >
                                    {
                                      ColumnasCubo.filter(y=>y.Tabla===x.Tabla).map((z,index)=>{
                                        return(
                                          <Draggable
                                          key={z.name}
                                          draggableId={z.name}
                                          index={index}
                                          >
                                          {(provided,snapshot)=>{
                                            return(
                                            <div className='row gx-0 mx-2 my-1 text-truncate'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={
                                              {
                                                userSelect: "none",
                                                justifyContent:'start',
                                                padding: 1,
                                                borderRadius:2,
                                                fontSize:'14px',
                                                background:'#FFFFFF',
                                                // color:'#0d4178',
                                                fontWeight:500,
                                                borderWidth:'1px',
                                                borderColor:'#CACACA',
                                                ...provided.draggableProps.style
                                              }
                                            }
                                            >
                                              {z.label}

                                        
                                                 </div>)
                                          }}
                                          
                                    </Draggable>
                                        )
                                      })
                                    }
                             
                                </div>
                        )
                      }}
               
                  </Droppable>
                  </Collapse.Panel>
                )
              })}
              </Collapse>
          
            
            </div>
            <div 
            className="flex-grow-1 overflow-auto my-5 py-2" style={{ height: '70vh' }}
                        >
            </div>
           
        </div>:null}
        </div>
    <div className='col '
    style={{background:'#FFFFFF',maxWidth:'13rem',borderRightWidth:'1px',borderColor:'#adadad'}}
   >
   
    <div className='row'>
            <div className='col d-flex justify-content-center'>
            <Segmented 
            value={props.valueSegmentedfx1}
            onChange={(value)=>props.setValuevalueSegmentedfx1(value)}
             options={ExamplePanel}
            />
            </div>
            </div>
            <div className='row'>
              <div className='col'>
              <TituloSecundario1>Nombre cubo</TituloSecundario1>
              
              </div>
            </div>
            <div className='row'>
              <div className='col'>
              <TituloSecundario1>barra herramientas cubo</TituloSecundario1>
              
              </div>
            </div>
            <div className='row'>
            </div>
            <SegmentedComponents Componente={props.valueSegmentedfx1}/>
            
   </div>
   </DragDropContext>
 
  )
}

export default Panel