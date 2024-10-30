import React from 'react'
import useThemeTokens from '../../utilities/useThemeTokens'
import { Collapse, DatePicker, Select, Space } from 'antd'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid';
import { IoClose } from 'react-icons/io5';
import { IconButton } from '@mui/material';
import { ColumnasCubo } from '../../data/EjemploColumnas';
import moment from 'moment/moment';
import dayjs from 'dayjs';

const Filters = (props) => {
  const { colorBgLayout,colorTextTertiary } = useThemeTokens()
  const handleCollapseChange = ()=>{

  }
  const onChangeSelect = (value,Columna)=>{
    if(value)
    {

      props.SetFilteredFilters((prevState) => ({
        ...prevState,
        [Columna]: { $in: value },  // Clave dinámica
      }));
    }
  }
 
  const onChangeSelectDate = (value,Columna)=>{
    if(value&&value.length===2)
    {
      console.log(value)
      props.SetFilteredFilters((prevState) => ({
        ...prevState,
        [Columna]: { $gte:moment(value[0].$d).format('YYYY-MM-DD') ,$lte: moment(value[1].$d).format('YYYY-MM-DD')},  // Clave dinámica
      }));
    }
  }
  const EliminarColumna = (Panel,key)=>{

    if(Panel==='PanelValores')
    {
      const updatedPanelValores = { ...props.PanelValores };
      delete updatedPanelValores[key]; // Elimina la clave (columna) específica
      props.SetPanelValores(updatedPanelValores);
  
    }
  }
  const getOptionsFiltered = (ValorColumna) =>{
    // console.log(props.FilteredFilters)
    // console.log(props.FilteredFilters[ValorColumna])
    if(Object.keys(props.FilteredFilters).length===0)
    {
      return []
    }
    else{
      // console.log(props.FilteredFilters[ValorColumna].$in)
      return props.FilteredFilters[ValorColumna].$in.map(x=>({
        label:x,
        value:x
      }))
    }
   
  }
  const getOptionsFilteredDate = (ValorColumna) =>{
    // console.log(props.FilteredFilters)
    // console.log(props.FilteredFilters[ValorColumna])
    if(Object.keys(props.FilteredFilters).length===0)
    {
      return dayjs(null)
    }
    else{
      // console.log(props.FilteredFilters[ValorColumna].$in)
      return [dayjs(props.FilteredFilters[ValorColumna].$gte),dayjs(props.FilteredFilters[ValorColumna].$lte)]
    }
   
  }
  const getOptions = (ValorColumna) =>{
    // console.log(props.PanelFiltros[ValorColumna].$in)
    if(Object.keys(props.PanelFiltros).length===0)
    {
   
      return []
    }
    else{
      return props.PanelFiltros[ValorColumna].$in.map(x=>({
        label:x,
        value:x
      }))
    }
   
  }
  const EliminarFiltro = (item)=>{
    console.log(item)
    // console.log(props.PanelFiltros)
    // console.log(props.FilteredFilters)
    // console.log('test')
    // Crear una copia del objeto `PanelFiltros` para no modificar el original directamente
    const objetoActual = { ...props.PanelFiltros };

    // Eliminar la propiedad en la copia del objeto
    delete objetoActual[item];

    console.log(objetoActual);

    // Actualizar el estado con el nuevo objeto sin el atributo eliminado
    props.SetPanelFiltros(objetoActual);
    props.SetFilteredFilters(objetoActual);

  }
  return (
    <div>
    <div  className='overflow-y-lg-auto'
    style={{
                 padding:1,
                 borderRadius:1,
                 color: colorTextTertiary,
                 background: colorBgLayout,
                 borderWidth:'1px',
                 borderColor:'#c9e5fb', 
               
               }}>
                
                <Droppable
                 index={1}
                          key={`${uuidv4()}-PanelFiltros`}
        droppableId={`${uuidv4()}-PanelFiltros`} // ID único para el droppable
      >
        
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex-grow-1 overflow-auto"
            style={{  height:'70vh',  
              // background: '#faf9f9', 
              borderTopWidth: '0.2px', borderBottomWidth: '0.2px' }}
          >
            {
              Object.keys(props.PanelFiltros).map((item, index) => (
                <div className='py-2' style={{borderBottomWidth:'1px'}}>
                  <div
               
               header={item} key={item}>
                <div className='col d-flex align-items-center'>
                <div  className='col-10 text-truncate'>
                <h6 className='mx-3 my-2'>{item}</h6>
                </div>
                <div className='col-2 '>
                <IconButton size='small' style={{borderRadius:'1px'}} 
                onClick={()=>{EliminarFiltro(item)}}>

                <IoClose style={{cursor:'pointer'}} color='red'
                />
                  </IconButton>
                  </div>
                </div>
                <div key={item} index={index}
                className='col d-flex justify-content-center'
              
                > 
                {ColumnasCubo.find(x=>x.name===item).TipoDato==='Date'?                           
                  <DatePicker.RangePicker       
                  value={getOptionsFilteredDate(item)}  
                  style={{ width: '10rem',borderRadius:'1px' }} 
               
             
                  onChange={(dates, option) => {
                    onChangeSelectDate(dates,item,'Date') }}
                  />
                  :<Select
                    value={getOptionsFiltered(item)}
                    onChange={(value, option) => {
                       onChangeSelect(value,item) }}
                    options={getOptions(item)}
                    allowClear
                    showSearch
                    virtual={true}
                    maxTagCount='responsive'
                    mode='multiple'
                    style={{ width: '10rem',borderRadius:'1px' }}
                  />
                  
                }
                </div>
                </div>
            
                </div>
              ))
            }
            {provided.placeholder} {/* Placeholder necesario para Droppable */}
          </div>
        )}
                </Droppable>
               
       </div>
       </div>
  )
}

export default Filters