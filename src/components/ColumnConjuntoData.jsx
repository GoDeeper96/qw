import { Button } from 'antd'
import React from 'react'

const ColumnConjuntoData = (props) => {
  return (
    <Button color="default" variant="filled"
    key={props.key}
    className='my-1 text-truncate'
    onClick={()=>{console.log('test')}}
    style={{
      justifyContent:'start',
      padding: 1,
      borderRadius:2,
      fontSize:'14px',
      // color:'#0d4178',
      fontWeight:500,
      borderWidth:'1px',
      borderColor:'#CACACA',

    }}
    >
     {props.value}

    </Button >
  )
}

export default ColumnConjuntoData