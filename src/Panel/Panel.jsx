import { SettingOutlined } from '@ant-design/icons'
import { FilterAltOutlined } from '@mui/icons-material'
import { Button, Collapse, Dropdown, message, Segmented, Space, Spin, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { PiSquaresFourFill } from 'react-icons/pi'
import TituloSecundario1 from '../components/TituloSecundario1'
import useThemeTokens from '../utilities/useThemeTokens'
import { ExamplePanel } from '../data/ExamplePanel'
import RowsColumnsValues from './RowsColumnsValues/RowsColumnsValues'
import Filters from './Filters/Filters'
import FormatCssCube from './FormatCssCube/FormatCssCube'
import Search from 'antd/es/input/Search'
import { v4 as uuidv4 } from 'uuid';

import { IconButton } from '@mui/material'
import { FaDatabase } from 'react-icons/fa'
import TituloBarra1 from '../components/TituloBarra1'
import { SlOptionsVertical } from 'react-icons/sl'
import { ConjuntoData } from '../data/EjemploConjuntoData'
import ColumnConjuntoData from '../components/ColumnConjuntoData'
import { ColumnasCubo } from '../data/EjemploColumnas'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPeriodo } from '../redux/slices/Periodo'
import axios from 'axios'
import ButtonPrincipalTradde from '../components/ButtonPrincipal'
import ButtonCancel from '../components/ButtonCancel'
import ButtonSecondary from '../components/ButtonSecondary'
import ButtonPrincipalNoChildren from '../components/ButtonPrincipalNoChildren'

