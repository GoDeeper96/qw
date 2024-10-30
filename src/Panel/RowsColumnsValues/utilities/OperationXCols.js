export const OperatorForNumbers =[
    {
        key: 'SUM',
        label: 'SUM',
      },
      {
        key: 'COUNT',
        label: 'COUNT',
      },
      // {
      //   key: 'COUNT-DISTINCT',
      //   label: 'COUNT-DISTINCT',
      // },
      {
        key: 'MIN',
        label: 'MIN',
      },
      {
        key: 'AVG',
        label: 'AVG(Promedio)',
      },
      {
        key: 'MAX',
        label: 'MAX',
      },
      {
        key: 'PERCENTAGE',
        label: 'Porcentaje %',
      },
]
export const OperatorForString =[

      {
        key: 'COUNT',
        label: 'COUNT',
      },
      // {
      //   key: 'COUNT-DISTINCT',
      //   label: 'COUNT-DISTINCT',
      // },
      // {
      //   key: 'Otros',
      //   label: 'Otros',
      // },
]
export const OperatorForDates =[

]
export const OperatorXColsVal = (ColumnaCubo,ColumnaName)=>{
    let TypeData = ColumnaCubo.find(x=>x.name===ColumnaName).TipoDato
    return TypeData
}

export const OperatorXCols = (ColumnaCubo,ColumnaName)=>{
    let TypeData = ColumnaCubo.find(x=>x.name===ColumnaName).TipoDato
    if(TypeData==='String')
    {
        return OperatorForString
    }   
    if(TypeData==='Number')
    {
        return OperatorForNumbers
    }
    if(TypeData==='Date')
    {
        return []
    }
    else{
        return OperatorForString
    }
}