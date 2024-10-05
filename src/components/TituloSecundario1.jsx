import { Button, ConfigProvider, Typography } from 'antd'
import React from 'react'

const TituloSecundario1 = (props) => {
  return (
    <ConfigProvider
    theme={{
      
      token:{
        colorPrimary:'#1A57C1',
        borderRadius:3,
        colorBgContainer:'#F6FFED',
        fontSize:'12px',
        
      }
    }}
    >
    <Typography {...props}   style={{...props.style,fontWeight:'bold'}}>
      {props.children}    
    </Typography>
    </ConfigProvider>
  )
}

export default TituloSecundario1