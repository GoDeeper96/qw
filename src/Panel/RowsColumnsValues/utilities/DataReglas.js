export const OperadorIDs = [
    {  value: 'in', label: 'INCLUIDO' },
    {  value: 'notIn', label: 'NO INCLUIDO' },
]
export const OperadorBoolean = [
    {  value: '=', label: '=' } ,
    {  value: '!=', label: '!=' } ,
]
export const OperadorPedidoYCantidad = [
    {  value: '=', label: '=' } ,
    {  value: '!=', label: '!=' } ,
    {  value: '<', label: '<' },
    {  value: '>', label: '>' },
    {  value: '<=', label: '<=' },
    {  value: '>=', label: '>=' },
    {  value: 'between', label: 'ENTRE' },
]
export const OperadorCaracteristica = [
    {  value: 'in', label: 'INCLUIDO' },
    {  value: 'notIn', label: 'NO INCLUIDO' },

]
export const OperadorFecha = [
    {  value: '=', label: '=' } ,
    {  value: '!=', label: '!=' } ,
    {  value: '<', label: '<' },
    {  value: '>', label: '>' },
    {  value: '<=', label: '<=' },
    {  value: '>=', label: '>=' },
    {  value: 'between', label: 'ENTRE' },
]
export  const OperadoresLogicos = [
    {  value: '=', label: '=' } ,
    {  value: '!=', label: '!=' } ,
    {  value: '<', label: '<' },
    {  value: '>', label: '>' },
    {  value: '<=', label: '<=' },
    {  value: '>=', label: '>=' },
    {  value: 'contains', label: 'CONTIENE' },
    {  value: 'beginsWith', label: 'COMIENZA CON' },
    {  value: 'endsWith', label: 'TERMINA CON' },
    {  value: 'doesNotContain', label: 'NO CONTIENE' },
    {  value: 'doesNotBeginWith', label: 'NO COMIENZA CON' },
    {  value: 'doesNotEndWith', label: 'NO TERMINA CON' },
    {  value: 'null', label: 'ES NULO' },
    {  value: 'notNull', label: 'NO ES NULO' },
    {  value: 'in', label: 'INCLUIDO' },
    {  value: 'notIn', label: 'NO INCLUIDO' },
    {  value: 'between', label: 'ENTRE' },
    {  value: 'notBetween', label: 'NO ENTRE' },
]

export const funcionOperadorPorcaso = (Columna)=>{
    if(Columna.includes('ID'))
    {
        return OperadorIDs
    }
    if(Columna.includes('Caracteristica'))
    {   
        return OperadorCaracteristica
    }
    if(Columna==='PedidoTotal')
    {
        return OperadorPedidoYCantidad
    }
    if(Columna==='CantidadProducto')
    {
        return OperadorPedidoYCantidad
    }
    if(Columna.includes('Activo'))
    {
        return OperadorBoolean
    }
    if(Columna.includes('Fecha'))
    {
        return OperadorFecha
    }
    else{
        return OperadoresLogicos
    }
}

export const dataReglas = [
  {

    tabla: "CuboProyeccion",
    columna: "Fecha",
    tipo: "Date",
    maestro: false,
    value: "Fecha",
    label: "Fecha",

  },
  {

    tabla: "CuboProyeccion",
    columna: "Periodo",
    tipo: "String",
    maestro: true,
    value: "Periodo",
    label: "Periodo",
  },
  {

    tabla: "CuboProyeccion",
    columna: "Fecha",
    tipo: "Date",
    maestro: false,
    value: "Fecha",
    label: "Fecha",
  },
  {

    tabla: "CuboProyeccion",
    columna: "Fecha",
    tipo: "Date",
    maestro: false,
    value: "Fecha",
    label: "Fecha",
  },
  {

    tabla: "CuboProyeccion",
    columna: "Fecha",
    tipo: "Date",
    maestro: false,
    value: "Fecha",
    label: "Fecha",
  },

  ]