const SegmentedComponents = ({Componente,
  SetPanelValores,PanelFilas,PanelColumnas,
  PanelValores,PanelFiltros,SetPanelColumnas,SetPanelFilas,
  SetPanelFiltros,FilteredFilters,SetFilteredFilters
  ,setItems,items,itemsSelected,SettingsItems,SetSettingsItems

})=>{
  switch (Componente) {
    case 'Editor':
      return(
       <RowsColumnsValues 
       setItems={setItems}
       items={items}
       itemsSelected={itemsSelected}
       SettingsItems={SettingsItems}
       SetSettingsItems={SetSettingsItems}  
       PanelFilas={PanelFilas}
       SetPanelValores={SetPanelValores}
       PanelColumnas={PanelColumnas}
       SetPanelColumnas={SetPanelColumnas}
       PanelValores={PanelValores}
       PanelFiltros={PanelFiltros}
       SetPanelFiltros={SetPanelFiltros}
       SetPanelFilas={SetPanelFilas}
       /> 
      )
    case 'Filtros':
      return(
        <Filters
        FilteredFilters={FilteredFilters}
        SetFilteredFilters={SetFilteredFilters}
        PanelFilas={PanelFilas}
        SetPanelValores={SetPanelValores}
        PanelColumnas={PanelColumnas}
        SetPanelColumnas={SetPanelColumnas}
        PanelValores={PanelValores}
        PanelFiltros={PanelFiltros}
        SetPanelFiltros={SetPanelFiltros}
        SetPanelFilas={SetPanelFilas}
        />
      )
    case 'Formato':
      return(
        <FormatCssCube
        setItems={setItems}
        items={items}
        itemsSelected={itemsSelected}
        SettingsItems={SettingsItems}
        SetSettingsItems={SetSettingsItems}  
        PanelValores={PanelValores}
        />
      )
    default:
     return(
      <RowsColumnsValues
      PanelFilas={PanelFilas}
      SetPanelValores={SetPanelValores}
      PanelColumnas={PanelColumnas}
      SetPanelColumnas={SetPanelColumnas}
      PanelValores={PanelValores}
      PanelFiltros={PanelFiltros}
      SetPanelFiltros={SetPanelFiltros}
      SetPanelFilas={SetPanelFilas}
      /> 
     )
  }
}
const Panel = (props) => {
  const { colorBgLayout,colorTextTertiary } = useThemeTokens()
  const [Columnas,setColumnas] = useState({})

  const [spinning, setSpinning] = useState(false);
  const [spinning2, setSpinning2] = useState(false);

  const [percent, setPercent] = useState(0); // Estado del porcentaje de carga
  const [cancelToken, setCancelToken] = useState(null); // Para almacenar el token de cancelación



  // const [Graficos,setGraficos] = useState(ExGraficos)
  const [PanelGraficos,setPanelGraficos] = useState([])
  const [DatosCalculo,SetDatosCalculo] = useState([])
  const [PanelFiltros,SetPanelFiltros] = useState({})
  const [PanelColumnas,SetPanelColumnas] = useState([])
  const [ModalLoading,SetModalLoading] = useState(false)
  const [PanelValores,SetPanelValores] = useState({})
  
  const [PanelFilas,SetPanelFilas] = useState([])
  const [FilteredFilters,SetFilteredFilters] = useState({})
  const Involucion = async(FiltroNombreColumna)=>{
    try {
      const data = await axios.get(`http://localhost:4000/api/get${FiltroNombreColumna}`)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    console.log(props.SettingsItems)
    if(props.itemsSelected.length!==0&&props.SettingsItems.length!==0)
    {
      // console.log(props.itemsSelected)
      // console.log(props.items)
      // console.log(props.SettingsItems)
      // console.log(props.itemsSelected[0])
      // console.log(props.SettingsItems.find(x=>x.itemID===props.itemsSelected[0]))
      const data = 
      props.SettingsItems.find(x=>x.itemID===props.itemsSelected[0]).dataSourceSettings?props.SettingsItems.find(x=>x.itemID===props.itemsSelected[0]).dataSourceSettings:{}
      // console.log(data)
      // console.log(data.length)
      if(Object.keys(data).length!==0)
      {
        console.log('QUEPASA?')
        SetPanelFilas(data.Filas)
        SetPanelColumnas(data.Columnas)
        SetPanelValores(data.Valores)
        SetPanelFiltros(data.Filtros)
        SetFilteredFilters(data.PanelFiltros)
      }
      else{
        SetPanelFilas([])
        SetPanelColumnas([])
        SetPanelValores({})
        SetPanelFiltros({})
        SetFilteredFilters({})
      }
    }
    else{
      SetPanelFilas([])
      SetPanelColumnas([])
      SetPanelValores({})
      SetPanelFiltros({})
      SetFilteredFilters({})
    }
   
  }, [props.itemsSelected])
  
const onDragEnd = async(result, 
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
  SetPanelFilas,
  FilteredFilters,
  SetFilteredFilters
)=>{
    console.log(result)
    console.log(PanelFilas)
     // dropped nowhere
     if (!result.destination) {
      message.error('Destino invalido')
      return;
    }
    if (!result.destination.droppableId&&!result.source.droppableId) {
      message.error('Destino invalido')
      return;
    }
    if(result.source.droppableId!=='CuboProyeccion')
    {
      return;
    }
    const source = result.source;
    const destination = result.destination;
    const PanelColumnasActual = destination.droppableId.includes('PanelColumnas') && !source.droppableId.includes('PanelColumnas')
    const PanelFilasActual = destination.droppableId.includes('PanelFilas') && !source.droppableId.includes('PanelFilas')
    const PanelValoresActual = destination.droppableId.includes('PanelValores') && !source.droppableId.includes('PanelValores')
    const PanelFiltrosActual = destination.droppableId.includes('PanelFiltros') && !source.droppableId.includes('PanelFiltros')
    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      message.error('Destino invalido')
      return;
    }
    let valor =  result.draggableId.substring(0,result.draggableId.indexOf('-'))
    if(PanelColumnasActual)
    {
      // const valor =  result.draggableId.substring(0,result.draggableId.indexOf('-'))
      const ExistenciaEnPanelColumnasOPanelFilas = 
      PanelColumnas.some(x=>x===valor)||
      PanelFilas.some(x=>x===valor)
      if(ExistenciaEnPanelColumnasOPanelFilas)
      {
        message.error('Columna se repite en panel de filas o panel de columnas.')
        return;
      }
      SetPanelColumnas([
        ...PanelColumnas,
        valor
      ])
    }
    if(PanelFilasActual)
    {
      // const valor =  result.draggableId.substring(0,result.draggableId.indexOf('-'))
      const ExistenciaEnPanelColumnasOPanelFilas = 
      PanelColumnas.some(x=>x===valor)||
      PanelFilas.some(x=>x===valor)
      if(ExistenciaEnPanelColumnasOPanelFilas)
        {
          message.error('Columna se repite en panel de filas o panel de columnas.')
          return;
        }
      SetPanelFilas([
        ...PanelFilas,
        valor
      ])
    }
    if(PanelValoresActual)
    {
      const ExistenciaEnPanelColumnasOPanelFilas = 
      PanelColumnas.some(x=>x===valor)||
      PanelFilas.some(x=>x===valor)||
      PanelValores[valor]; 
      if(ExistenciaEnPanelColumnasOPanelFilas)
      {
        message.error('Columna se repite en algun panel.')
        return;
      }
      const Opera = ColumnasCubo.find(x=>x.name===valor)
      let Operador = 'SUM'
      let distinct = false
      if(Opera.TipoDato==='String')
      {
        Operador = 'COUNT'
      }
      if(Opera.TipoDato==='Date')
        {
          message.error('Columna tipo DATE no es valido para este tipo de panel.')
          return;
        }
        
        SetPanelValores({
          ...PanelValores, // Mantiene los valores actuales
          [valor]: {      // `valor` es el nombre de la columna, en este caso sería 'COBERTURA'
            operation: Operador,  // Define la operación que quieres aplicar
            distinct: distinct       // Define si es `distinct` o no
          }
        });
    }
    if(PanelFiltrosActual)
    {
      const existeEnObjetos = !!PanelFiltros[valor]

      if(existeEnObjetos)
      {
        message.error('Columna repetida')
        return 
      }
      try {
        setSpinning2(true)
        const obj = {Columna:valor }
        const dataValor = await axios.post(`http://localhost:4000/api/gotdata`,obj)
        if(dataValor.status===200)
        {
          SetPanelFiltros((prevState) => ({
            ...prevState,
            [valor]: { $in: dataValor.data||[] },  // Clave dinámica
          }));  
          
          
          SetFilteredFilters((prevState) => ({
            ...prevState,
            [valor]: { $in: dataValor.data||[] },  // Clave dinámica
          }));  
          setSpinning2(false)
        }
        
      } catch (error) {
        setSpinning2(false)
        message.error('Ocurrio un error al enviar informacion al servidor.')
        return 
      }

    }
}
const TipoDatoPorColor = (Tdato)=>{
  if(Tdato==='String')
  {
    return '#5d6d7e'
  }
  if(Tdato==='Date')
  {
    return '#cea302' 
  }
  if(Tdato==='Number')
  {
    return '#2ecc71'
  }
  
}
const AplicarNuevaConfiguracion= (e)=>{
  // console.log(e)
  // console.log(props.itemsSelected)
  const seleccionado = props.itemsSelected[0]
  const todo = props.SettingsItems.find(x=>x.itemID===seleccionado)
  if(todo.dataSourceSettings&&Object.keys(todo.dataSourceSettings).length!==0)
  {
    const DataSourceSettingsParaTodos = todo.dataSourceSettings
    const SettingsActualizado = props.SettingsItems.map(x=>{
      return {...x,dataSourceSettings:DataSourceSettingsParaTodos}
    })
    const ItemsActualizado = props.items.map(x=>
    {
      return {...x,dataSourceSettings:DataSourceSettingsParaTodos}
    }
    )
    props.SetSettingsItems(SettingsActualizado)
    props.setItems(ItemsActualizado);
  }
}
const FuncionImportante = async()=>{


    if(PanelColumnas.length!==0&&
      PanelFilas.length!==0&&
      Object.keys(PanelValores).length!==0&&
      Object.keys(FilteredFilters).length!==0)
      {
        setSpinning(true);

        const source = axios.CancelToken.source();
        setCancelToken(source);
    try {
      console.log('sale')
      console.log(FilteredFilters)
      console.log(PanelColumnas,PanelFilas,PanelValores,FilteredFilters)
      const objvacio = {
        Filas:PanelFilas,
        Columnas:PanelColumnas,
        Valores:PanelValores ,
        Filtros:FilteredFilters,
        PanelFiltros:PanelFiltros
      }
      const response = await axios.post(
        'http://localhost:4000/api/calcularcubo', // Reemplazar con la URL de la API
        objvacio, // Datos del POST
        {
          cancelToken: source.token, // Asociar el token para poder cancelar
          // onUploadProgress: (progressEvent) => {
          //   // Calcular el porcentaje de progreso
          //   const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          //   setPercent(progress);
          // },
        }
      );
      // message.success('Solicitud exitosa!');
      // props.SetDatosCalculo(response.data.pivotDataSource)
      // console.log({
      //   ...response.data.pivotDataSource,
      //   Filas:PanelFilas,
      //   Columnas:PanelColumnas,
      //   Valores:PanelValores,
      //   Filtros:FilteredFilters
      // })
      const selectedDataSourceSettings = {
        ...response.data.pivotDataSource,
        Filas:PanelFilas,
        Columnas:PanelColumnas,
        Valores:PanelValores,
        Filtros:PanelFiltros,
        PanelFiltros:FilteredFilters
      }
      console.log(selectedDataSourceSettings)
      const nuevo = props.SettingsItems.map(x=>{
        if(x.itemID===props.itemsSelected[0])
        {
          return {...x,dataSourceSettings:selectedDataSourceSettings}
        }
        else{
          return {...x}
        }
   
      })
      const nuevoLayout = props.items.map(x=>({
        ...x,
        dataSourceSettings:nuevo.map(x=>x.itemID).includes(x.i).dataSourceSettings
      }))
      props.SetSettingsItems(nuevo)
      props.setItems(nuevoLayout);
      // props.addDataSourceSettings(props.itemsSelected,{
      //   ...response.data.pivotDataSource,
      //   Filas:PanelFilas,
      //   Columnas:PanelColumnas,
      //   Valores:PanelValores,
      //   Filtros:FilteredFilters
      // })
      console.log('Respuesta:', response);
    } catch (error) {
    
      if (axios.isCancel(error)) {
        message.warning('Solicitud cancelada');
      } else {
        message.error('Error en la solicitud');
        console.error(error);
      }
    } finally {
      setSpinning(false);
      setPercent(0);
    }
  
      }
      else{
        message.error('Es obligatorio tener datos en el panel de filas,columnas y valores')
      }
}
// useEffect(() => {
//   const Evolver = async()=>{
//     try {
      
