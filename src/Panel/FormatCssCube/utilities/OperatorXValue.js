const Operator = 
[
    {
      label:'>',
      value:'GreaterThan'
    },
    {
      label:'<',
      value:'LessThan'
    },
    {
      label:'>=',
      value:'GreaterThanOrEqualTo'
    },
    {
      label:'<=',
      value:'LessThanOrEqualTo'
    },
    {
      label:'=',
      value:'Equals'
    },
    {
      label:'ENTRE',
      value:'Between'
    },
    {
      label:'NO ENTRE',
      value:'NotBetween'
    },
  ]
export const FxOperatorOne = (operator)=>{
    const finding = Operator.find(x=>x.value===operator)
    return finding.label
}