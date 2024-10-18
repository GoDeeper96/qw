import React from 'react'
import useThemeTokens from '../../utilities/useThemeTokens'

const Filters = (props) => {
  const { colorBgLayout,colorTextTertiary } = useThemeTokens()
  return (
    <div  className='overflow-y-lg-auto'
    style={{
                 padding:1,
                 borderRadius:1,
                 color: colorTextTertiary,
                 background: colorBgLayout,
                 borderWidth:'1px',
                 borderColor:'#cacaca', 
                 height:'70vh'
               }}>
       
       </div>
  )
}

export default Filters