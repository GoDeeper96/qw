import { Button, ConfigProvider } from 'antd'
import React from 'react'

const ButtonCancel = (props) => {
    return (
        <ConfigProvider
        theme={{
          token:{
            // colorPrimary:'#df3939',
        borderRadius:3,
        // colorBgContainer:'#df3939'
          }
        }}
        >
        <Button {...props} type='primary'  color="danger" variant="solid" style={props.style}>
          {props.children}    
        </Button>
        </ConfigProvider>
      )
}

export default ButtonCancel