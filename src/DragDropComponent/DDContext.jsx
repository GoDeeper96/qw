import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

const DDContext = (props) => {
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
    </DragDropContext>
  )
}

export default DDContext