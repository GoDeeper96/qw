import logo from './logo.svg';
import './App.css';
import { Button, Card, Collapse, Drawer, Input, Layout, message, Modal, notification, Segmented, Space, Spin, Splitter, Tag, theme, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { ArrowLeftOutlined, ArrowRightOutlined, BarChart, EditOutlined, Filter2Outlined, FilterAltOutlined, FilterOutlined, KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined, List, ListAltRounded, RefreshOutlined, SearchOutlined, X } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { IoArrowUndoSharp, IoClose, IoCube } from "react-icons/io5";
import { IoArrowUndo } from "react-icons/io5";
import { CgDuplicate } from "react-icons/cg";
import { Inject, PivotChart, PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import { SlOptionsVertical } from "react-icons/sl";

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
import { MdOutlineDragIndicator } from "react-icons/md";
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
const [items, setItems] = useState([  { i: `pivot1-Bubble`, x: 0, y: 0, w: 4, h: 4,minW:4,minH:4 },
  { i: `pivot2-Table`, x: 4, y: 0, w: 4, h: 4,minW:4,minH:4 }]
  // { i: "pivot1", x: 0, y: 0, w: 4, h:4,  minW: 4,
  //   minH: 4 },
  // { i: "pivot2", x: 4, y: 0, w: 4, h: 4,  minW: 4,
  //   minH: 4 },
  // Puedes añadir más configuraciones de layout aquí
);
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
  const openNotificationWithIcon = (type,msg,desc) => {
    api[type]({
      duration:8,
      message: msg,
      description:desc
    });
  };
  const [activeKey, setActiveKey] = useState(null);
  const itemRefs = useRef({});


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

 
  
  function chartOnLoad(args) {
    let selectedTheme = 'Material';
  
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
  }
  
  useEffect(() => {

    pivotRefs.current = items.map((_, index) => pivotRefs.current[index] || React.createRef());
   
  }, [items])
  
const onRemoveItem = (i) => {
  console.log("removing", i);
  setItems(items.filter(item => item.i !== i));
};


// const CreateElement = () => {



//   return items.map((item,index)=>
//     <div key={item.i} data-grid={item} 
//     style={{borderWidth:'1px'}}
//     className='col'
    
//     >
      
//     <div className='row gx-0 my-1'>

//       <div className='d-flex col-2 '>
//       <IconButton size='small'  className='react-grid-dragHandleExample'>
//         <MdOutlineDragIndicator/>
//       </IconButton>
//       <IconButton
//         size='small' 
//           className="add text"
//           onClick={()=>{onAddItem(item.TypeChart)}}
         
//         >
          
//           <CgDuplicate />
  
//         </IconButton>
//       </div>
  
       
    
//         <div className='d-flex col-8' >

//       <h5 className='text-truncate py-1'>{JSON.stringify(item.TypeChart)}</h5>
//       </div>

//       <div className='d-flex justify-content-end col-2' >
//       <IconButton size='small' >
//         <SlOptionsVertical/>
//       </IconButton>
//       <IconButton size='small'   className="remove" onClick={() => onRemoveItem(item.i)}>
//         <IoClose/>
//       </IconButton>
//       </div>
//       </div>
//      <div className='row gx-0'>
      
//       <PivotViewComponent 
//           id={item.i}
          
//           key={item.i.toString()}
//           ref={pivotRefs.current[index]}
//           chartSettings={{ chartSeries: { type: 'Bubble' }}}
//           displayOption={{ view: 'Chart'}}
//           dataSourceSettings={{
                
//                 enableSorting: true,
//                 rows: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
//                 columns: [{ name: 'Country' }, { name: 'Products' }],
//                 valueSortSettings: { headerDelimiter: ' - ' },
//                 dataSource: [{
//                   "In_Stock": 34,
//                   "Sold": 51,
//                   "Amount": 383,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "Retail Outlets",
//                   "Year": "FY 2015",
//                   "Quarter": "Q1"
//               },
//               {
//                   "In_Stock": 4,
//                   "Sold": 423,
//                   "Amount": 3595.5,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "Sales Person",
//                   "Year": "FY 2015",
//                   "Quarter": "Q1"
//               },
//               {
//                   "In_Stock": 38,
//                   "Sold": 234,
//                   "Amount": 1813.5,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "Teleshopping",
//                   "Year": "FY 2015",
//                   "Quarter": "Q1"
//               },
//               {
//                   "In_Stock": 42,
//                   "Sold": 127,
//                   "Amount": 952.5,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "App Store",
//                   "Year": "FY 2015",
//                   "Quarter": "Q1"
//               },
//               {
//                   "In_Stock": 36,
//                   "Sold": 89,
//                   "Amount": 668,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "Retail Outlets",
//                   "Year": "FY 2015",
//                   "Quarter": "Q2"
//               },
//               {
//                   "In_Stock": 17,
//                   "Sold": 340,
//                   "Amount": 2890,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "Sales Person",
//                   "Year": "FY 2015",
//                   "Quarter": "Q2"
//               },
//               {
//                   "In_Stock": 22,
//                   "Sold": 379,
//                   "Amount": 2937.25,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "Teleshopping",
//                   "Year": "FY 2015",
//                   "Quarter": "Q2"
//               },
//               {
//                   "In_Stock": 12,
//                   "Sold": 269,
//                   "Amount": 2017.5,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "App Store",
//                   "Year": "FY 2015",
//                   "Quarter": "Q2"
//               },
//               {
//                   "In_Stock": 28,
//                   "Sold": 15,
//                   "Amount": 113,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "Retail Outlets",
//                   "Year": "FY 2015",
//                   "Quarter": "Q3"
//               },
//               {
//                   "In_Stock": 46,
//                   "Sold": 369,
//                   "Amount": 3136.5,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "Sales Person",
//                   "Year": "FY 2015",
//                   "Quarter": "Q3"
//               },
//               {
//                   "In_Stock": 16,
//                   "Sold": 410,
//                   "Amount": 3177.5,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "Teleshopping",
//                   "Year": "FY 2015",
//                   "Quarter": "Q3"
//               },
//               {
//                   "In_Stock": 18,
//                   "Sold": 99,
//                   "Amount": 742.5,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "App Store",
//                   "Year": "FY 2015",
//                   "Quarter": "Q3"
//               },
//               {
//                   "In_Stock": 50,
//                   "Sold": 50,
//                   "Amount": 375.5,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "Retail Outlets",
//                   "Year": "FY 2015",
//                   "Quarter": "Q4"
//               },
//               {
//                   "In_Stock": 31,
//                   "Sold": 129,
//                   "Amount": 1096.5,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "Sales Person",
//                   "Year": "FY 2015",
//                   "Quarter": "Q4"
//               },
//               {
//                   "In_Stock": 23,
//                   "Sold": 404,
//                   "Amount": 3131,
//                   "Country": "France",
//                   "Product_Categories": "Accessories",
//                   "Products": "Bottles and Cages",
//                   "Order_Source": "Teleshopping",
//                   "Year": "FY 2015",
//                   "Quarter": "Q4"
//               }],
//                 expandAll: false,
//                 drilledMembers: [{ name: 'Year', items: ['FY 2015'] }],
//                 formatSettings: [{ name: "Amount", format: "C" }],
//                 values: [{ name: "Amount", caption: "Sales Amount" }],
//                 filters: []
//           }} 
//            height={`${item.h*100}`}
//        width={`${item.w*100}`}
//       >
//           <Inject services={[PivotChart]}/>
//         </PivotViewComponent>
     
//       </div>
//     </div>
//     )
// };
const CreateElement = (el,index) => {
  const typechart = el.i.substring(el.i.indexOf('-')+1,el.i.length)
  
  // message.info(typechart)
  return (<div key={el.i} data-grid={el} 
    style={{borderWidth:'1px'}}
    className='col'
    
    >
      
    <div className='row gx-0 my-1'>

      <div className='d-flex col-2 '>
      <IconButton size='small'  className='react-grid-dragHandleExample'>
        <MdOutlineDragIndicator/>
      </IconButton>
      <IconButton
        size='small' 
          className="add text"
          onClick={()=>{onAddItem(el.i)}}
         
        >
          
          <CgDuplicate />
  
        </IconButton>
      </div>
  
       
    
        <div className='d-flex col-8' >

      <h5 className='text-truncate py-1'>{typechart}</h5>
      </div>

      <div className='d-flex justify-content-end col-2' >
      <IconButton size='small' >
        <SlOptionsVertical/>
      </IconButton>
      <IconButton size='small'   className="remove" onClick={() => onRemoveItem(el.i)}>
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
          dataSourceSettings={{
                
                enableSorting: true,
                rows: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
                columns: [{ name: 'Country' }, { name: 'Products' }],
                valueSortSettings: { headerDelimiter: ' - ' },
                dataSource: [{
                  "In_Stock": 34,
                  "Sold": 51,
                  "Amount": 383,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "Retail Outlets",
                  "Year": "FY 2015",
                  "Quarter": "Q1"
              },
              {
                  "In_Stock": 4,
                  "Sold": 423,
                  "Amount": 3595.5,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "Sales Person",
                  "Year": "FY 2015",
                  "Quarter": "Q1"
              },
              {
                  "In_Stock": 38,
                  "Sold": 234,
                  "Amount": 1813.5,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "Teleshopping",
                  "Year": "FY 2015",
                  "Quarter": "Q1"
              },
              {
                  "In_Stock": 42,
                  "Sold": 127,
                  "Amount": 952.5,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "App Store",
                  "Year": "FY 2015",
                  "Quarter": "Q1"
              },
              {
                  "In_Stock": 36,
                  "Sold": 89,
                  "Amount": 668,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "Retail Outlets",
                  "Year": "FY 2015",
                  "Quarter": "Q2"
              },
              {
                  "In_Stock": 17,
                  "Sold": 340,
                  "Amount": 2890,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "Sales Person",
                  "Year": "FY 2015",
                  "Quarter": "Q2"
              },
              {
                  "In_Stock": 22,
                  "Sold": 379,
                  "Amount": 2937.25,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "Teleshopping",
                  "Year": "FY 2015",
                  "Quarter": "Q2"
              },
              {
                  "In_Stock": 12,
                  "Sold": 269,
                  "Amount": 2017.5,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "App Store",
                  "Year": "FY 2015",
                  "Quarter": "Q2"
              },
              {
                  "In_Stock": 28,
                  "Sold": 15,
                  "Amount": 113,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "Retail Outlets",
                  "Year": "FY 2015",
                  "Quarter": "Q3"
              },
              {
                  "In_Stock": 46,
                  "Sold": 369,
                  "Amount": 3136.5,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "Sales Person",
                  "Year": "FY 2015",
                  "Quarter": "Q3"
              },
              {
                  "In_Stock": 16,
                  "Sold": 410,
                  "Amount": 3177.5,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "Teleshopping",
                  "Year": "FY 2015",
                  "Quarter": "Q3"
              },
              {
                  "In_Stock": 18,
                  "Sold": 99,
                  "Amount": 742.5,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "App Store",
                  "Year": "FY 2015",
                  "Quarter": "Q3"
              },
              {
                  "In_Stock": 50,
                  "Sold": 50,
                  "Amount": 375.5,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "Retail Outlets",
                  "Year": "FY 2015",
                  "Quarter": "Q4"
              },
              {
                  "In_Stock": 31,
                  "Sold": 129,
                  "Amount": 1096.5,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "Sales Person",
                  "Year": "FY 2015",
                  "Quarter": "Q4"
              },
              {
                  "In_Stock": 23,
                  "Sold": 404,
                  "Amount": 3131,
                  "Country": "France",
                  "Product_Categories": "Accessories",
                  "Products": "Bottles and Cages",
                  "Order_Source": "Teleshopping",
                  "Year": "FY 2015",
                  "Quarter": "Q4"
              }],
                expandAll: false,
                drilledMembers: [{ name: 'Year', items: ['FY 2015'] }],
                formatSettings: [{ name: "Amount", format: "C" }],
                values: [{ name: "Amount", caption: "Sales Amount" }],
                filters: []
          }} 
           height={`${el.h*100}`}
       width={`${el.w*100}`}
      >
          <Inject services={[PivotChart]}/>
        </PivotViewComponent>
     
      </div>
    </div>)
    
};

// Cambia las columnas según el punto de quiebre (breakpoint)
const onBreakpointChange = (breakpoint, cols) => {
  console.log(cols)


  message.info('sucedio')
  setCols(cols);
};
const onAddItem = (TypeChart) => {

  setItems([
    ...items,
    {
      i: `pivot${items.length+1}-${TypeChart}`,
      x: Infinity,
      y: Infinity, // lo pone al final
      w: 4,
      h: 4,
    
      // KindChart:KindChart,
      // FamilyChart:FamilyChart,
      minW:  4, 
      minH:  4,
      
    }
  ]);
  
};
const onAddColumns = (name)=>{
    SetPanelColumnas([
      ...PanelColumnas,{
        name:name,
        value:name
      }
    ])
}

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
      <header className="navbar sticky-top  flex-md-nowrap p-0 py-1 shadow" style={{background:'#000000'}}>
      <Space className='d-flex align-items-center'>
      <Title level={4} style={{ color: 'white', padding: '10px' , marginBottom:'0px' }}>4Dimension</Title>
      <div style={{borderWidth:'3px',borderColor:'#FFFFFF'}}>
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
      {/* <div className='row'>
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
      </div> */}
      <Drawer open={DrawerPosicion}
      onClose={()=>{SetDrawerPosicion(false)}}
      >
        <Card>
          {items.map(x=>{
            return(
              <div>
                
                {isNaN(cols)?cols.lg:cols } = 
                { x.i}= {x.x} + {x.y} + {x.w} + {x.h} + TamañoRealLargo: {x.h*100} + TamañoAncho: {x.w*100}
              </div>
            )
          })}
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
                <FilterAltOutlined/>
              </IconButton>
          </div>
          <div className='row p-1' style={{borderRadius:'1px',backgroundColor:'#FFFFFF',borderColor:'#CACACA',borderWidth:'0.2px'}}>
          <IconButton style={{borderRadius:'1px'}} size='small' onClick={()=>{SetValueNavigatorPanel('Formato')}}>
                <SettingOutlined/>
              </IconButton>
          </div>
          <div className='row p-1' style={{borderRadius:'1px',backgroundColor:'#FFFFFF',borderColor:'#CACACA',borderWidth:'0.2px'}}>
          <IconButton  onClick={()=>{SetHiddenPanelGraficos(!HiddenPanelGraficos)}} style={{borderRadius:'1px'}}>
                <BarChart/>
              </IconButton>
          </div>
        </div>
        
       
        {/* PANEL DE CUBO */}
        
       <Panel
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
                  onLayoutChange={(newLayout) => setItems(newLayout)}
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
        style={{background:'#FFFFFF',maxWidth:'14rem',borderLeftWidth:'1px',borderColor:'#adadad'}}>
   <div className='d-flex col aling-items-center justify-content-center mt-2'>
        <IconButton style={{padding:'1px',marginRight:'16px'}} >
           <FaChartBar size={16}/>
          </IconButton>
          <TituloBarra1>Galeria de graficos</TituloBarra1>
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
