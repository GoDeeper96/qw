import React, { useState } from 'react'
import useThemeTokens from '../../utilities/useThemeTokens'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid';
import { Card, Drawer, Dropdown, message, Modal, Select, Space, Tag } from 'antd';
import { Tooltip as TooltipChakra } from '@chakra-ui/react'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { FunctionOutlined, SettingOutlined } from '@ant-design/icons';
import { TbSum } from "react-icons/tb";
import { ColumnasCubo } from '../../data/EjemploColumnas';
import { OperatorXCols, OperatorXColsVal } from './utilities/OperationXCols';
import { IconButton, Typography } from '@mui/material';
import { DeleteOutline, FilterAltOutlined } from '@mui/icons-material';
import { IoClose } from "react-icons/io5";
import ButtonSecondary from '../../components/ButtonSecondary';
import axios from 'axios';
import { useEffect } from 'react';


const RowsColumnsValues = (props) => {
  const { colorBgLayout,colorTextTertiary } = useThemeTokens()
  const [ModalFiltro,SetModalFiltro] = useState(false)
  const [TipoPanel,SetTipoPanel] = useState('Filas')
  const [MetadataFila,SetMetadataFila] = useState('')
  const [FiltroDeFiltros,SetFiltroDeFiltros] = useState([])
  const [OpcionesFiltros,SetOpcionesFiltros] = useState([])
  const [AnotherData,SetAnotherData] = useState([])
  // console.log(props.PanelColumnas)
  // console.log(props.PanelFilas)
  // console.log(props.PanelValores)
  // console.log(props.PanelFiltros)
  // console.log(props)
  
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));
  const EliminarColumna = (Panel,key)=>{
    console.log(Panel,key)
    if(Panel==='PanelColumnas')
    { 
      const newColumnas = props.PanelColumnas.filter(x=>x!==key)
      props.SetPanelColumnas(newColumnas)
    }
    if(Panel==='PanelFilas')
    {
      const newFilas = props.PanelFilas.filter(x=>x!==key)
      props.SetPanelFilas(newFilas)
    }
    // if(Panel==='PanelFiltros')
    // {

    //   // const newFilas = props.PanelFilas.filter(x=>x!==key)
    //   // props.SetPanelFilas(newFilas)
    // }
    if(Panel==='PanelValores')
    {
      const updatedPanelValores = { ...props.PanelValores };
      delete updatedPanelValores[key]; // Elimina la clave (columna) específica
      props.SetPanelValores(updatedPanelValores);
  
    }
  }
  const EscogerFiltro = (tipo,key)=>{
    console.log(props)
    console.log('hola')
    const seleccionado = props.itemsSelected[0]
    const existeDs = props.SettingsItems.find(x=>x.itemID===seleccionado)
    if(existeDs.dataSourceSettings&&Object.keys(existeDs.dataSourceSettings).length!==0)
    {
      SetMetadataFila(key)
      SetTipoPanel(tipo)
      SetModalFiltro(true)
    }
 
  }

  useEffect(() => {
    if(MetadataFila.length!==0)
    {
      console.log('qdqw')
      GetOptionsFiltroDeFiltros()
    }
  }, [MetadataFila,ModalFiltro])
  
  const handleMenuClick = (e,key)=>{
    const newOperator = e.key
    props.SetPanelValores({
      ...props.PanelValores,  // Mantén los valores existentes
      [key]: {                // Actualiza solo la clave que corresponde al valor (columna)
        ...props.PanelValores[key],  // Mantén el resto de las propiedades de esa clave
        operation: newOperator      // Sobrescribe solo el operador con el nuevo valor
      }
    });
  }
  const AplicarCambiosASettingsDataSource = ()=>{
    const seleccionado = props.itemsSelected[0]
    const existeDs = props.SettingsItems.find(x=>x.itemID===seleccionado)

    if(existeDs.dataSourceSettings&&Object.keys(existeDs.dataSourceSettings).length!==0
    &&MetadataFila.length!==0)
    {
      const existeEnfilterSettings = existeDs.dataSourceSettings.filterSettings
      &&
      existeDs.dataSourceSettings.filterSettings.some(x=>x.name===MetadataFila)
      //ACTUALIZAR
      if(existeEnfilterSettings)
      {
        let nob = {
          name:MetadataFila,
                type:'Include',
                items:FiltroDeFiltros,
                itemsTotal:OpcionesFiltros
        }
        const newArr = existeDs.dataSourceSettings.filterSettings.map(x=>{
          if(x.name===MetadataFila)
          {
            return nob
          }
          else{
            return {...x}
          }
        })
        const actualizar = props.SettingsItems.map(x=>{
          if(x.itemID===seleccionado)
          {
            return {...x,dataSourceSettings:{...x.dataSourceSettings,
              filterSettings:newArr
            }}
          }
          else{
            return {...x}
          }
        })
      
        const actualizar2 = props.items.map(x=>{
            return {...x,dataSourceSettings:actualizar.find(y=>y.itemID===x.i).dataSourceSettings}
        })
       
        props.SetSettingsItems(actualizar)
        props.setItems(actualizar2)
      }
      //AGREGAR
      else{
        const actualizar = props.SettingsItems.map(x=>{
          if(x.itemID===seleccionado)
          {
            return {...x,dataSourceSettings:{...x.dataSourceSettings,
              filterSettings:x.dataSourceSettings.filterSettings&&
              x.dataSourceSettings.filterSettings.length!==0&&
              x.dataSourceSettings.filterSettings.some(x=>x.name!==MetadataFila)?
              [...x.dataSourceSettings.filterSettings,{
                  name:MetadataFila,
                type:'Include',
                items:FiltroDeFiltros,
                itemsTotal:OpcionesFiltros
              }]:[
                {
                  name:MetadataFila,
                  type:'Include',
                  items:FiltroDeFiltros,
                  itemsTotal:OpcionesFiltros
                }
              ]
            }}
          }
          else{
            return {...x}
          }
        })
        console.log(props.items)
        const actualizar2 = props.items.map(x=>{
            return {...x,dataSourceSettings:actualizar.find(y=>y.itemID===x.i).dataSourceSettings}
        })
        console.log(actualizar)
        props.SetSettingsItems(actualizar)
        props.setItems(actualizar2)
      }
    }
  }
  const getOpcionesFx = async()=>{
    try {
      const obj = {Columna:MetadataFila }
      const dataValor = await axios.post(`http://localhost:4000/api/gotdata`,obj)
      console.log(dataValor)
      if(dataValor.status===200)
      {
        console.log(dataValor)
        // SetFiltroDeFiltros(dataValor.data.map(x=>x))
        SetFiltroDeFiltros(dataValor.data.map(x=>({
          label:x,
          value:x
        })))
        SetOpcionesFiltros(dataValor.data.map(x=>({
          label:x,
          value:x
        })))

      }
    } catch (error) {
      message.error(error)
      console.log(error)
      // return []
    }
  }
  const GetOptionsFiltroDeFiltros = async()=>{
    console.log(MetadataFila)
    if(MetadataFila&&MetadataFila.length!==0)
    {
      if(props.itemsSelected.length!==0&&props.SettingsItems.length!==0)
      {
        const seleccionado = props.itemsSelected[0]
        const existeDs = props.SettingsItems.find(x=>x.itemID===seleccionado)
        if(existeDs.dataSourceSettings&&Object.keys(existeDs.dataSourceSettings).length!==0)
        {
          if(
            existeDs.dataSourceSettings.filterSettings)
            {
              if(existeDs.dataSourceSettings.filterSettings.length===0)
              {
                await getOpcionesFx()
              }
              else{
                const existeFiltroEnFilterSettings = existeDs.dataSourceSettings.filterSettings.some(x=>x.name===MetadataFila)
                if(existeFiltroEnFilterSettings)
                {
                  const dt = existeDs.dataSourceSettings.filterSettings.find(x=>x.name===MetadataFila)
                  console.log(dt)
                  SetFiltroDeFiltros(dt.items.map(x=>({
                    label:x,
                    value:x
                  })))
                  SetOpcionesFiltros(dt.itemsTotal)
                }
                else{
                  await getOpcionesFx()
                }
              }
            }
          if(!existeDs.dataSourceSettings.filterSettings)
          {
            await getOpcionesFx()
          }
     
        }
       
      
      }
      
    }
    else{
      SetOpcionesFiltros([])
    }
  }
  const getStateofDropDown = (open,option)=>{
    console.log(open,option)
  }
  // useEffect(() => {
  //   if(props.itemsSelected.length!==0&&props.SettingsItems.length!==0)
  //     {
  //       const seleccionado = props.itemsSelected[0]
  //       const existeDs = props.SettingsItems.find(x=>x.itemID===seleccionado)
  //       if(existeDs.dataSourceSettings&&Object.keys(existeDs.dataSourceSettings).length!==0
  //       &&MetadataFila.length!==0)
  //       {
  //         if(existeDs.dataSourceSettings.filterSettings&&
  //           existeDs.dataSourceSettings.filterSettings.length!==0)
  //           {
  //             const filterSettings = existeDs.dataSourceSettings.filterSettings.find(x=>x.name===MetadataFila)
  //             console.log(filterSettings)
  //             SetFiltroDeFiltros(filterSettings.items.map(x=>({
  //               value:x
  //             })))
  //           }
  //           else{
  //             SetFiltroDeFiltros(AnotherData.find(x=>x.name===MetadataFila).data.map(x=>({
  //               value:x
  //             })))
  //           }
  //       }
  //     }
  // }, [props.itemsSelected])
  
  return (
    <div>
      <Modal
      width={550}
      title={`Filtros de ${TipoPanel}`}
      footer={<></>}
      open={ModalFiltro}

      onCancel={()=>{SetModalFiltro(false)}}
      >
        <Card style={{borderRadius:'3px'}}>
          <Space>
          <p style={{color:'#ababab',fontSize:'15px'}}>Columna:</p>
          <h5 >{MetadataFila}</h5>
          </Space>
         <div className='d-flex justify-content-center mt-2 align-items-center'>
          <p style={{color:'#ababab',fontSize:'14.5px'}}>Incluye:</p>
          <Select
          allowClear
          showSearch
          value={FiltroDeFiltros}
          onChange={(value,option)=>{SetFiltroDeFiltros(value)}}
          options={OpcionesFiltros}
          virtual={true}
          maxTagCount='responsive'
          mode='multiple'
          className='mt-2 mx-2'
          style={{width:'100%'}}
          />
         </div>
      
       
        </Card>
        <div className='d-flex justify-content-center mt-2'>
          <ButtonSecondary style={{width:'40%'}} onClick={AplicarCambiosASettingsDataSource}>
            Aplicar cambios
          </ButtonSecondary>
        </div>
      </Modal>
         {/* FILAS */}
         <p style={{color:'#ababab',fontSize:'14.5px'}}>Panel de Filas</p>
    <div 
    className=' overflow-y-lg-auto mb-4'
      style={{
                  padding:2,
                  borderRadius:1,
                  color: colorTextTertiary,
                  background: colorBgLayout,
                  borderWidth:'1px',
                  borderColor:'#f9e79f', 

                  
                }}
                >
        <Droppable
          droppableId={`${uuidv4()}-PanelFilas`}
          key={`${uuidv4()}-PanelFilas`}
          index={1}
        
          >
             {(provided,snapshot)=>{
                    return(
                      <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                 
                      style={{
                     height:'10rem'
                        
                      }}
                      >
                        {
                          props.PanelFilas.map((item,index)=>{
                            return(
                              <Draggable
                              key={item}
                              draggableId={item}
                              index={index}
                              >
                                {(provided,snapshot)=>{
                                  return(
                                    <Dropdown
                                    // onOpenChange={(open,info)=>getStateofDropDown(open,info)}
                                        menu={{
                                          items:[{
                                            key:'Incluir',
                                            label:'Incluir/Excluir'
                                          }],
                                          onClick:(e)=>{ EscogerFiltro('Filas',item)},
                                        }}
                                        trigger={['contextMenu']}
                                    >
                                    <HtmlTooltip 
                                    // title={`CuboProyeccion-${key}`}
                                    title={
                                      <div>
                                        <div className='row'>
                                        <Space>
                                        <p style={{color:'#b8b8b8'}}>Cubo:</p>
                                        <p style={{
                                          fontSize:'14px',
                                          color:'rgb(13, 65, 120)'
                                        }}>CuboProyeccion</p>
                                        </Space>
                                        </div>
                                        <div className='row'>
                                        <Space>
                                        <p style={{color:'#b8b8b8'}}>Nombre:</p>
                                        <p style={{
                                          fontSize:'14px',
                                               color:'rgb(13, 65, 120)'
                                        }}>{item}</p>
                                        </Space>
                                        </div>
                                        <div className='row'>
                                        <Space>
                                        <p style={{color:'#b8b8b8'}}>Tipo dato:</p>
                                        <p style={{
                                          fontSize:'14px',
                                               color:'rgb(13, 65, 120)'
                                        }}>{OperatorXColsVal(ColumnasCubo,item)}</p>
                                        </Space>
                                        </div>
                                        {/* <Typography color="inherit">Tooltip with HTML</Typography>
                                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                        {"It's very engaging. Right?"} */}
                                      </div>
                                    }
                                    
                                     placement='right'>
                                    <div
                                    className='row gx-0
                                     mx-1 my-1 py-1 text-truncate'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      justifyContent:'start',
                                      padding: 1,
                                      borderRadius:2,
                                      fontSize:'14px',
                                      background:'#FFFFFF',
                                      // color:'#0d4178',
                                      fontWeight:500,
                                      borderWidth:'1px',
                                      borderColor:'#f9e79f',
                                      ...provided.draggableProps.style
                                    }}
                                   >
                                     <div className='col d-flex align-items-center'>
                                      <div className='col-10 text-truncate '>
                                        {item} {/* Aquí se muestra la clave y el valor de 'operation' */}
                                        </div>
                                        {/* <div className='col-2 d-flex justify-content-end'>
                                        <FilterAltOutlined 
                                            onClick={()=>{EscogerFiltro('Filas',item)}}
                                            fontSize='small' style={{color:'#595f6b'}}/>
                                        </div> */}
                                        <div className='col-2'>
                                           
                                            <IoClose style={{
                                              width:'14px',
                                              cursor:'pointer'
                                            }}  color='red' onClick={()=>{EliminarColumna('PanelFilas',item)}}/>
                                       
                                        </div>
                                        </div>

                                    </div>
                                    </HtmlTooltip>
                                    </Dropdown>
                                  )
                                }}
                              </Draggable>
                            )
                          })
                        }
                           {provided.placeholder}
                      </div>
                    )
                  }}
          </Droppable>          
    </div>
    {/* COLUMNAS */}
    <p style={{color:'#ababab',fontSize:'14.5px'}}>Panel de Columnas</p>
    <div
    className=' overflow-y-lg-auto mb-4' style={{
      padding:2,
      borderRadius:4,
      color: colorTextTertiary,
      background: colorBgLayout,
      borderWidth:'1px',
      borderColor:'#e5c9fb', 
     
    }}
    >
    
       
          <Droppable
          droppableId={`${uuidv4()}-PanelColumnas`}
          key={`${uuidv4()}-PanelColumnas`}
          index={1}
        
          >
             {(provided,snapshot)=>{
                    return(
                      <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                 
                      style={{
                        height:'10rem',
                        
                      }}
                      >
                        {
                          props.PanelColumnas.map((item,index)=>{
                            return(
                              <Draggable
                              key={item}
                              draggableId={item}
                              index={index}
                              >
                                {(provided,snapshot)=>{
                                  return(
                                    <Dropdown
                                    // onOpenChange={(open,info)=>getStateofDropDown(open,info)}
                                        menu={{
                                          items:[{
                                            key:'Incluir',
                                            label:'Incluir/Excluir'
                                          }],
                                          onClick:(e)=>{ EscogerFiltro('Filas',item)},
                                        }}
                                        trigger={['contextMenu']}
                                    >
                                    <HtmlTooltip 
                                    // title={`CuboProyeccion-${key}`}
                                    title={
                                      <div>
                                        <div className='row'>
                                        <Space>
                                        <p style={{color:'#b8b8b8'}}>Cubo:</p>
                                        <p style={{
                                          fontSize:'14px',
                                          color:'rgb(13, 65, 120)'
                                        }}>CuboProyeccion</p>
                                        </Space>
                                        </div>
                                        <div className='row'>
                                        <Space>
                                        <p style={{color:'#b8b8b8'}}>Nombre:</p>
                                        <p style={{
                                          fontSize:'14px',
                                               color:'rgb(13, 65, 120)'
                                        }}>{item}</p>
                                        </Space>
                                        </div>
                                        <div className='row'>
                                        <Space>
                                        <p style={{color:'#b8b8b8'}}>Tipo dato:</p>
                                        <p style={{
                                          fontSize:'14px',
                                               color:'rgb(13, 65, 120)'
                                        }}>{OperatorXColsVal(ColumnasCubo,item)}</p>
                                        </Space>
                                        </div>
                                        {/* <Typography color="inherit">Tooltip with HTML</Typography>
                                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                        {"It's very engaging. Right?"} */}
                                      </div>
                                    }
                                    
                                     placement='right'>
                                    <div
                                    className='row gx-0
                                     mx-1 my-1 py-1 text-truncate'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      justifyContent:'start',
                                      padding: 1,
                                      borderRadius:2,
                                      fontSize:'14px',
                                      background:'#FFFFFF',
                                      // color:'#0d4178',
                                      fontWeight:500,
                                      borderWidth:'1px',
                                      borderColor:'#e5c9fb',
                                      ...provided.draggableProps.style
                                    }}
                                   >
                                     
                                      <div className='col d-flex align-items-center'>
                                      <div className='col-10 text-truncate '>
                                        {item} {/* Aquí se muestra la clave y el valor de 'operation' */}
                                        </div>
                                        {/* <div className='d-flex justify-content-end col-4 px-2 py-1 align-items-center'>
                                            <FilterAltOutlined 
                                                onClick={()=>{EscogerFiltro('Columnas',item)}}
                                            fontSize='small' style={{color:'#595f6b'}}/>
                                            <IoClose style={{
                                              width:'14px'
                                            }}  color='red' onClick={()=>{EliminarColumna('PanelFilas',item)}}/>
                                       
                                        </div> */}
                                        {/* <div className='col-2 d-flex justify-content-end'>
                                        <FilterAltOutlined 
                                            onClick={()=>{EscogerFiltro('Filas',item)}}
                                            fontSize='small' style={{color:'#595f6b'}}/>
                                        </div> */}
                                        <div className='col-2 '>
                                           
                                            <IoClose style={{
                                              width:'14px'
                                            }}  color='red' onClick={()=>{EliminarColumna('PanelColumnas',item)}}/>
                                       
                                        </div>
                                        </div>
                                    </div>
                                    </HtmlTooltip>
                                    </Dropdown>
                                  )
                                }}
                              </Draggable>
                            )
                          })
                        }
                           {provided.placeholder}
                      </div>
                    )
                  }}
          </Droppable>
        
      
    </div>
      {/* VALORES */}
    <p style={{color:'#ababab',fontSize:'14.5px'}}>Panel de Valores</p>
    <div
    className='overflow-y-lg-auto mb-4' style={{
      padding:2,
      borderRadius:1,
      color: colorTextTertiary,
      background: colorBgLayout,
      borderWidth:'1px',
                  borderColor:'#c9fbe5', 
    
    }}
    >
       <Droppable
          droppableId={`${uuidv4()}-PanelValores`}
          key={`${uuidv4()}-PanelValores`}
          index={1}
        
          >
             {(provided,snapshot)=>{
                    return(
                      <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                 
                      style={{
                        height:'10rem',
                        
                      }}
                      >
                        {Object.entries(props.PanelValores).map(([key, item], index) => 
                        { return (
                              <Draggable
                                key={key} // Usa la clave del objeto como key
                                draggableId={key}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Dropdown
                                        onOpenChange={(open,info)=>getStateofDropDown(open,info)}
                                        menu={{
                                          items:OperatorXCols(ColumnasCubo,key),
                                          onClick:(e)=>{ handleMenuClick(e,key)},
                                        }}
                                        trigger={['contextMenu']}
                                        
                                      >
                                    <HtmlTooltip 
                                    // title={`CuboProyeccion-${key}`}
                                    title={
                                      <div>
                                        <div className='row'>
                                        <Space>
                                        <p style={{color:'#b8b8b8'}}>Cubo:</p>
                                        <p style={{
                                          fontSize:'14px',
                                          color:'rgb(13, 65, 120)'
                                        }}>CuboProyeccion</p>
                                        </Space>
                                        </div>
                                        <div className='row'>
                                        <Space>
                                        <p style={{color:'#b8b8b8'}}>Nombre:</p>
                                        <p style={{
                                          fontSize:'14px',
                                               color:'rgb(13, 65, 120)'
                                        }}>{key}</p>
                                        </Space>
                                        </div>
                                        <div className='row'>
                                        <Space>
                                        <p style={{color:'#b8b8b8'}}>Tipo dato:</p>
                                        <p style={{
                                          fontSize:'14px',
                                               color:'rgb(13, 65, 120)'
                                        }}>{OperatorXColsVal(ColumnasCubo,key)}</p>
                                        </Space>
                                        </div>
                                        <div className='row'>
                                        <Space>
                                        <p style={{color:'#b8b8b8'}}>Operator:</p>
                                        <p style={{
                                          fontSize:'14px',
                                               color:'rgb(13, 65, 120)'
                                        }}>{item.operation}</p>
                                        </Space>
                                        </div>
                                        {/* <Typography color="inherit">Tooltip with HTML</Typography>
                                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                                        {"It's very engaging. Right?"} */}
                                      </div>
                                    }
                                    
                                     placement='right'>
                                  
                                      <div
                                        className='row gx-0 mx-1 my-1 py-1 '
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          justifyContent: 'start',
                                          padding: 1,
                                          borderRadius: 2,
                                          fontSize: '14px',
                                          background: '#FFFFFF',
                                          fontWeight: 500,
                                          borderWidth: '1px',
                                          borderColor: '#c9fbe5',
                                          ...provided.draggableProps.style
                                        }}
                                      >
                                        <div className='col d-flex align-items-center'>
                                      <div className='col-10 text-truncate '>
                                        {key} - {item.operation} {/* Aquí se muestra la clave y el valor de 'operation' */}
                                        </div>
                                        <div className='col-2'>
                                       
                                            <IoClose   color='red' onClick={()=>{EliminarColumna('PanelValores',key)}}/>
                                       
                                        </div>
                                        </div>
                                      </div>
                                  
                                    </HtmlTooltip>
                                    </Dropdown>
                                  );
                                }}
                              </Draggable>
                            )
                          })}
                           {provided.placeholder}
                      </div>
                    )
                  }}
          </Droppable>
        
    </div>
    </div>
  )
}

export default RowsColumnsValues