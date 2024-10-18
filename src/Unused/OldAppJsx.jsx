
import { Input, Layout, message, Modal, notification, Segmented, Space, Spin, Splitter, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { ArrowLeftOutlined, ArrowRightOutlined, BarChart, EditOutlined, Filter2Outlined, FilterAltOutlined, FilterOutlined, KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined, List, ListAltRounded, RefreshOutlined, SearchOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { IoArrowUndoSharp, IoClose } from "react-icons/io5";
import { IoArrowUndo } from "react-icons/io5";
import { CgDuplicate } from "react-icons/cg";
import { PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import { SlOptionsVertical } from "react-icons/sl";

import { IoArrowRedo } from "react-icons/io5";
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid';
import { IoMdSave } from "react-icons/io";
import { FaBars, FaChartBar, FaCss3, FaDatabase, FaList, FaSave } from "react-icons/fa";
import { AppstoreAddOutlined, BarsOutlined, DatabaseFilled, DatabaseOutlined, SettingOutlined } from '@ant-design/icons';
import TituloBarra1 from './components/TituloBarra1';
import { ColumnasCubo } from './data/EjemploColumnas';
import { ResizableBox } from 'react-resizable';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import React,{ useEffect, useRef, useState } from 'react';
import { ExGraficos } from './data/EjemploGraficos';
import CubitoSync from './components/CuboSyncfusion';
import DropDrag from './components/WrapperReactGrid';
import TituloSecundario1 from './components/TituloSecundario1';
import { setValue } from '@syncfusion/ej2-base';
import axios from 'axios';
import { MdOutlineDragIndicator } from "react-icons/md";
import CuboElementoLayout from './components/CuboElementoLayout';



const ResponsiveReactGridLayout = WidthProvider(Responsive);
const RertornarDestino = (destino)=>{
  if(destino.includes('PanelFiltros'))
    {
      return 'PanelFiltro'
    }
  if(destino.includes('PanelColumnas'))
    {
      return 'PanelColumnas'
    }
    if(destino.includes('PanelFilas'))
      {
        return 'PanelFilas'
      }
    if(destino.includes('PanelValores'))
      {
        return 'PanelValores'
      }
      if(destino.includes('Columnas'))
        {
          return 'Columnas'
        }
      else{
        return null
      }
}

const onDragEnd = (
  result, 
  Columnas,
  setColumnas,
  FiltrosPanel,
  setFiltrosPanel,
  openNotificationWithIcon,
  PanelColumnas,
  SetPanelColumnas,
  PanelValores,
  SetPanelValores,
  PanelFilas,
  SetPanelFilas
) => {
  if (!result.destination) return;
  const { source, destination } = result;
  console.log(result)
  
  const DroppableIdDestination =  RertornarDestino(destination.droppableId)
  const DroppableIdSource =  RertornarDestino(source.droppableId)
  // console.log(Object.keys(PanelFilas))
  //acceder a cada panel items
  let itemsPanelFilas = PanelFilas[Object.keys(PanelFilas)[0]].items
  let itemsPanelColumnas = PanelColumnas[Object.keys(PanelColumnas)[0]].items
  let itemsPanelFiltros = FiltrosPanel[Object.keys(FiltrosPanel)[0]].items
  let itemsPanelValores = PanelValores[Object.keys(PanelValores)[0]].items

  if(DroppableIdDestination&&DroppableIdSource)
    {
  if(DroppableIdDestination === DroppableIdSource)
    {
   
      return;
    }
    if(DroppableIdSource==='Columnas'&&DroppableIdDestination==='PanelColumnas')
      {
      
        let ColumnaTransportada = Columnas[source.droppableId].items[source.index]
        let panelColumnasActual = PanelColumnas[destination.droppableId].items
        let ColumnaTransportadaconNuevoId = {
          ...ColumnaTransportada,
          id:uuidv4()
        }
        let noEsRepetidoEnPanelFilas =itemsPanelFilas.every(x=>x.name!==ColumnaTransportadaconNuevoId.name)
        let noEsRepetido = PanelColumnas[destination.droppableId].items.every(x=>x.name!==ColumnaTransportadaconNuevoId.name)
        let esAtributo = ColumnaTransportadaconNuevoId.TipoConjuntoDatos==='Atributo'?true:false
        const da = noEsRepetido && esAtributo && noEsRepetidoEnPanelFilas
        if(!da)
          {
            return ;
          }
        
          else{
            panelColumnasActual.splice(destination.index, 0, ColumnaTransportadaconNuevoId);
            SetPanelColumnas({...PanelColumnas,[destination.droppableId]:{
              // ...ColumnaTransportadaconNuevoId,
              items:panelColumnasActual
            }})
          }
        // console.log(Columnas)
        console.log(PanelColumnas)
        // console.log(ColumnaTransportada)
        //tener la columna preparada para llevar
        //agregar columna a panelcolumnas
        //remover repetido si hay columna en panelcolumna
        //remover si esa columna esta en panelvalores
        //remover si esa columna esta en panelfilas

      }
      if(DroppableIdSource==='Columnas'&&DroppableIdDestination==='PanelFiltros')
      {
        

        //tener la columna preparada para llevar
        //restriccion solo atributos
        //restriccion no repetidos en panelfilas
        //agregar columna a panelfiltros
        //remover repetido si hay esa columna en panelfiltro
        //columna puede estar o en panelfiltros o pen panelvalores o panelfilas pero nos los 2 o 3 a lavez
      }
      if(DroppableIdSource==='Columnas'&&DroppableIdDestination==='PanelValores')
      {
        // console.log(Columnas)
        let FilaTransportada = Columnas[source.droppableId].items[source.index]
        let panelValoresActual = PanelValores[destination.droppableId].items
        let FilaTransportadaconNuevoId = {
          ...FilaTransportada,
          id:uuidv4()
        }
        // console.log(PanelColumnas)
        let noEsRepetidoEnPanelColumnas =itemsPanelFiltros.every(x=>x.name!==FilaTransportadaconNuevoId.name)
        let noEsRepetido = PanelValores[destination.droppableId].items.every(x=>x.name!==FilaTransportadaconNuevoId.name)
        let esAtributo = FilaTransportadaconNuevoId.TipoConjuntoDatos==='Atributo'?true:false
        const da = noEsRepetido && esAtributo && noEsRepetidoEnPanelColumnas
        if(!da)
          {
            return ;
          }
        
          else{
            panelValoresActual.splice(destination.index, 0, FilaTransportadaconNuevoId);
            SetPanelValores({...PanelValores,[destination.droppableId]:{
              items:panelValoresActual
            }})
          }
        //tener la columna preparada para llevar
        //restriccion solo indicadores
        //restriccion no repetidos en panelfilas
        //agregar columna a panelvalores 
        
      }
      if(DroppableIdSource==='Columnas'&&DroppableIdDestination==='PanelFilas')
      {
        // console.log(Columnas)
        let FilaTransportada = Columnas[source.droppableId].items[source.index]
        let panelFilasActual = PanelFilas[destination.droppableId].items
        let FilaTransportadaconNuevoId = {
          ...FilaTransportada,
          id:uuidv4()
        }
        // console.log(PanelColumnas)
        let noEsRepetidoEnPanelColumnas =itemsPanelColumnas.every(x=>x.name!==FilaTransportadaconNuevoId.name)
        let noEsRepetido = PanelFilas[destination.droppableId].items.every(x=>x.name!==FilaTransportadaconNuevoId.name)
        let esAtributo = FilaTransportadaconNuevoId.TipoConjuntoDatos==='Atributo'?true:false
        const da = noEsRepetido && esAtributo && noEsRepetidoEnPanelColumnas
        if(!da)
          {
            return ;
          }
        
          else{
            panelFilasActual.splice(destination.index, 0, FilaTransportadaconNuevoId);
            SetPanelFilas({...PanelFilas,[destination.droppableId]:{
              items:panelFilasActual
            }})
          }
            //tener la columna preparada para llevar
            //restriccion solo atributos
            //restriccion no repetidos en panelfilas
            //agregar columna a panelfilas
          
      }

      if(DroppableIdSource==='PanelColumnas'&&DroppableIdDestination==='Columnas')
      {
          //remover columna de panelColumnas
      }
      if(DroppableIdSource==='PanelFiltros'&&DroppableIdDestination==='Columnas')
      {
        //remover filtro de panelfiltros
      }
      if(DroppableIdSource==='PanelFilas'&&DroppableIdDestination==='Columnas')
      {
        //remover filas de panelfilas
      }
      if(DroppableIdSource==='PanelValores'&&DroppableIdDestination==='Columnas')
      {
        //remover valores de panelvaores
      }
    }
    else{
      openNotificationWithIcon('error','Error de transferencia','Destino invalido!')
    }
  // if(DroppableIdDestination==='Columnas'&&DroppableIdSource!==DroppableIdDestination){
  //   return;
  // }
  // if(DroppableIdSource==='Columnas'&&DroppableIdSource!==DroppableIdDestination){
  //   const sourceColumn = Columnas[source.droppableId];
  //   const destColumn = FiltrosPanel[destination.droppableId];
  //   const sourceItems = [...sourceColumn.items];
  //   const destItems = [...destColumn.items];
  //   const [removed] = sourceItems.splice(source.index, 1);
  //   // console.log([removed])
  //   // console.log(removed.Cuenta)
  //   // console.log(destItems)
  //   // console.log(destItems.some(x=>x.Cuenta===removed.Cuenta))
  //   if(destItems.some(x=>x.Cuenta===removed.Cuenta))
  //   {
  //     openNotificationWithIcon('error','Transferencia de Columnas','No pueden haber dos Columnas iguales en el mismo periodo.')
  //     return;
  //   }
  //   else{
  //   destItems.splice(destination.index, 0, removed);
  //   setFiltrosPanel({
  //     ...FiltrosPanel,
  //     [destination.droppableId]: {
  //       ...destColumn,
  //       items: destItems
  //     }
  //   });
  //   }
  // }
  // if (DroppableIdSource!=='Columnas'&&DroppableIdSource !== DroppableIdDestination) {
  //   const sourceColumn = FiltrosPanel[source.droppableId];
  //   const destColumn = FiltrosPanel[destination.droppableId];
  //   const sourceItems = [...sourceColumn.items];
  //   const destItems = [...destColumn.items];
  //   const [removed] = sourceItems.splice(source.index, 1);
  //   console.log([removed])
  //   destItems.splice(destination.index, 0, removed);
  //   setFiltrosPanel({
  //     ...FiltrosPanel,
  //     [source.droppableId]: {
  //       ...sourceColumn,
  //       items: sourceItems
  //     },
  //     [destination.droppableId]: {
  //       ...destColumn,
  //       items: destItems
  //     }
  //   });
  // } else {
  //   if(DroppableIdSource===DroppableIdDestination&&DroppableIdDestination==='Columnas')
  // {
  //   console.log('qwjdqwj')
  //   const column = Columnas[source.droppableId];
  //   const copiedItems = [...column.items];
  //   const [removed] = copiedItems.splice(source.index, 1);
  //   copiedItems.splice(destination.index, 0, removed);
  //   setColumnas({
  //     ...Columnas,
  //     [source.droppableId]: {
  //       ...column,
  //       items: copiedItems
  //     }
  //   });
  // }
  
  // if(DroppableIdSource===DroppableIdDestination&&
  //   DroppableIdDestination!=='Columnas'){
  //   console.log('qwjd2334qwj')
  //   const column = FiltrosPanel[source.droppableId];
  //   const copiedItems = [...column.items];
  //   const [removed] = copiedItems.splice(source.index, 1);
  //   copiedItems.splice(destination.index, 0, removed);
  //   setFiltrosPanel({
  //     ...FiltrosPanel,
  //     [source.droppableId]: {
  //       ...column,
  //       items: copiedItems
  //     }
  //   });
  // }

};
const onDragEndToPanelGrafico = (result, 
    Graficos,
    PanelGraficos,
    setPanelGraficos,
    SetGraficos,openNotificationWithIcon) => {
  console.log(result)
  if (!result.destination) return;
  const { source, destination } = result;
  // console.log(source, destination)
  // const DroppableIdDestination = destination.droppableId.substring(destination.droppableId.length-8,destination.droppableId.length)
  // const DroppableIdSource = source.droppableId.substring(source.droppableId.length-8,source.droppableId.length)
    const DroppableIdDestination = destination.droppableId.includes('PanelGraficos')?'PanelGraficos':'Graficos'
  const DroppableIdSource = source.droppableId.includes('Graficos')?'Graficos':'PanelGraficos'
  console.log(DroppableIdDestination,DroppableIdSource)
  if(DroppableIdDestination==='Graficos'&&DroppableIdSource!==DroppableIdDestination){
    return;
  }
  if(DroppableIdSource==='Graficos'&&DroppableIdSource!==DroppableIdDestination){
    
    const sourceColumn = Graficos[source.droppableId];
    const destColumn = PanelGraficos[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    let [removed] = sourceItems.splice(source.index, 1);
    let newRemoved = {
      ...removed,
      id:uuidv4()
    }
    // console.log(newRemoved)
    destItems.splice(destination.index, 0, newRemoved);
    setPanelGraficos({
      ...PanelGraficos,
      [destination.droppableId]: {
        // ...destColumn,
        items: destItems
      }
    });
    // console.log([removed])
    // console.log(removed.id)
    // console.log(destItems)
    // console.log(destItems.some(x=>x.Cuenta===removed.Cuenta))
    // if(destItems.some(x=>x.id===removed.id))
    // {
    //   openNotificationWithIcon('error','Transferencia de Columnas','No pueden haber dos Columnas iguales en el mismo periodo.')
    //   return;
    // }
    // else{
    
    // }
  }
  if (DroppableIdSource!=='Graficos'&&DroppableIdSource !== DroppableIdDestination) {
    const sourceColumn = PanelGraficos[source.droppableId];
    const destColumn = PanelGraficos[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    console.log([removed])
    destItems.splice(destination.index, 0, removed);
    setPanelGraficos({
      ...PanelGraficos,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    if(DroppableIdSource===DroppableIdDestination&&DroppableIdDestination==='Graficos')
  {
    console.log('qwjdqwj')
    const column = Graficos[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    SetGraficos({
      ...Graficos,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
  if(DroppableIdSource===DroppableIdDestination
    &&DroppableIdDestination!=='Graficos'){
    // console.log(DroppableIdSource)
    // console.log(DroppableIdDestination)
    console.log('qwjd2334qwj')
    const column = PanelGraficos[source.droppableId];
    console.log(column)
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setPanelGraficos({
      ...PanelGraficos,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
}
};
const defaultCols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
const rowHeight = 100;
const NormalCube = React.forwardRef((props, ref) => {
  return (
      <PivotViewComponent 
          id='PivotView' 
          dataSourceSettings={props.dataSourceSettings} 
          ref={ref}
          height={props.height}
          width={props.width}
      />
  );
});
const AppOld=()=> {

 
  const [api, contextHolder] = notification.useNotification();
 // Estado inicial para items y el contador
 const [items, setItems] = useState(
  [0, 1, 2, 3, 4].map((i, key, list) => ({
    i: i.toString(),
    x: i * 4,
    y: 0,
    w: 4,
    h: 4,
    
    minW:  4, 
    minH:  4,
    add: i === list.length - 1,
  }))
);
const [cubosDimension, setCubosDimension] = useState(
  items.map(item => ({ i: item.i, width: item.w * 100, height: item.h * 50 }))
);
const [newCounter, setNewCounter] = useState(0);
const asdqw = useRef(null)

const [cols, setCols] = useState(defaultCols);
  // const [FiltrosPanel,setFiltrosPanel] = useState({})
  const [Columnas,setColumnas] = useState({})
  // const [Graficos,setGraficos] = useState(ExGraficos)
  const [PanelGraficos,setPanelGraficos] = useState([])
  const [DatosCalculo,SetDatosCalculo] = useState([])
  const [loading,SetLoading] = useState(false)
  const [PanelFilas,SetPanelFilas] = useState({})
  
  const [layout, setLayout] = useState([]);
  const [PanelFiltros,SetPanelFiltros] = useState({})
  const [PanelColumnas,SetPanelColumnas] = useState({})
  const [ModalLoading,SetModalLoading] = useState(false)
  const [PanelValores,SetPanelValores] = useState({})
  const [HiddenPanelGraficos,SetHiddenPanelGraficos] = useState(false)
  const [valueSegmentedfx1, setValuevalueSegmentedfx1] = useState('Editor');
  const [FiltrosOpened,setFiltrosOpened] = useState(false)
  const openNotificationWithIcon = (type,msg,desc) => {
    api[type]({
      duration:8,
      message: msg,
      description:desc
    });
  };
  const onLayoutChange = (newLayout) => {
    console.log(newLayout);
  
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
    console.log('ACTUALIZADO')
    console.log(updatedItems)
    setItems(updatedItems);  // Actualiza los items con los nuevos valores
   
  };
  useEffect(() => {
    if(asdqw)
    {
      asdqw.current.refresh()
    }
  }, [items])
  

const onRemoveItem = (i) => {
  console.log("removing", i);
  setItems(items.filter(item => item.i !== i));
};



const CreateElement = (el,index) => {

  const i =  el.i;
  const cubeWidth = el.w * 100; // Por ejemplo, multiplicamos por 50 para ajustar el tamaño de forma visible
  const cubeHeight = el.h * 100;
 
  return (
    <div key={i} data-grid={el} 
    style={{borderWidth:'1px'}}
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
      <IconButton size='small'   className="remove" onClick={() => onRemoveItem(i)}>
        <IoClose/>
      </IconButton>
      </div>
      </div>
     <div className='row gx-0'>
      <PivotViewComponent 
          id='PivotView' 

          dataSourceSettings={DatosCalculo} 
          height={`${cubeHeight}px`}  // Aplica la altura calculada
          width={`${cubeWidth*cols}px`}  
      />
     
      </div>
    </div>
  );
};


// Cambia las columnas según el punto de quiebre (breakpoint)
const onBreakpointChange = (breakpoint, cols) => {
  setCols(cols);
};
const onAddItem = () => {

  setItems([
    ...items,
    {
      i: (items.length).toString(),
      x: Infinity,
      y: Infinity, // lo pone al final
      w: 4,
      h: 4,
      
      minW:  4, 
      minH:  4,
      
    }
  ]);
  
};
  const fetchColumnas = async() =>
  {
    let array = {
      [uuidv4()+'Columnas']: {
        name: "Columnas",
        items: []
      }
    }
    try {
      for(const key in array){
        // console.log(firstDataObject[key])
        for(let element of ColumnasCubo){
          
            array[key].items.push({
                 id:uuidv4(),
                 ...element
            })
          
        }
      }
      setColumnas(array)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPanelFilas = async()=>{
    let array = {
      [uuidv4()+'PanelFilas']: {
        name: "PanelFilas",
        items: []
      }
    }
    try {
      // for(const key in array){
      //   // console.log(firstDataObject[key])
      //   for(let element of ColumnasCubo){
          
      //       array[key].items.push({
      //            id:uuidv4(),
      //            ...element
      //       })
          
      //   }
      // }
      SetPanelFilas(array)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPanelColumnas = async()=>{
    let array = {
      [uuidv4()+'PanelColumnas']: {
        name: "PanelColumnas",
        items: []
      }
    }
    try {
      SetPanelColumnas(array)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPanelFiltros = async()=>{
    let array = {
      [uuidv4()+'PanelFiltros']: {
        name: "PanelFiltros",
        items: []
      }
    }
    try {
      SetPanelFiltros(array)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPanelValores = async()=>{
    let array = {
      [uuidv4()+'PanelValores']: {
        name: "PanelValores",
        items: []
      }
    }
    try {
      SetPanelValores(array)
    } catch (error) {
      console.log(error)
    }
  }
  // const fetchPanelGraficos = async()=>{
  //   try {
  //     let array = {
  //       [uuidv4()+'PanelGraficos']: {
  //         name: "PanelGraficos",
  //         items: []
  //       }
  //     }
  //     setPanelGraficos(array)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const fetchGraficos = async() =>
  //   {
  //     let array = {
  //       [uuidv4()+'Graficos']: {
  //         name: "Graficos",
  //         items: []
  //       }
  //     }
  //     try {
  //       for(const key in array){
  //         // console.log(firstDataObject[key])
  //         for(let element of ExGraficos){
            
  //             array[key].items.push({
  //                  id:uuidv4(),
  //                  ...element
  //             })
            
  //         }
  //       }
  //       console.log(array)
  //       setGraficos(array)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
 
  useEffect(() => {
    fetchPanelColumnas()
    fetchPanelFilas()
    fetchPanelFiltros()
    fetchPanelValores()
    // fetchPanelGraficos()
    fetchColumnas()
    // fetchGraficos()
  }, [])
  useEffect(() => {
  
    const Evolver = async()=>{
  
      let Filas = PanelFilas[Object.keys(PanelFilas)[0]]
      let Columnas =PanelColumnas[Object.keys(PanelColumnas)[0]]
      let Valores =PanelValores[Object.keys(PanelValores)[0]]
      let Filtros =PanelFiltros[Object.keys(PanelFiltros)[0]]
      let filasitems = []
      let columnasitems=[]
      let valoresitems={}
      let filtrositems={}
       if (Filas && Filas.items) {
        filasitems=Filas.items.map(x => x.name)
      console.log(filasitems);
      }

      if (Columnas && Columnas.items) {
        columnasitems=Columnas.items.map(x => x.name)
        console.log(columnasitems);
      }
      if (Valores && Valores.items) {
        valoresitems=Valores.items.reduce((acc, curr) => {
          acc[curr.name] = { operation: 'SUM' };
          return acc;
        }, {})
        console.log(valoresitems);
      }
      if (Filtros && Filtros.items) {
        filtrositems={ PKIDProveedor: '90005',Periodo:'202304' }
        
        console.log(filtrositems);
      }
      console.log(Object.keys(valoresitems).length)
      if(filasitems.length!==0&&columnasitems.length!==0&&Object.keys(valoresitems).length!==0)
        {
          SetModalLoading(true)
          SetLoading(true)
          try {
          
            const dot= await axios.post(`http://localhost:4000/api/calcularcubo`,{
              Filas:filasitems,
              Columnas:columnasitems,
              Valores:valoresitems,
              Filtros:filtrositems
            })
            if(dot.status===200)
            {
              console.log(dot)
              SetLoading(false)
              SetModalLoading(false)

              SetDatosCalculo(dot.data.pivotDataSource)
            }
          } catch (error) {
            SetModalLoading(false)
            SetLoading(false)

            console.log(error)
          }
        }
  
    }
    Evolver()
    // console.log(PanelValores)
    // console.log(PanelFilas)
    // console.log(PanelGraficos)
    // console.log(PanelColumnas)
  }, [PanelValores,PanelFilas,PanelGraficos,PanelColumnas])
   
  // useEffect(() => {
  //   console.log(PanelValores)
  // }, [PanelValores])
  // useEffect(() => {
  //   console.log(PanelFilas)
  // }, [PanelFilas])
  // useEffect(() => {
  //  console.log(PanelGraficos)
  // }, [PanelGraficos])
  
  const ComponentesEjemploColumna = (label,name,TipoConjuntoDatos,EsFuncion)=>{
    return (<div className='row gx-0'>
      {label}
    </div>)
  }
  return (
    <div className='overflow-y-lg-hidden overflow-x-lg-hidden' style={{
      display:'flex',
      flexDirection:'column',
      height:'87vh'
    }}>
      {contextHolder}
      <header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
  <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">B2B Creador de Cubo</a>

  <ul class="navbar-nav flex-row d-md-none">
    <li class="nav-item text-nowrap">
      <button class="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
        {/* <svg class="bi"><use xlink:href="#search"></use></svg> */}
        <IconButton>
          <SearchOutlined/>
        </IconButton>
        
      </button>
    </li>
    <li class="nav-item text-nowrap">
      <button class="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        {/* <svg class="bi"><use xlink:href="#list"></use></svg> */}
        <IconButton>
          <List/>
        </IconButton>
      </button>
    </li>
  </ul>

  <div id="navbarSearch" class="navbar-search w-100 collapse">
    <input class="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"/>
  </div>
</header>
<Modal 
    open={ModalLoading}
    onCancel={()=>{SetModalLoading(false)}}
    centered

    footer={<></>}
>
    <h5>Cargando..</h5>
    <Spin/>
</Modal>
    <div className='container-fluid'>
      <div className='row'>
        <Space style={{background:'#e8edf7'}} className='p-2'>
          <Typography>ELEMENTO 1</Typography>
          <Typography>ELEMENTO 2</Typography>
          <Typography>ELEMENTO 3</Typography>
          <Typography>ELEMENTO 4</Typography>
          <Typography>ELEMENTO 5</Typography>
        </Space>
      </div>
      <div className='row'>
        <Space style={{background:'#e8edf7',borderTopWidth:'1px',borderColor:'#adadad'}} className='p-2'>
          <IconButton className='mx-2' size='small'>
            <IoArrowUndoSharp/>
          </IconButton>
          <IconButton className='mx-2' size='small'>
            <IoArrowRedo/>
          </IconButton>
          <IconButton className='mx-2' size='small'>
            <FaSave/>
          </IconButton>
          <IconButton className='mx-2' size='small'>
            <RefreshOutlined/>
          </IconButton>
        </Space>
      </div>
      
      <div className='row' style={{borderTopWidth:'1px',borderColor:'#adadad'}}>
        <div className='col align-items-center' style={{background:'#afd6ff', minHeight: 'calc(100vh - 8.2rem)',maxWidth:'2.5rem'
          ,borderRightWidth:'1px',borderColor:'#adadad'
        }}>
          <div className='row p-1'>
            <IconButton style={{borderRadius:'3px',backgroundColor:'#59a7f9'}}>
              <FaList/>
            </IconButton>
          </div>
          <div className='row p-1'>
          <IconButton style={{borderRadius:'3px',backgroundColor:'#59a7f9'}}>
                <FaDatabase/>
              </IconButton>
          </div>
          <div className='row p-1'>
          <IconButton style={{borderRadius:'3px',backgroundColor:'#59a7f9'}}>
                <EditOutlined/>
              </IconButton>
          </div>
          <div className='row p-1'>
          <IconButton style={{borderRadius:'3px',backgroundColor:'#59a7f9'}}>
                <FilterAltOutlined/>
              </IconButton>
          </div>
          <div className='row'>
          <IconButton style={{borderRadius:'3px'}}>
                <SettingOutlined/>
              </IconButton>
          </div>
          <div className='row'>
          <IconButton style={{borderRadius:'3px'}} onClick={()=>{SetHiddenPanelGraficos(!HiddenPanelGraficos)}}>
                <BarChart/>
              </IconButton>
          </div>
        </div>
        <DragDropContext
      onDragEnd={result => onDragEnd(
        result, 
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
        SetPanelFilas
      )}
      >
       
         {/* PANEL DE COLUMNAS */}
        <div className='col px-0 align-items-center 
        justify-content-center'  
        style={{background:'#e8edf7',maxWidth:'11.5rem',borderRightWidth:'1px',borderColor:'#adadad'}}>
            <div className='d-flex col aling-items-center justify-content-center mt-2'>
            <IconButton style={{padding:'1px',marginRight:'16px'}} >
              <FaDatabase  size={14}/>
            </IconButton>
            <TituloBarra1>CONJUNTO DE DATOS</TituloBarra1>
            <IconButton style={{padding:'1px',marginLeft:'16px'}} >
              <FaDatabase  size={14}/>
            </IconButton>
            </div>
            <div 
            className='flex-lg-1 h-screen  overflow-y-lg-auto  ' 
            style={{
                          background: "#e8edf7",
                          padding: 10,
                          width: 'auto',

                          maxHeight:'84vh',
                          borderRadius:5
                        }}
                        >
                  {Object.entries(Columnas).map(([columnId,column],index)=>{

                    return(
                      <Droppable
                      droppableId={columnId} 
                      key={columnId}  
                      index={index}
                      >
                        {(provided,snapshot)=>{
                          return(
                            <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                         
                              // background: snapshot.isDraggingOver
                              //   ? "#A29D9D"
                              //   : "lightgrey",
                              padding: 2,
                            
                              borderRadius:2
                            }}
                
                            >
                              {
                                column.items.map((item,index)=>{
                                  return(
                                    <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                    >
                                      {(provided, snapshot)=>{
                                        return(
                                        
                                          <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: "none",
                                            padding: 1,
                                            borderRadius:4,
                                            fontSize:'14px',
                                            color:'#0d4178',
                                            fontWeight:500,
                                            borderBottomWidth:'0.2px',
                                            borderColor:'#a8a8a8',
                                            // backgroundColor: snapshot.isDragging
                                            //   ? "#263B4A"
                                            //   : "black",
                                            // color: "white",
                                            ...provided.draggableProps.style
                                          }}
                                          >
                                            {item.label.length>=26?`${item.label.substring(0,26)}`:item.label}
                                          </div>
                                          
                                        )
                                      }}
                                    </Draggable>
                                  )
                                })}
                                {provided.placeholder}
                            </div>
                          )
                        }}
                      </Droppable>
                    )
                  })
                  }
            {/* {ColumnasCubo.map(x=>
             {
              return (
                <div className='row gx-0'>
              {x.label}
            </div>
              )
             }
            )} */}
            </div>
        </div>
        
        {/* PANEL DE CUBO */}
        
        <div className='col '
         style={{background:'#e8edf7',maxWidth:'13rem',borderRightWidth:'1px',borderColor:'#adadad'}}
        >
          <div >
            <div className='row'>
            <div className='col d-flex justify-content-center'>
            <Segmented 
            value={valueSegmentedfx1}
            onChange={(value)=>setValuevalueSegmentedfx1(value)}
             options={[
              {
                label: '',
                value: 'Filtros',
                icon: <FilterAltOutlined />,
              },
              {
                label: '',
                value: 'Editor',
                icon: <EditOutlined />,
              },
              {
                label: '',
                value: 'Formato',
                icon: <FaCss3 />,
              },
            ]}
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
           {/* FX PARTE 1 */}
           {valueSegmentedfx1==='Editor'?
          <div>
             {/* FILAS */}
          <p>Panel de filas</p>
          <div 
          className=' overflow-y-lg-auto'
           style={{
                        padding:2,
                        borderRadius:4,
                        backgroundColor:'#eefbff',
                        border:'2px dotted gray',
                       
                      }}
                      >
            {Object.entries(PanelFilas).map(([columnId,column],index)=>{
              return(
                
                <Droppable
                droppableId={columnId}
                key={columnId}
                index={index}
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
                          column.items.map((item,index)=>{
                            return(
                              <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                              >
                                {(provided,snapshot)=>{
                                  return(
                                    <div
                                    className='col'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                   
                                   >
                                      {item.label.length>=26?`${item.label.substring(0,26)}`:item.label}

                                    </div>
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
                 
              )
            }
          )
            }
          </div>
          {/* COLUMNAS */}
          <p>Panel de Columnas</p>
          <div
          className=' overflow-y-lg-auto' style={{
            padding:2,
            borderRadius:4,
            backgroundColor:'#eefbff',
            border:'2px dotted gray',
          
          }}
          >
            {Object.entries(PanelColumnas).map(
              (
                [columnId,column],index
              )=>{
                return (
                  
                    <Droppable
                    droppableId={columnId}
                    key={columnId}
                    index={index}
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
                          column.items.map((item,index)=>{
                            return(
                              <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                              >
                                {(provided,snapshot)=>{
                                  return(
                                    <div
                                    className='col'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                   
                                   >
                                            {item.label.length>=26?`${item.label.substring(0,26)}`:item.label}

                                    </div>
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
                 
                )
              }
            )}
          </div>
            {/* VALORES */}
          <p>Panel de Valores</p>
          <div
          className='overflow-y-lg-auto' style={{
            padding:2,
            borderRadius:4,
            backgroundColor:'#eefbff',
            border:'2px dotted gray',
            // height:'10rem'
          }}
          >
            {Object.entries(PanelValores).map(
              ([columnId,column],index)=>{
                return(
                  <Droppable
                  droppableId={columnId}
                  key={columnId}
                  index={index}
                  >
                    {(provided,snapshot)=>{
                      return(
                        <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='overflow-y-lg-auto'
                        style={{
                          height:'10rem'
                        }}
                        >
                          {
                            column.items.map((item,index)=>{
                              return(
                                <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                                >
                                  {(provided,snapshot)=>{
                                    return(
                                      <div
                                      className='col'

                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}

                                     >
                                              {item.label.length>=26?`${item.label.substring(0,26)}`:item.label}
  
                                      </div>
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
                )
              }
            )}
          </div>
         
          
          </div>
            /* FX PARTE 2 */
            :
            <div 
           
                        >
              <p>Filtros</p>
              <div  className='overflow-y-lg-auto'
             style={{
                          padding:1,
                          borderRadius:4,
                          backgroundColor:'#ffffff',
                          border:'2px dotted gray',
                          height:'70vh'
                        }}>
                  {Object.entries(PanelFiltros).map(([columnId,column],index)=>{
              return(
                
                <Droppable
                droppableId={columnId}
                key={columnId}
                index={index}
                >
                  {(provided,snapshot)=>{
                    return(
                      <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className=' overflow-y-lg-auto'
                      style={{
                        height:'10rem'
                      }}
                      >
                        {
                          column.items.map((item,index)=>{
                            return(
                              <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                              >
                                {(provided,snapshot)=>{
                                  return(
                                    <div
                                    className='col'
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                   
                                   >
                                      {item.label.length>=26?`${item.label.substring(0,26)}`:item.label}

                                    </div>
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
                 
              )
            }
          )
            }
                </div>
            </div>}
            </div>
        </div>
      
        </DragDropContext>
        <div className=' col flex-lg-1 h-screen  overflow-y-lg-auto' style={{
                       
                          padding: 10,
                          width: 'auto',

                          maxHeight:'84vh',
                          borderRadius:5
                        }}
                        // Asignar el ref a la columna       
                        >
           <ResponsiveReactGridLayout
                  draggableHandle=".react-grid-dragHandleExample"
             onLayoutChange={onLayoutChange}
             onBreakpointChange={onBreakpointChange}
       
             className="layout"
             cols={defaultCols}
             rowHeight={rowHeight}
            >
              
             {items.map((el, index) => CreateElement(el,index))}
            
            </ResponsiveReactGridLayout>                
           {/* <CuboElementoLayout
           DatosCalculo={DatosCalculo}
           />
           */}
        </div>
        {HiddenPanelGraficos?
        <div className='col px-0 aling-items-center justify-content-center'
        style={{background:'#e8edf7',maxWidth:'14rem',borderLeftWidth:'1px',borderColor:'#adadad'}}>
   <div className='d-flex col aling-items-center justify-content-center mt-2'>
        <IconButton style={{padding:'1px',marginRight:'16px'}} >
           <FaChartBar size={14}/>
          </IconButton>
          <TituloBarra1>Galeria</TituloBarra1>
           </div>
         <p>Integrado</p>
          <div 
         className='flex-lg-1 h-screen  overflow-y-lg-auto  ' 
          style={{
                       background: "#e8edf7",
                      padding: 10,
                        // width: 'auto',

                       // maxHeight:'84vh',
                       borderRadius:5
                      }}
                   >
                    <div className='row row-cols-4 d-flex justify-content-center align-items-center p-2'>

                   
               {ExGraficos.map(x=>{return (
                <IconButton style={{padding:0,borderRadius:1}} onClick={()=>{onAddItem(x.name)}}>
                <div
              
                className='col justify-content-center align-items-center d-flex'
                style={{
                                                        userSelect: "none",
                                                        padding: 1,
                                                        margin:3,
                                                        borderRadius:1,
                                                        fontSize:'14px',
                                                        color:'#0d4178',
                                                        
                                                        fontWeight:500,
                                                        borderBottomWidth:'0.2px',
                                                        borderColor:'#a8a8a8',
                                                        backgroundColor:'#ffffff',
                                                    
                                                      }}
                >{x.icono}
                </div>
                </IconButton>
              
               )})}     </div>
                
            </div>
        </div>:null}
      </div>
  
    </div>  
    </div>
  );
}

export default AppOld;
