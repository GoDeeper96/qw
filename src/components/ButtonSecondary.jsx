import { Button, ConfigProvider } from 'antd'
import React from 'react'

const ButtonSecondary = (props) => {
    return (
        <ConfigProvider
        theme={{
          token:{
            colorPrimary:'#ffbe67',
        borderRadius:1,
        colorBgContainer:'#F6FFED'
          }
        }}
        >
        <Button {...props} type='primary' style={props.style}>
          {props.children}    
        </Button>
        </ConfigProvider>
      )
}

export default ButtonSecondary