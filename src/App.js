import logo from './logo.svg';
import './App.css';
import { Button, Card, Collapse, Drawer, Dropdown, Input, Layout, message, Modal, notification, Segmented, Space, Spin, Splitter, Tag, theme, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { ArrowLeftOutlined, ArrowRightOutlined, BarChart, EditOutlined, Filter2Outlined, FilterAltOutlined, FilterOutlined, KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined, List, ListAltRounded, RefreshOutlined, SearchOutlined, X } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { IoArrowUndoSharp, IoClose, IoCube } from "react-icons/io5";
import { IoArrowUndo } from "react-icons/io5";
import { CgDuplicate } from "react-icons/cg";
import { ConditionalFormatting, FieldList, Inject, PivotChart, PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import { SlOptionsVertical } from "react-icons/sl";
import { TbSum } from "react-icons/tb";

import { IoArrowRedo } from "react-icons/io5";
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid';
import { IoMdCube, IoMdSave } from "react-icons/io";
import { FaBars, FaChartBar, FaCss3, FaCube, FaDatabase, FaList, FaSave } from "react-icons/fa";
import { AppstoreAddOutlined, BarsOutlined, DatabaseFilled, DatabaseOutlined, FunctionOutlined, SettingOutlined } from '@ant-design/icons';
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
import { MdOutlineDragIndicator, MdOutlineFormatColorFill } from "react-icons/md";
import CuboElementoLayout from './components/CuboElementoLayout';
import SplitPane,{Pane} from 'react-split-pane';
import { ConjuntoData } from './data/EjemploConjuntoData';
import Title from 'antd/es/typography/Title';
import Search from 'antd/es/input/Search';
import { PiSquaresFourFill } from "react-icons/pi";
import Panel from './Panel/Panel';
import * as pivotData from './data/pivotData.json';



const ResponsiveReactGridLayout = WidthProvider(Responsive);


const defaultCols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
const rowHeight = 100;

function App() {

 
  const [api, contextHolder] = notification.useNotification();

const initialLayout = [0, 1, 2, 3, 4].map((i) => ({
  i: i.toString(),
  x: (i  * 4), // Ajuste para que no se salga de la pantalla
  y: 0, // Multiplica por el número de filas
  w: 4,
  h: 4,
  minW: 4,
  minH: 4,
}));
const pivotRefs = useRef([]);
// Estado inicial para items y el contador
const [items, setItems] = useState([  { i: `pivot1-Bubble`, x: 0, y: 0, w: 4, h: 4,minW:4,minH:4,selected:true,dataSourceSettings:{},Title:'' },
  { i: `pivot2-Table`, x: 4, y: 0, w: 4, h: 4,minW:4,minH:4,selected:false,dataSourceSettings:{},Title:'' }]
  // { i: "pivot1", x: 0, y: 0, w: 4, h:4,  minW: 4,
  //   minH: 4 },
  // { i: "pivot2", x: 4, y: 0, w: 4, h: 4,  minW: 4,
  //   minH: 4 },
  // Puedes añadir más configuraciones de layout aquí
);
const [itemsSelected,SetItemsSelected] = useState(['pivot1-Bubble'])
const [SettingsItems,SetSettingsItems] = useState([
  {
    itemID:`pivot1-Bubble`,
    dataSourceSettings:{},
    Title:''
  },
  {
    itemID:`pivot2-Table`,
    dataSourceSettings:{},
    Title:''
  },
])
const [DrawerPosicion,SetDrawerPosicion] = useState(false)

const [newCounter, setNewCounter] = useState(0);
const Referencia = useRef(null)

const [cols, setCols] = useState(defaultCols);
  // const [FiltrosPanel,setFiltrosPanel] = useState({})
  const [Columnas,setColumnas] = useState(ColumnasCubo)
  // const [Graficos,setGraficos] = useState(ExGraficos)
  const [PanelGraficos,setPanelGraficos] = useState([])
  const [DatosCalculo,SetDatosCalculo] = useState([])
  const [loading,SetLoading] = useState(false)
  const [PanelFilas,SetPanelFilas] = useState([])
  const {
    token: { colorBgLayout, colorTextTertiary },
  } = theme.useToken();
  const [HiddenPanelElementosCDatos,SetHiddenPanelElementosCDatos] = useState(false)
  const [HiddenSettingCubo,SetHiddenSettingCubo] = useState(false)
  const [layout, setLayout] = useState([]);
  const [PanelFiltros,SetPanelFiltros] = useState([])
  const [PanelColumnas,SetPanelColumnas] = useState([])
  const [ModalLoading,SetModalLoading] = useState(false)
  const [PanelValores,SetPanelValores] = useState([])
 
  const [HiddenPanelGraficos,SetHiddenPanelGraficos] = useState(false)
  const [valueSegmentedfx1, setValuevalueSegmentedfx1] = useState('Editor');
  const [FiltrosOpened,setFiltrosOpened] = useState(false)
  const [activeKey, setActiveKey] = useState(null);
  const itemRefs = useRef({});


  const onLayoutChange = (layout) => {
    // console.log(layout)
    // console.log(itemsSelected)
    const newLayout = layout.map(x=>{
      if(itemsSelected.includes(x.i))
      {
        return {...x,selected:true}
      }
      else{
        return {...x,selected:false}
      }
    })
    // console.log(SettingsItems)
    const newLayout2 = newLayout.map(x=>{
      if(SettingsItems.map(x=>x.itemID).includes(x.i))
      {
       
        return {...x,
          dataSourceSettings:SettingsItems.find(y=>y.itemID===x.i).dataSourceSettings,
          Title:SettingsItems.find(y=>y.itemID===x.i).Title,
        }
      }
     else{
      return {...x,dataSourceSettings:{},Title:''}

     }
      
    })
    // console.log(newLayout2)
    setItems(newLayout2)
   
  };
  const ConfigurarFilterDrill = (e)=>{
    console.log(e)
  }
  const addItemToSelectedItems = (id) => {

    message.info(id);
  
    // Establecer el id seleccionado en el array; si ya está seleccionado, lo mantenemos, si no, lo actualizamos
    const newSelected = [id]; // Solo se permite un solo seleccionado
  
    // Actualizar el layout, marcando como seleccionado solo el elemento actual
    const newLayout = items.map(x => ({
      ...x,
      selected: x.i === id // Marcar como seleccionado si el id coincide
    }));
    console.log('NO SE DEBERIA RENDERIZAR ESTO')
    console.log(newLayout);
  
    // Actualizar el estado con el nuevo layout y el único id seleccionado
    setItems(newLayout);
    SetItemsSelected(newSelected); // Solo un id seleccionado
  };
  const addDataSourceSettings = (id,selectedDataSourceSettings)=>{
    console.log(id)
    console.log(selectedDataSourceSettings)
    const idselected = id[0]
    const nuevo = SettingsItems.map(x=>{
      if(x.itemID===idselected)
      {
        return {...x,dataSourceSettings:selectedDataSourceSettings}
      }
      else{
        return {...x,dataSourceSettings:{}}
      }
    })
    console.log(nuevo)
    const nuevoLayout = items.map(x=>({
      ...x,
      dataSourceSettings:nuevo.map(x=>x.itemID).includes(x.i).dataSourceSettings
    }))
    SetSettingsItems(nuevo)
    setItems(nuevoLayout);
  
  }
  // const addItemToSelectedItems = (id) => {
  //   message.info(id);
  
  //   // Convertir el array actual a un Set para gestionar seleccionados sin duplicados
  //   const actualSet = new Set(itemsSelected);
  
  //   // Verificar si el elemento ya está seleccionado
  //   if (actualSet.has(id)) {
  //     // Si ya está, lo removemos (deseleccionamos)
  //     actualSet.delete(id);
  //   } else {
  //     // Si no está, lo agregamos (seleccionamos)
  //     actualSet.add(id);
  //   }
  
  //   // Convertimos el Set a un array para actualizar el estado
  //   const actualArray = Array.from(actualSet);
  
  //   // Actualizamos el layout, cambiando el estado de seleccionado según los seleccionados
  //   const newLayout = items.map(x => ({
  //     ...x,
  //     selected: actualSet.has(x.i) // Si el item está en el set, lo marcamos como seleccionado
  //   }));
  
  //   console.log(newLayout);
  
  //   // Actualizamos el estado con el nuevo layout y la lista de seleccionados
  //   setItems(newLayout);
  //   SetItemsSelected(actualArray);
  // };
  
  function chartOnLoad(args) {
    let selectedTheme = 'Material';
  
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
  }
  
  useEffect(() => {

    pivotRefs.current = items.map((_, index) => pivotRefs.current[index] || React.createRef());
   
  }, [items])
  
const onRemoveItem = (i) => {
  console.log("removing", i);
  const itEl = SettingsItems.filter(item=>item.itemID!==i)
    SetSettingsItems(itEl)
    if(itEl.length!==0)
    {
      const nItem = SettingsItems.filter(item=>item.itemID!==i)[0].itemID
      console.log(nItem)
      console.log([nItem])
      SetItemsSelected([nItem])
    }
    if(itEl.length===0)
    {
      SetItemsSelected(itEl)
    }
    
    setItems(items.filter(item => item.i !== i));
  
  
};
// useEffect(() => {
//   console.log(DatosCalculo)
// }, [DatosCalculo])

const CreateElement = (el,index) => {
  if(SettingsItems.find(x=>x.itemID===el.i))
  {
    const typechart = el.i.substring(el.i.indexOf('-')+1,el.i.length)
    console.log(typechart)
    const dt = SettingsItems.find(x=>x.itemID===el.i).dataSourceSettings 
    console.log(dt)
      return (<div key={el.i} data-grid={el} 
        style={{borderWidth:'1px',borderColor:el.selected?'#3da6fb':'#dedede'}}
        className='col'
        onClick={()=>{addItemToSelectedItems(el.i)}}
        >
          
        <div className='row gx-0 my-1'>
    
          <div className='d-flex col-2 '>
          <IconButton size='small'  className='react-grid-dragHandleExample'>
            <MdOutlineDragIndicator/>
          </IconButton>
          {/* <IconButton
            size='small' 
              className="add text"
              onClick={()=>{onAddItem(typechart)}}
             
            >
              
              <CgDuplicate />
      
            </IconButton> */}
          </div>
      
           
        
            <div className='d-flex col-8' >
    
          <h5 className='text-truncate py-1'>{el.Title}</h5>
          </div>
    
          <div className='d-flex justify-content-end col-2' >
            <Dropdown
             menu={{
              items:[
                // {
                //   label:'Incluir y Excluir filas',
                //   key:'IncludeExclude'
                // }
              ],
              onClick:(e)=>{ ConfigurarFilterDrill(e)},
            }}
            trigger={['click']}
            >
          <IconButton size='small' >
            <SlOptionsVertical/>
            
          </IconButton>
          </Dropdown>
          <IconButton size='small'   className="remove" onClick={(event) =>
          {
             event.stopPropagation();
             onRemoveItem(el.i)
          }
             }>
            <IoClose/>
          </IconButton>
          </div>
          </div>
         <div className='row gx-0'>
          
          <PivotViewComponent 
              id={el.i}
              
              key={el.i.toString()}
              ref={pivotRefs.current[index]}
              chartSettings={{ chartSeries: { type: typechart}}}
              displayOption={{ view: typechart==='Table'?'Table':'Chart'}}
              dataSourceSettings={dt}
              allowConditionalFormatting={true}
  
               height={`${el.h*100}`}
           width={`${el.w*100}`}
          >
              <Inject services={[PivotChart,FieldList,ConditionalFormatting]}/>
            </PivotViewComponent>
         
          </div>
        </div>)
  }
  
  
    
};

// Cambia las columnas según el punto de quiebre (breakpoint)
const onBreakpointChange = (breakpoint, cols) => {
  console.log(cols)


  // message.info('sucedio')
  setCols(cols);
};
const onAddItem = (TypeChart) => {
  console.log(TypeChart)
  setItems([
    ...items,
    {
      i: `pivot${items.length+1}-${TypeChart}`,
      x: Infinity,
      y: Infinity, // lo pone al final
      w: 4,
      h: 4,
      selected:false,
      dataSourceSettings:{},
      Title:'',

      // KindChart:KindChart,
      // FamilyChart:FamilyChart,
      minW:  4, 
      minH:  4,
      
    }
  ]);
  SetSettingsItems([
    ...SettingsItems,
    {
      itemID:`pivot${SettingsItems.length+1}-${TypeChart}`,
      dataSourceSettings:{},
      Title:''
    },

  ])
};


  const SetValueNavigatorPanel = (value)=>{
    setValuevalueSegmentedfx1(value)
  }
  return (
    <div className='overflow-hidden' style={{
      display:'flex',
      overflow:'hidden',
      flexDirection:'column',
      maxHeight:'100%'
    }}>
      {contextHolder}
      <header className="navbar sticky-top  flex-md-nowrap p-0 py-1 shadow" style={{background:'#40444b'}}>
      <Space className='d-flex align-items-center mx-4 my-1 px-2' style={{background:'#5ab3fb',borderRadius:'2px' ,borderColor:'#bad1f2',borderWidth:'0.1px'}}>
      <Title  level={4} style={{ color: 'white', padding: '10px' , marginBottom:'0px' }}>4Dimension</Title>
      <div className='px-1' style={{borderWidth:'3px',borderColor:'#bad1f2'}}>
      <IoMdCube style={{color:'#FFFFFF'}}/>  
      </div>
      </Space>
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
      <Drawer open={DrawerPosicion}
      onClose={()=>{SetDrawerPosicion(false)}}
      >
        <Card>
          
        </Card>
      </Drawer>
      <div className='d-flex row vh-100' style={{borderTopWidth:'1px',borderColor:'#adadad'}}>
    
      
        <div className='col align-items-center' style={{background:colorBgLayout, minHeight: 'calc(100vh - 8.2rem)',maxWidth:'2.5rem'
          ,borderRightWidth:'1px',borderColor:'#adadad'
        }}>
          <div className='row p-1 ' style={{borderRadius:'1px',backgroundColor:'#FFFFFF',borderColor:'#CACACA',borderWidth:'0.2px'}}>
            <IconButton  style={{borderRadius:'1px'}} onClick={()=>{SetDrawerPosicion(true)}}>
              <FaList/>
            </IconButton>
          </div>
          <div className='row p-1' style={{borderRadius:'1px',backgroundColor:'#FFFFFF',borderColor:'#CACACA',borderWidth:'0.2px'}}>
          <IconButton style={{borderRadius:'1px'}} onClick={()=>{SetHiddenPanelElementosCDatos(!HiddenPanelElementosCDatos)}}>
                <FaDatabase/>
              </IconButton>
          </div>
          <div className='row p-1' style={{borderRadius:'1px',backgroundColor:'#FFFFFF',borderColor:'#CACACA',borderWidth:'0.2px'}}>
          <IconButton style={{borderRadius:'1px'}}   onClick={()=>{SetValueNavigatorPanel('Editor')}}>
                <PiSquaresFourFill />
              </IconButton>
          </div>
          <div className='row p-1' style={{borderRadius:'1px',backgroundColor:'#FFFFFF',borderColor:'#CACACA',borderWidth:'0.2px'}}>
          <IconButton style={{borderRadius:'1px'}}  onClick={()=>{SetValueNavigatorPanel('Filtros')}}>
                <FilterAltOutlined />
              </IconButton>
          </div>
          <div className='row p-1' style={{borderRadius:'1px',backgroundColor:'#FFFFFF',borderColor:'#CACACA',borderWidth:'0.2px'}}>
          <IconButton style={{borderRadius:'1px'}} size='small' onClick={()=>{SetValueNavigatorPanel('Formato')}}>
                <MdOutlineFormatColorFill />
              </IconButton>
          </div>
          <div className='row p-1' style={{borderRadius:'1px',backgroundColor:'#FFFFFF',borderColor:'#CACACA',borderWidth:'0.2px'}}>
          <IconButton  onClick={()=>{SetHiddenPanelGraficos(!HiddenPanelGraficos)}} style={{borderRadius:'1px'}}>
                <BarChart />
              </IconButton>
          </div>
        </div>
        
       
        {/* PANEL DE CUBO */}
        
       <Panel
       items = {items}
       setItems={setItems}
       SetSettingsItems={SetSettingsItems}
        SettingsItems={SettingsItems}
       itemsSelected={itemsSelected}
       addDataSourceSettings={addDataSourceSettings}
       SetDatosCalculo={SetDatosCalculo}
       SetHiddenPanelElementosCDatos={SetHiddenPanelElementosCDatos}
       HiddenPanelElementosCDatos={HiddenPanelElementosCDatos}
       setValuevalueSegmentedfx1={setValuevalueSegmentedfx1}
       valueSegmentedfx1={valueSegmentedfx1}
       />
      
        <div  className=' col flex-grow-1 overflow-y-scroll' style={{
                       
                          padding: 10,
                          width: 'auto',
                          maxHeight:'94vh',
                          // maxHeight:'87vh',
                          borderRadius:5
                        }}
                        // Asignar el ref a la columna       
                        >
           <ResponsiveReactGridLayout
           
                  draggableHandle=".react-grid-dragHandleExample"
                  // onLayoutChange={(newLayout) => setItems(newLayout)}
                  onLayoutChange={onLayoutChange}
             onBreakpointChange={onBreakpointChange}
             layout={items}
             className="layout"
             cols={defaultCols}
             rowHeight={rowHeight}
            >
              
             {items.map((el, index) => CreateElement(el,index))}
              {/* {CreateElement()} */}
            </ResponsiveReactGridLayout>                

        </div>
        {HiddenPanelGraficos?
        <div className='col px-0 aling-items-center justify-content-center'
        style={{background:'#9ab7e0',maxWidth:'14rem',borderLeftWidth:'1px',borderColor:'#4c5562'}}>
   <div className='d-flex col aling-items-center justify-content-center py-2'>
        <IconButton style={{padding:'1px',marginRight:'16px'}} >
           <FaChartBar color='#FFFFFF' size={18}/>
          </IconButton>
          <h6 style={{color:'#FFFFFF',fontSize:'14.5px',fontWeight:'bold'}}>Galeria de graficos</h6>
           </div>

          <div 
         className='flex-lg-1 h-screen  overflow-y-lg-auto  ' 
          style={{
                       background:colorBgLayout,
                      padding: 10,
                        // width: 'auto',

                       // maxHeight:'84vh',
                       borderRadius:1
                      }}
                   >
                    <div className='row row-cols-4 d-flex justify-content-center align-items-center p-2'>

                   
               {ExGraficos.map(x=>{return (
                <IconButton style={{padding:0,borderRadius:1}} onClick={()=>{onAddItem(x.Tipo)}}>
                <div
              
                className='col justify-content-center align-items-center d-flex'
                style={{
                                                        userSelect: "none",
                                                        padding: 1,
                                                        margin:3,
                                                        borderRadius:1,
                                                        fontSize:'14px',
                                                        color:'#0d4178',
                                                        height:'44px',
                                                        fontWeight:500,
                                                        borderWidth:'0.2px',
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

export default App;