//     } catch (error) {
//       console.log(error)

//     }
//   }
//   Evolver()
// }, [PanelFiltros,PanelColumnas,PanelFilas,PanelValores,FilteredFilters])
// Función para cancelar la solicitud
const cancelRequest = () => {
  console.log('CANCELANDO REQUEST')
  setSpinning(false)
  setPercent(0);
  // if (cancelToken) {
  //   cancelToken.cancel('Solicitud cancelada por el usuario');
  // }
};
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
      SetPanelFilas,
      FilteredFilters,
      SetFilteredFilters
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
            <div className='d-flex col aling-items-center justify-content-center py-2'
            style={{backgroundColor:'#ffc769'}}
            >
              
            <h6 style={{color:'#FFFFFF'}}>Grupo de Data</h6>

            <IconButton style={{padding:'1px',marginLeft:'16px'}} >
              <SlOptionsVertical color='#FFFFFF' size={14}/>
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
                  maxWidth: '8.5rem',
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
                                          draggableId={`${z.name}-Columnas`}
                                          index={index}
                                          >
                                          {(provided,snapshot)=>{
                                            return(
                                            <div className='row gx-0 mx-2 my-3 py-1 text-truncate'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={
                                              {
                                                userSelect: "none",
                                                justifyContent:'start',
                                                padding: 4,
                                                borderRadius:'2.5px',
                                                fontSize:'14px',
                                                background:TipoDatoPorColor(z.TipoDato),
                                                color:'#FFFFFF',
                                                fontWeight:500,
                                                borderWidth:'1px',
                                                borderColor:TipoDatoPorColor(z.TipoDato),
                                                ...provided.draggableProps.style
                                              }
                                            }
                                            >
                                              {z.label}
                                            <Space >
                                              <p
                                              style={{
                                                fontSize:'10px'
                                              }}
                                              >{z.Mutable?'Mutable':'No mutable'}</p>
                                               <p
                                              style={{
                                                fontSize:'10px'
                                              }}
                                              >{z.TipoConjuntoDatos}</p>
                                              <p
                                              style={{
                                                fontSize:'10px'
                                              }}
                                              >{z.TipoDato}</p>
                                            </Space>
                                            <div >
                                             
                                            </div>
                                            <div >
                                              
                                            </div>
                                            </div>
                                                 )
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
              <div className='col mb-2 mt-1'>
              <h5 >CuboProyeccion</h5>
              
              </div>
            </div>
            <div className='row' style={{borderBottomWidth:'1px'}}>
              <div className='col'>
              <p style={{color:'#B8B8B8',fontSize:'14px'}}>Configuracion de {props.valueSegmentedfx1}</p>
              
              </div>
            </div>
            <div className='row'>
            </div>
            <div className='my-5'>
              <SegmentedComponents 
              setItems={props.setItems}
              items={props.items}
              SettingsItems={props.SettingsItems}
              SetSettingsItems={props.SetSettingsItems}
              itemsSelected={props.itemsSelected}
              Componente={props.valueSegmentedfx1}
              PanelColumnas={PanelColumnas}
              SetPanelColumnas={SetPanelColumnas}
              PanelFilas={PanelFilas}
              SetPanelFilas={SetPanelFilas}
              SetPanelValores={SetPanelValores}
              PanelFiltros={PanelFiltros}
              PanelValores={PanelValores}
              SetPanelFiltros={SetPanelFiltros}
              FilteredFilters={FilteredFilters}
              SetFilteredFilters={SetFilteredFilters}
              />
    </div>
              {props.valueSegmentedfx1!=='Formato'?
              <div>
                  <Dropdown
                  // onOpenChange={(open,info)=>getStateofDropDown(open,info)}
                  menu={{
                    items:[
                      {
                        label:'Compartir con todos.',
                        key:'Compartir'
                      }
                    ],
                    onClick:(e)=>{ AplicarNuevaConfiguracion(e)},
                  }}
                  trigger={['contextMenu']}
                  
                >
    <ButtonPrincipalNoChildren className='my-4' style={{width:'100%'}} 
    title='Calcular Data'
    onClick={FuncionImportante}/>
         
    </Dropdown></div>:<></>}
   </div>
   <Spin fullscreen
   percent={percent}
 
    spinning={spinning} 
    // tip={`Cargando... ${percent}%`} 
    tip={
      
      <ButtonCancel className='mt-5' onClick={cancelRequest} >
      Cancelar solicitud
    </ButtonCancel>
    }
    />
      <Spin fullscreen

 
    spinning={spinning2} 

    />

   </DragDropContext>
 
  )
}

export default Panel