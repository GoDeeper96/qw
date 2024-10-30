import { PlusOutlined } from '@ant-design/icons'
import { CalculateOutlined } from '@mui/icons-material'
import { Button, ConfigProvider } from 'antd'
import React from 'react'

const ButtonCalcular = (props) => {
    return (
        <ConfigProvider
        theme={{
          token:{
            colorPrimary:'#cd6155',
        borderRadius:1,
        
        colorBgContainer:'#F6FFED'
          }
        }}
        >
        <Button {...props} 
        icon={<CalculateOutlined/>} 
        type='primary' 
        style={props.style}>
          {props.children}    
        </Button>
        </ConfigProvider>
      )
}

export default ButtonCalcular