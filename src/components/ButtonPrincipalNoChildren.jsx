import { Button, ConfigProvider } from 'antd'
import React from 'react'

const ButtonPrincipalNoChildren = (props) => {
    return (
        <ConfigProvider
        theme={{
          token:{
            colorPrimary:'#5AB3FB',
        borderRadius:1,
        colorBgContainer:'#F6FFED'
          }
        }}
        >
        <Button {...props} type='primary' style={props.style}>
          {props.title}    
        </Button>
        </ConfigProvider>
      )
}

export default ButtonPrincipalNoChildren