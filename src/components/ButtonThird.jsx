import { PlusOutlined } from '@ant-design/icons'
import { Button, ConfigProvider } from 'antd'
import React from 'react'

const ButonThird = (props) => {
    return (
        <ConfigProvider
        theme={{
          token:{
            colorPrimary:'#8e8bff',
        borderRadius:1,
        
        colorBgContainer:'#57e033'
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

export default ButonThird