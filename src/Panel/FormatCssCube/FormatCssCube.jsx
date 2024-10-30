import React, { useEffect, useState } from 'react'
import ButtonSecondary from '../../components/ButtonSecondary'
import { Card, ColorPicker, Form, Input, InputNumber, message, Modal, Select, Space, Switch, Tooltip } from 'antd'
import useThemeTokens from '../../utilities/useThemeTokens'
import ButonThird from '../../components/ButtonThird'
import { CalculateOutlined, Numbers, NumbersOutlined } from '@mui/icons-material'
import { TbBackground } from 'react-icons/tb'
import { IoClose } from 'react-icons/io5'
import { IconButton } from '@mui/material'
import { FxOperatorOne } from './utilities/OperatorXValue'
import ButtonAddNumericFormat from '../../components/ButtonAddNumericFormat'
import { EditOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import {

  evaluate,

} from 'mathjs'
import ButtonCalcular from '../../components/ButtonCalcular'
const FormatCssCube = (props) => {
  const [Titulo,SetTitulo] = useState('')
  const { colorBgLayout,colorTextTertiary } = useThemeTokens()
  const [FiltrosCondicionales,SetFiltrosCondicionales] = useState([])
  const [ModalCondicionales,SetModalCondicionales] = useState(false)
  const [FormularioFormato] = Form.useForm()
  const [NuevoObjetoFiltros,SetNuevoObjetoFiltros] = useState({})
  const [ModalActualizar,SetModalActualizar] = useState(false)
  const [indexCondition,SetindexCondition] = useState()
  const [Operador,SetOperador] = useState('')
  const [ValueFilter,SetValueFilter] = useState(0)
  const [ValueFilter2,SetValueFilter2] = useState(0)
  const [TamañoCelda,SetTamañoCelda] = useState('')
  const [ColorCelda,SetColorCelda] = useState('')
  const [ColorNumero,SetColorNumero] = useState('')
  const [Measure,SetMeasure] = useState('')
  const [Fx,SetFx] = useState('')

  const [NombreCampo,SetNombreCampo] = useState('')
  const [TipoFormato,SetTipoFormato] = useState('')
  const [Agrupamiento,SetAgrupamiento] = useState(false)
  const [FormatoReal,SetFormatoReal] = useState('')
  const [DecimalesCantidad,SetDecimalesCantidad] = useState(0)
  const [FormatoCustom,SetFormatoCustom] = useState('')
  const [CambioReal,SetCambioReal] = useState('PEN')
  const [ModalFormatSettingsActualizar,SetModalFormatSettingsActualizar] = useState(false)
  const [FormatoSettings,SetFormatoSettings] = useState([])
  const [ModalFormatSettings,SetModalFormatSettings] = useState(false)
  const AplicarNuevaConfiguracion= ()=>{
    
    if(Titulo&&Titulo!=='')
    { 
      const values = Titulo
      const seleccionado = props.itemsSelected[0]
      
      const nuevaData2 = props.SettingsItems.map(x=>{
        if(x.itemID===seleccionado)
        {
          return {...x,Title:values}
        }
        else{
          return {...x,Title:x.Title?x.Title:''}
        }
      })
      const nuevaData = props.items.map(x=>{
        if(x.i===seleccionado)
        {
          return {...x,Title:values}
        }
        else{
          return {...x,Title:x.Title?x.Title:''}
        }
      })
  
      
      props.SetSettingsItems(nuevaData2)
      props.setItems(nuevaData)
      
     
    }
    
  }
  
  
  
  const EliminarFiltroNumerico = (nameOne)=>{
    const nuevoMap = FormatoSettings.filter(x=>x.name!==nameOne)
    const seleccionado = props.itemsSelected[0]
    const ds = props.SettingsItems.find(x=>x.itemID===seleccionado)
    if(ds&&ds.dataSourceSettings&&
      Object.keys(ds.dataSourceSettings).length!==0
      )
      {
        const actualizar = props.SettingsItems.map(x=>{
          if(x.itemID===seleccionado)
            {
              return {...x,dataSourceSettings:{...x.dataSourceSettings,
                formatSettings:nuevoMap
              }}
            }
            else{
              return {...x}
            }
        })
        const actualizar2 = props.items.map(x=>{
          return {...x,dataSourceSettings:actualizar.find(y=>y.itemID===x.i).dataSourceSettings}
      })
      SetFormatoSettings(nuevoMap)
      props.SetSettingsItems(actualizar)
      props.setItems(actualizar2)
      }
  }
  const EliminarFiltroCondicional =(index)=>{
    const indexToInt = parseInt(index)
    const nuevoMap = FiltrosCondicionales.filter((x,index)=>index!==indexToInt)
    const seleccionado = props.itemsSelected[0]
    const ds = props.SettingsItems.find(x=>x.itemID===seleccionado)
    if(ds&&ds.dataSourceSettings&&Object.keys(ds.dataSourceSettings).length!==0)
      {
        const actualizar = props.SettingsItems.map(x=>{
          if(x.itemID===seleccionado)
            {
              return {...x,dataSourceSettings:{...x.dataSourceSettings,
                conditionalFormatSettings:nuevoMap
              }}
            }
            else{
              return {...x}
            }
        })
        const actualizar2 = props.items.map(x=>{
          return {...x,dataSourceSettings:actualizar.find(y=>y.itemID===x.i).dataSourceSettings}
      })
      SetFiltrosCondicionales(nuevoMap)
      props.SetSettingsItems(actualizar)
      props.setItems(actualizar2)
      }
  }
  const getOpcionesRows = ()=>{
    const seleccionado = props.itemsSelected[0]

  }
  const ActualizarVer = (index)=>{
    const indexToInt = parseInt(index)
    if(
      FiltrosCondicionales[indexToInt]&&
      Object.keys(FiltrosCondicionales[indexToInt]).length!==0)
      {
        // console.log(indexToInt)
        // console.log()
        console.log(FiltrosCondicionales[indexToInt])
        SetindexCondition(indexToInt)
        SetMeasure(FiltrosCondicionales[indexToInt].measure)
        SetNuevoObjetoFiltros(FiltrosCondicionales[indexToInt])
        SetOperador(FiltrosCondicionales[indexToInt].conditions)
        SetTamañoCelda(FiltrosCondicionales[indexToInt].style.fontSize)
        SetColorCelda(FiltrosCondicionales[indexToInt].style.backgroundColor)
        SetColorNumero(FiltrosCondicionales[indexToInt].style.color)
        if(FiltrosCondicionales[indexToInt].value2)
        {
          SetValueFilter2(FiltrosCondicionales[indexToInt].value2)
        }
        SetValueFilter(FiltrosCondicionales[indexToInt].value1)
        SetModalActualizar(true)
      }
  
  }
  // useEffect(() => {
  //   console.log('calling')
  //   if(Object.keys(NuevoObjetoFiltros).length!==0&&indexCondition)
  //   { 
  //     console.log('aqui?')
      
  //   }
  // }, [NuevoObjetoFiltros])
  
  const EsChartCorrecto = ()=>{
    const ChartType = props.itemsSelected[0].substring(
      props.itemsSelected[0].indexOf('-')+1,props.itemsSelected[0].length)
    if(ChartType==='Table')
    {
      console.log(FiltrosCondicionales)
      return(
        <div>
          <p className='mb-1' style={{ fontSize:'14px',color:'#ababab'}}>Filtros de Mapa de Calor:</p>
        <div 
        className='overflow-y-lg-auto py-2 mb-3'
        style={{
          borderWidth:'1px',
          height:'15rem',
          borderColor:colorBgLayout,
          backgroundColor:'#f5f8ff'
        }}
        >
          
          {FiltrosCondicionales.map((x,index)=>{
            return(
            <div
            onClick={()=>{ActualizarVer(index)}}
            className='mx-3 px-1 py-1 mb-2'
            style={{
              borderRadius:'1px',
              borderWidth:'1px',
              borderColor:'#8E8BFF',
              background:'#FFFFFF',
              color:'#8E8BFF',
              cursor:'pointer'
            }}
            key={index.toString()}

            >
              <div className='col d-flex align-items-center'>
                
              <div className='col-10  d-flex align-items-center' > 
              <ColorPicker
              style={{
                marginRight:'3px',
             
              }}
              disabled
              size='small'
              value={x.style.backgroundColor}/>
              <div className='text-truncate'>
              {x.measure}
              </div>
              </div>
              <div className='col-2 '>
              
                <IconButton size='small' style={{borderRadius:'1px'}} onClick={()=>{EliminarFiltroCondicional(index)}}>
              <IoClose color='red' style={{cursor:'pointer'}}/>
              </IconButton>
              </div>
              </div>ES
              {x.conditions.includes('Between') 
              ?  <p>{x.value1} {FxOperatorOne(x.conditions)} {x.value2}</p>:
              <p>{FxOperatorOne(x.conditions)} {x.value1}</p>
              }
              
            </div>)
          })}
          <div className='d-flex justify-content-center'>
          <ButonThird style={{width:'100%'}} className='mx-3'
          onClick={NuevoFormatoCondicional}
          >
            Agregar Filtro
          </ButonThird>

          </div>
        </div>
        </div>
      )
    }
  }
  const onChangeFx =(val) =>{
    if(val)
    {
      SetFx(val)
    }
    
  }
  const onCalculadora = ()=>{
    if(Fx.length!==0&&props.itemsSelected[0].length!==0)
    {
      const seleccionado = props.itemsSelected[0]
      const ds = props.SettingsItems.find(x=>x.itemID===seleccionado)
      if(ds.dataSourceSettings&&Object.keys(ds.dataSourceSettings).length!==0)
      {
        console.log(ds)
        let nuevoDataSource = []
        const dz = ds.dataSourceSettings
        try {
          for(const dos of dz.dataSource)
          {
            const valKeys = dz.values.map(x=>x.name)
            console.log(valKeys)
            for(const tres of valKeys)
            {
              const val = evaluate(`${dos[tres]}${Fx}`)
              nuevoDataSource.push({
                ...dos,
                [tres]:val
              })
            }
          }
          if(nuevoDataSource.length!==0)
          {
            const nuevoDs = props.SettingsItems.map(x=>{
              if(x.itemID===seleccionado)
              {
                return {...x,dataSourceSettings:{
                  ...x.dataSourceSettings,
                  dataSource:nuevoDataSource
                }}
              }
              else
              {
                return {...x}
              }
            })
            const actualizar2 = props.items.map(x=>{
              return {...x,dataSourceSettings:nuevoDs.find(y=>y.itemID===x.i).dataSourceSettings}
          })
            props.SetSettingsItems(nuevoDs)
            props.setItems(actualizar2)
          }
          console.log(nuevoDataSource)
        } catch (error) {
          message.error(error)
          console.log(error)
        }
      }
      
    }
  }
  const ActualizarFormatoCondicional = ()=>{
    const indexToInt = parseInt(indexCondition)
    let nuevoObjeto = {
      measure:Measure,
      value1:ValueFilter,
      value2:ValueFilter2,
      conditions:Operador,
      style:{
        backgroundColor:ColorCelda,
        color:ColorNumero,
        fontFamily:'Arial',
        fontSize:TamañoCelda
      }
    }
    const seleccionado = props.itemsSelected[0]
    const ds = props.SettingsItems.find(x=>x.itemID===seleccionado)
    if(ds&&ds.dataSourceSettings&&
      Object.keys(ds.dataSourceSettings).length!==0)
      {
        let newArrr =FiltrosCondicionales.map((x,index)=>{
          if(index===indexToInt)
          {
            return nuevoObjeto
          }
          else{
            return {...x}
          }
        })
        const actualizar = props.SettingsItems.map(x=>{
          if(x.itemID===seleccionado)
            {
              return {...x,dataSourceSettings:
                {...x.dataSourceSettings,
                conditionalFormatSettings:x.dataSourceSettings.conditionalFormatSettings.length!==0?
                newArrr:[]
              }}
            }
            else{
              return {...x}
            }
        })
        const actualizar2 = props.items.map(x=>{
          return {...x,dataSourceSettings:actualizar.find(y=>y.itemID===x.i).dataSourceSettings}
      })
      SetFiltrosCondicionales(newArrr)
      props.SetSettingsItems(actualizar)
      props.setItems(actualizar2)
      }
  }
  const ActualizarFormatoNumericoSi = ()=>{
   
    const seleccionado = props.itemsSelected[0]
    const ds = props.SettingsItems.find(x=>x.itemID===seleccionado)
    if(ds&&ds.dataSourceSettings&&
      Object.keys(ds.dataSourceSettings).length!==0)
      {
        let nuevoObjeto={
          name:NombreCampo,
          format:`${TipoFormato}${DecimalesCantidad}`,
          useGrouping:Agrupamiento,     
        }
        if(TipoFormato==='C')
        {
          nuevoObjeto.currency = CambioReal
        }
        if(TipoFormato==='Custom')
        {
          nuevoObjeto.format = FormatoCustom
          nuevoObjeto.useGrouping = false
        }
        let newArrr =FormatoSettings.map((x,index)=>{
          if(x.name===NombreCampo)
          {
            return nuevoObjeto
          }
          else{
            return {...x}
          }
        })
        const actualizar = props.SettingsItems.map(x=>{
          if(x.itemID===seleccionado)
            {
              return {...x,dataSourceSettings:{...x.dataSourceSettings,
                formatSettings:x.dataSourceSettings.formatSettings.length!==0?
                newArrr:[]
              }}
            }
            else{
              return {...x}
            }
        })
        const actualizar2 = props.items.map(x=>{
          return {...x,dataSourceSettings:actualizar.find(y=>y.itemID===x.i).dataSourceSettings}
      })
      SetFormatoSettings([...FormatoSettings,nuevoObjeto])
          props.SetSettingsItems(actualizar)
          props.setItems(actualizar2)
      }
  }
  //GuardarFormatoCondicional Y GuardarFormatoNumericoAhoraSi Son iguales
  const GuardarFormatoCondicional = ()=>{
    // SetModalCondicionales(true)
    const seleccionado = props.itemsSelected[0]
    const ds = props.SettingsItems.find(x=>x.itemID===seleccionado)
    if(ds&&ds.dataSourceSettings&&Object.keys(ds.dataSourceSettings).length!==0)
    {
      if(Operador.length!==0&&
        ValueFilter.length!==0&&
        Measure.length!==0&&
        ColorCelda.length!==0
      )
      {
        let nuevoObjeto={}
        if(Operador.includes('Between'))
        {
           nuevoObjeto = {
            measure:Measure,
            value1:ValueFilter,
            value2:ValueFilter2,
            conditions:Operador,
            style:{
              backgroundColor:ColorCelda,
              color:ColorNumero,
              fontFamily:'Arial',
              fontSize:TamañoCelda
            }
          }
        }
        if(!Operador.includes('Between'))
        {
          nuevoObjeto = {
            measure:Measure,
            value1:ValueFilter,
            conditions:Operador,
            style:{
              backgroundColor:ColorCelda,
              color:ColorNumero,
              fontFamily:'Arial',
              fontSize:TamañoCelda
            }
          }
          
        }
        console.log(nuevoObjeto)
        const seleccionado = props.itemsSelected[0]
  
          const actualizar = props.SettingsItems.map(x=>{
            if(x.itemID===seleccionado)
              {
                return {...x,dataSourceSettings:{...x.dataSourceSettings,
                  conditionalFormatSettings:x.dataSourceSettings.conditionalFormatSettings&&
                  x.dataSourceSettings.conditionalFormatSettings.length!==0?
                  [...x.dataSourceSettings.conditionalFormatSettings,nuevoObjeto]:[
                    nuevoObjeto
                  ]
                }}
              }
              else{
                return {...x}
              }
          })
          const actualizar2 = props.items.map(x=>{
            return {...x,dataSourceSettings:actualizar.find(y=>y.itemID===x.i).dataSourceSettings}
        })
        // console.log(actualizar)
        // const nw = [...FiltrosCondicionales,nuevoObjeto]
        // console.log(nw)
        SetFiltrosCondicionales([...FiltrosCondicionales,nuevoObjeto])
        props.SetSettingsItems(actualizar)
        props.setItems(actualizar2)
      }
      else{
        message.error('Operador, valores, columna y color de celda son obligatorios!')
      }
    }
  
    
  }
  
  const GuardarFormatoNumericoAhoraSi = ()=>{
    const seleccionado = props.itemsSelected[0]
    const ds = props.SettingsItems.find(x=>x.itemID===seleccionado)
    const existeCampoValor = FormatoSettings.some(x=>x.name===NombreCampo)
    if(ds&&ds.dataSourceSettings&&
      Object.keys(ds.dataSourceSettings).length!==0
    &&!existeCampoValor)
    {
      let nuevoObjeto={
        name:NombreCampo,
        format:`${TipoFormato}${DecimalesCantidad}`,
        useGrouping:Agrupamiento,     
      }
      if(TipoFormato==='C')
      {
        nuevoObjeto.currency = CambioReal
      }
      if(TipoFormato==='Custom')
      {
        nuevoObjeto.format = FormatoCustom
        nuevoObjeto.useGrouping = false
      }
      console.log(nuevoObjeto)
      const actualizar = props.SettingsItems.map(x=>{
        if(x.itemID===seleccionado)
          {
            return {...x,dataSourceSettings:{...x.dataSourceSettings,
              formatSettings:x.dataSourceSettings.formatSettings&&
              x.dataSourceSettings.formatSettings.length!==0?
              [...x.dataSourceSettings.formatSettings,nuevoObjeto]:[
                nuevoObjeto
              ]
            }}
          }
          else{
            return {...x}
          }
      })
      const actualizar2 = props.items.map(x=>{
        return {...x,dataSourceSettings:actualizar.find(y=>y.itemID===x.i).dataSourceSettings}
    })
    SetFormatoSettings([...FormatoSettings,nuevoObjeto])
        props.SetSettingsItems(actualizar)
        props.setItems(actualizar2)
  
    }
    else{
      message.error('Es posible que el campo ya se haya usado con otro formato.')
    }
  }
  
  const ActualizarFormatoNumerico = ()=>{
    SetModalFormatSettingsActualizar(true)
  }
  
  const GuardarFormatoNumerico = ()=>{
    SetModalFormatSettings(true)
  }
  const NuevoFormatoCondicional = ()=>{
    SetModalCondicionales(true)
  }
  const SetOperadorFx = (value,option)=>{
    if(value)
    {
      SetOperador(value)
    }
    
  }
  useEffect(() => {
    // console.log(FormularioFormato)
    if(props.itemsSelected.length!==0&&props.SettingsItems.length!==0)
    {
      const seleccionado = props.itemsSelected[0]
      console.log(props.SettingsItems.find(x=>x.itemID===seleccionado))
      const Tile = props.SettingsItems.find(x=>x.itemID===seleccionado).Title
      const ds = props.SettingsItems.find(x=>x.itemID===seleccionado).dataSourceSettings
      // FormularioFormato.setFieldsValue(
      //   {
      //     Title:Titulo
      //   }
      // )
      
        SetTitulo(Tile)
      
      if(ds.conditionalFormatSettings&&ds.conditionalFormatSettings.length!==0)
      {

        SetFiltrosCondicionales(ds.conditionalFormatSettings)
      }
      if(ds.formatSettings&&ds.formatSettings.length!==0)
      {
        SetFormatoSettings(ds.formatSettings)
      }
    }
  }, [props.itemsSelected])
  
  return (
    <div >
      <Modal
      open={ModalFormatSettingsActualizar}
      onCancel={()=>{SetModalFormatSettingsActualizar(false)}}
      title='Formato Numerico'
      footer={<></>}
      width={720}
      >
       <Card style={{borderRadius:'2px'}} 
        >
          <div className='row gx-0 mb-2'>
          <p style={{color:'#ababab'}} className='mb-1'>Campos:</p>
          <Select
          value={NombreCampo}
          disabled
          onChange={(value,option)=>{SetNombreCampo(value)}}
          options={Object.keys(props.PanelValores).length!==0?
            [...Object.keys(props.PanelValores).map(x=>({
              label:x,
              value:x
            })),
          {
            label:'Todos los campos',
            value:'All'
          }]
            
            :[]
          }
          />
          </div>
          <div className='row gx-0  mb-2'>
          <p style={{color:'#ababab'}} className='mb-1'>Tipo de formato:</p>
          <Select
          value={TipoFormato}
          onChange={(value,option)=>{
            if(value)
            {
              if(value==='Custom')
              {
                SetAgrupamiento(false)
                SetDecimalesCantidad(0)
              }
            SetTipoFormato(value)
            }
          }
          }
          options={[
            {
              label:'Numerico(mas usado)',
              value:'N',
            },
            {
              label:'TipoCambio',
              value:'C',
            },
            {
              label:'Porcentaje(%)',
              value:'P',
            },
            {
              label:'Custom',
              value:'Custom',
            },
          ]}
          />
         </div>
         <div className='row gx-0  mb-2'>
          <Tooltip placement='right' title='1000 -> 1,000 '>
          <p style={{color:'#ababab'}} className='mb-1'>Formato de miles:</p>
          </Tooltip>
          <Switch  
          value={Agrupamiento}
          disabled={TipoFormato==='Custom'?true:false}
          defaultValue={Agrupamiento}
          onChange={(checked)=>{SetAgrupamiento(checked)}}
          style={{width:'20%'}}
          />
             </div>
             <div className='row gx-0  mb-2'>
             <Tooltip  title='1000 -> 1000.00 ' placement='right'>
           <p style={{color:'#ababab'}}className='mb-1'>Cantidad de Decimales:</p>
           </Tooltip>
          <InputNumber
           disabled={TipoFormato==='Custom'?true:false}
          value={DecimalesCantidad}
          onChange={(value)=>{SetDecimalesCantidad(value)}}
          min={0}
          style={{borderRadius:'1px'}}
          max={10}
          precision={0}
          />
            </div>
            {TipoFormato==='Custom'?
          <div className='row gx-0 mb-2'>
           <p style={{color:'#ababab'}}className='mb-1'>Personalizado:</p>
            <Input
              style={{borderRadius:'2px'}}
              value={FormatoCustom}
              onChange={(e)=>{SetFormatoCustom(e.target.value)}}
            />
          </div>:null}
          
          </Card> 
          <div className='d-flex justify-content-center  mt-2'>
        <ButtonSecondary style={{width:'40%'}} onClick={ActualizarFormatoNumericoSi}>
            Guardar Filtro Numerico
          </ButtonSecondary>
        </div>
      </Modal>
      <Modal
       open={ModalFormatSettings}
       onCancel={()=>{SetModalFormatSettings(false)}}
       title='Nuevo Formato Numerico'
       footer={<></>}
       width={250}
      >
         <Card style={{borderRadius:'2px'}} 
        >
          <div className='row gx-0 mb-2'>
          <p style={{color:'#ababab'}} className='mb-1'>Campos:</p>
          <Select
          value={NombreCampo}
          onChange={(value,option)=>{SetNombreCampo(value)}}
          options={Object.keys(props.PanelValores).length!==0?
            [...Object.keys(props.PanelValores).map(x=>({
              label:x,
              value:x
            })),
          {
            label:'Todos los campos',
            value:'All'
          }]
            
            :[]
          }
          />
          </div>
          <div className='row gx-0  mb-2'>
          <p style={{color:'#ababab'}} className='mb-1'>Tipo de formato:</p>
          <Select
          value={TipoFormato}
          onChange={(value,option)=>{
            if(value)
            {
              if(value==='Custom')
              {
                SetAgrupamiento(false)
                SetDecimalesCantidad(0)
              }
            SetTipoFormato(value)
            }
          }
          }
          options={[
            {
              label:'Numerico(mas usado)',
              value:'N',
            },
            {
              label:'TipoCambio',
              value:'C',
            },
            {
              label:'Porcentaje(%)',
              value:'P',
            },
            {
              label:'Custom',
              value:'Custom',
            },
          ]}
          />
         </div>
         <div className='row gx-0  mb-2'>
          <Tooltip placement='right' title='1000 -> 1,000 '>
          <p style={{color:'#ababab'}} className='mb-1'>Formato de miles:</p>
          </Tooltip>
          <Switch  
          value={Agrupamiento}
          disabled={TipoFormato==='Custom'?true:false}
          defaultValue={Agrupamiento}
          onChange={(checked)=>{SetAgrupamiento(checked)}}
          style={{width:'20%'}}
          />
             </div>
             <div className='row gx-0  mb-2'>
             <Tooltip  title='1000 -> 1000.00 ' placement='right'>
           <p style={{color:'#ababab'}}className='mb-1'>Cantidad de Decimales:</p>
           </Tooltip>
          <InputNumber
           disabled={TipoFormato==='Custom'?true:false}
          value={DecimalesCantidad}
          onChange={(value)=>{SetDecimalesCantidad(value)}}
          min={0}
          style={{borderRadius:'1px'}}
          max={10}
          precision={0}
          />
            </div>
            {TipoFormato==='Custom'?
          <div className='row gx-0 mb-2'>
           <p style={{color:'#ababab'}}className='mb-1'>Personalizado:</p>
            <Input
              style={{borderRadius:'2px'}}
              value={FormatoCustom}
              onChange={(e)=>{SetFormatoCustom(e.target.value)}}
            />
          </div>:null}
          
          </Card> 
          <div className='d-flex justify-content-center  mt-4'>
        <ButtonSecondary style={{width:'80%'}} onClick={GuardarFormatoNumericoAhoraSi}>
            Guardar Nuevo
          </ButtonSecondary>
        </div>
    
      </Modal>
      <Modal
      open={ModalCondicionales}
      onCancel={()=>{SetModalCondicionales(false)}}
      title='Condicionales - Mapa de Calor(Solo tablas)'
      footer={<></>}
      width={720}
      >
 
        <Card style={{borderRadius:'2px'}}
        
        >
          <div >
          <p className='mb-1' style={{ fontSize:'14.5px',color:'#ababab'}}>Filtro de valor</p>
        
            <Space className='mb-2'>
              <Select
              value={Measure}
              onChange={(value)=>{SetMeasure(value)}}
              options={Object.keys(props.PanelValores).length!==0?
                Object.keys(props.PanelValores).map(x=>({
                  label:x,
                  value:x
                })):[]
              }
              style={{width:'10rem'}}
              />
              <Select  
              value={Operador}
              onChange={(value,option)=>{SetOperadorFx(value)}}
              options={[
                {
                  label:'>',
                  value:'GreaterThan'
                },
                {
                  label:'<',
                  value:'LessThan'
                },
                {
                  label:'>=',
                  value:'GreaterThanOrEqualTo'
                },
                {
                  label:'<=',
                  value:'LessThanOrEqualTo'
                },
                {
                  label:'=',
                  value:'Equals'
                },
                {
                  label:'ENTRE',
                  value:'Between'
                },
                {
                  label:'NO ENTRE',
                  value:'NotBetween'
                },
              ]}
              style={{width:'6rem'}}/>
              <InputNumber  
              min={0}
              precision={3}
              value={ValueFilter}
              onChange={(value)=>{SetValueFilter(value)}}
              style={{width:'8rem',borderRadius:'1px'}}/>
              {Operador==='Between'||Operador==='NotBetween'? <Space> <p style={{color:'#cacaca'}}>{Operador}</p>  <InputNumber  
              min={0}
              precision={3}
              value={ValueFilter2}
              onChange={(value)=>{SetValueFilter2(value)}}
              style={{width:'8rem',borderRadius:'1px'}}/></Space>:null}
              {/* <Select/> */}
            </Space>
        

          </div>
          <div>
          <p className='mb-1' style={{ fontSize:'14.5px',color:'#ababab'}}>Formato</p>
          <Space className='mb-2'>
            <Select options={[
              {
                label:'12px',
                value:'12px',
              },
              {
                label:'14px',
                value:'14px',
              },
              {
                label:'16px',
                value:'16px',
              },
            ]}
            value={TamañoCelda}
            
            onChange={(value)=>{SetTamañoCelda(value)}}
            style={{width:'5rem'}}
            />
            <ColorPicker
            style={{borderRadius:'2px'}}
            value={ColorCelda}
              onChange={(value,css)=>{SetColorCelda(css)}}
              showText={(color) => <TbBackground/>}
            />
            <ColorPicker
              style={{borderRadius:'2px'}}
            value={ColorNumero}
             onChange={(value,css)=>{SetColorNumero(css)}}
             showText={(color) => <Numbers fontSize='small'/>}
          
            />
          
        

          </Space>
          </div>
        </Card>
        <div className='d-flex justify-content-center  mt-2'>
        <ButtonSecondary style={{width:'40%'}} 
        onClick={GuardarFormatoCondicional}>
            Guardar condicion
          </ButtonSecondary>
        </div>
    
      </Modal>
      <Modal
      open={ModalActualizar}
      onCancel={()=>{SetModalActualizar(false)}}
      title='Condicionales - Mapa de Calor(Solo tablas)'
      footer={<></>}
      width={720}
      >
 
        <Card style={{borderRadius:'2px'}}
        
        >
          <div >
          <p className='mb-1' style={{ fontSize:'14.5px',color:'#ababab'}}>Filtro de valor</p>
        
            <Space className='mb-2'>
              <Select
              value={Measure}
              onChange={(value)=>{SetMeasure(value)}}
              options={Object.keys(props.PanelValores).length!==0?
                Object.keys(props.PanelValores).map(x=>({
                  label:x,
                  value:x
                })):[]
              }
              style={{width:'10rem'}}
              />
              <Select  
              value={Operador}
              onChange={(value,option)=>{SetOperadorFx(value)}}
              options={[
                {
                  label:'>',
                  value:'GreaterThan'
                },
                {
                  label:'<',
                  value:'LessThan'
                },
                {
                  label:'>=',
                  value:'GreaterThanOrEqualTo'
                },
                {
                  label:'<=',
                  value:'LessThanOrEqualTo'
                },
                {
                  label:'=',
                  value:'Equals'
                },
                {
                  label:'ENTRE',
                  value:'Between'
                },
                {
                  label:'NO ENTRE',
                  value:'NotBetween'
                },
              ]}
              style={{width:'6rem'}}/>
              <InputNumber  
              min={0}
              precision={3}
              value={ValueFilter}
              onChange={(value)=>{SetValueFilter(value)}}
              style={{width:'8rem',borderRadius:'1px'}}/>
              {Operador==='Between'||Operador==='NotBetween'? <Space> <p style={{color:'#cacaca'}}>{Operador}</p>  <InputNumber  
              min={0}
              precision={3}
              value={ValueFilter2}
              onChange={(value)=>{SetValueFilter2(value)}}
              style={{width:'8rem',borderRadius:'1px'}}/></Space>:null}
              {/* <Select/> */}
            </Space>
        

          </div>
          <div>
          <p className='mb-1' style={{ fontSize:'14.5px',color:'#ababab'}}>Formato</p>
          <Space className='mb-2'>
            <Select options={[
              {
                label:'12px',
                value:'12px',
              },
              {
                label:'14px',
                value:'14px',
              },
              {
                label:'16px',
                value:'16px',
              },
            ]}
            value={TamañoCelda}
            
            onChange={(value)=>{SetTamañoCelda(value)}}
            style={{width:'5rem'}}
            />
            <ColorPicker
            style={{borderRadius:'2px'}}
            value={ColorCelda}
              onChange={(value,css)=>{SetColorCelda(css)}}
              showText={(color) => <TbBackground/>}
            />
            <ColorPicker
              style={{borderRadius:'2px'}}
            value={ColorNumero}
             onChange={(value,css)=>{SetColorNumero(css)}}
             showText={(color) => <Numbers fontSize='small'/>}
          
            />
          
        

          </Space>
          </div>
        </Card>
        <div className='d-flex justify-content-center  mt-2'>
        <ButtonSecondary style={{width:'40%'}} onClick={ActualizarFormatoCondicional}>
            Guardar condicion
          </ButtonSecondary>
        </div>
    
      </Modal>
      <div className='row'>
        <Form 
        layout='vertical'
        // onFinish={AplicarNuevaConfiguracion}
        form={FormularioFormato}
        >

       {/* <Form.Item 
       rules={[{
        required:false,

       }]}
       name='Title'
       label={<div
       style={{color:'#ababab',fontSize:'14px'}}
       >
        Titulo:
       </div>}
       
       >
        <Input 
        onChange={(e)=>{AplicarNuevaConfiguracion(e.target.value)}}
        style={{borderRadius:'3px'}}/>
       </Form.Item> */}
      
        <p className='mb-1' style={{color:'#ababab',fontSize:'14px'}}>Titulo</p>
        <div className='d-flex col'>
        <Input 
        value={Titulo}
        onChange={(e)=>{SetTitulo(e.target.value)}}
        style={{borderRadius:'3px'}}/>
        <IconButton size='small' onClick={AplicarNuevaConfiguracion}>
          <EditOutlined/>
        </IconButton>
        </div>
       {EsChartCorrecto()}
       <p className='mb-1' style={{color:'#ababab',fontSize:'14px'}}>Formato Numerico:</p>

       <div 
          className='overflow-y-lg-auto py-2 mb-3'
          style={{
            borderWidth:'1px',
            height:'15rem',
            borderColor:colorBgLayout,
            backgroundColor:'#f2fdef'
          }}
          >
       {FormatoSettings.map((x,index)=>{
        return (
          <div
          className='mx-3 px-1 py-1 mb-2'
            style={{
              borderRadius:'1px',
              borderWidth:'1px',
              borderColor:'#85f567',
              background:'#FFFFFF',
              color:'#85f567',
              cursor:'pointer'
            }}
            key={index.toString()}
            >
            <div className='col d-flex align-items-center'>
            <div className='col-10  d-flex align-items-center' > 
              {x.name}
              </div>  
              <div className='col-2'>
              <IconButton size='small' style={{borderRadius:'1px'}} 
              onClick={()=>{EliminarFiltroNumerico(x.name)}}>
              <IoClose color='red' style={{cursor:'pointer'}}/>
              </IconButton>
                </div> 
              </div>  
          </div>
        )
       })}
       <div className='d-flex justify-content-center'>
        <ButtonAddNumericFormat 
        onClick={GuardarFormatoNumerico}
         style={{width:'100%'}} 
        className='mx-3'>
          Agregar Formato
        </ButtonAddNumericFormat>
       </div>
       </div>
       <p className='mb-1' style={{color:'#ababab',fontSize:'14px'}}>Formula(fx):</p>
       <div
       className='overflow-y-lg-auto py-2 px-2 mb-3'
       style={{
         borderWidth:'1px',
         height:'8rem',
         borderColor:colorBgLayout,
         backgroundColor:'#fadbd8'
       }}
       >
        <TextArea
    
        showCount maxLength={100} onChange={(e)=>{onChangeFx(e.target.value)}} placeholder="eg. *100, /100, -20, *0.18" 
        />
        <div className='d-flex justify-content-center mt-5'>
        <ButtonCalcular 
        onClick={onCalculadora}
         style={{width:'70%'}} 
       >
          Calcular
        </ButtonCalcular>
       </div>
       </div>
       {/* <p className='mb-1' style={{color:'#ababab',fontSize:'14px'}}>Formato Numerico:</p> */}
       {/* <div 
       className='overflow-y-lg-auto py-2 mb-5'
        style={{
          borderWidth:'1px',
          height:'18rem',
          borderColor:colorBgLayout,
          backgroundColor:'#f5f8ff'
        }}
       
       >
        <Form.Item
        rules={[{
          required:false,
         }]}
         className='mx-2'
         name='name'
         label={<div
          style={{color:'#ababab',fontSize:'14px'}}
          >
           Campo Valor:
          </div>}
        >
          <Select
          options={Object.keys(props.PanelValores).length!==0?
            [...Object.keys(props.PanelValores).map(x=>({
              label:x,
              value:x
            })),
          {
            label:'Todos los campos',
            value:'All'
          }]
            
            :[]
          }
          />

        </Form.Item>
        <Form.Item
        rules={[{
          required:false,
         }]}
         className='mx-2'
         name='format'
         label={<div
          style={{color:'#ababab',fontSize:'14px'}}
          >
           Tipo de Formato:
          </div>}
        >
          <Select
          options={[
            {
              label:'Numerico',
              value:'Number',
            },
            {
              label:'TipoCambio',
              value:'Currency',
            },
            {
              label:'Porcentaje(%)',
              value:'Porcentaje',
            },
          ]}
          />
        </Form.Item>
        <Form.Item
        rules={[{
          required:false,
         }]}
         className='mx-2'
         name='useGrouping'
         tooltip='Formato de miles 1000 = 1,000 '
         label={<div
          style={{color:'#ababab',fontSize:'14px'}}
          >
           Separador de Miles:
          </div>}
        >
          <Switch
          
          />
        </Form.Item>
        <Form.Item
        rules={[{
          required:false,
         }]}
         className='mx-2'
         name='Precision'
         tooltip='1000 a 1000.00'
         label={<div
          style={{color:'#ababab',fontSize:'14px'}}
          >
            Precision:
          </div>}
        >
          <InputNumber
          min={0}
          style={{borderRadius:'1px'}}
          max={10}
          precision={0}
          />
        </Form.Item>
       </div> */}
        {/* <p style={{color:'#6a6a6a',fontSize:'14px',fontWeight:'bold'}}>Titulo:</p>
        <div className='d-flex col mb-3'>

        <Input value={Titulo}
        onChange={(e)=>{SetTitulo(e.target.value)}}
        style={{borderRadius:'3px'}}/>
        </div> */}
        
        {/* <ButtonSecondary htmlType='submit' style={{width:'100%'}} 
   
        >
          Aplicar Configuracion
          </ButtonSecondary> */}
        </Form>
      </div>
      
    </div>
  )
}

export default FormatCssCube