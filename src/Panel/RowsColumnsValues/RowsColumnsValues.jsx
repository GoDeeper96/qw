import React from 'react'
import useThemeTokens from '../../utilities/useThemeTokens'

const RowsColumnsValues = (props) => {
  const { colorBgLayout,colorTextTertiary } = useThemeTokens()
  return (
    <div>
        {/* FILAS */}
    <p>Panel de filas</p>
    <div 
    className=' overflow-y-lg-auto'
      style={{
                  padding:2,
                  borderRadius:1,
                  color: colorTextTertiary,
                  background: colorBgLayout,
                  borderWidth:'1px',
                  borderColor:'#cacaca', 
                    height:'10rem'
                  
                }}
                >
      
    </div>
    {/* COLUMNAS */}
    <p>Panel de Columnas</p>
    <div
    className=' overflow-y-lg-auto' style={{
      padding:2,
      borderRadius:4,
      color: colorTextTertiary,
      background: colorBgLayout,
      borderWidth:'1px',
      borderColor:'#cacaca', 
      height:'10rem'
    }}
    >
      
    </div>
      {/* VALORES */}
    <p>Panel de Valores</p>
    <div
    className='overflow-y-lg-auto' style={{
      padding:2,
      borderRadius:1,
      color: colorTextTertiary,
      background: colorBgLayout,
      borderWidth:'1px',
                  borderColor:'#cacaca', 
      height:'10rem'
    }}
    >
      
    </div>


    </div>
  )
}

export default RowsColumnsValues