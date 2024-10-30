import { PlusOutlined } from '@ant-design/icons'
import { Button, ConfigProvider } from 'antd'
import React from 'react'

const ButtonAddNumericFormat = (props) => {
    return (
        <ConfigProvider
        theme={{
          token:{
            colorPrimary:'#2ecc71',
        borderRadius:1,
        
        colorBgContainer:'#F6FFED'
          }
        }}
        >
        <Button {...props} 
        icon={<PlusOutlined/>} 
        type='primary' 
        style={props.style}>
          {props.children}    
        </Button>
        </ConfigProvider>
      )
}

export default ButtonAddNumericFormat