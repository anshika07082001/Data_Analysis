import React, { useEffect, useState } from 'react'
type obj = {
    Country:string,CustomerID:string,Description:string,InvoiceDate:string,InvoiceNo:string,Quantity:string,StockCode:string,UnitPrice:string
}
type desProps={
    dataArr:obj|undefined|any
}

const DescriptionComp = (props:desProps) => {
    var [DesObj,setDesObj]=useState<any>([])
    console.log(props.dataArr)
    useEffect(()=>{
        var DesObj:any=[]
        props.dataArr.slice(0,50).map((item:any)=>{
           
            if(!DesObj.includes(item.Description)){
                DesObj.push(item.Description)
            }
        })
        setDesObj(DesObj)
    },[props.dataArr])
    
  return (
    <div className='mt-4'>
        <h4>Ordered Item</h4>
        {props.dataArr!==undefined?
        <select>
            <option>Select</option>
            {DesObj.map((item:any)=>{
                return <option>{item}</option>
            })}
        </select>
        :<></>}
    </div>
  )
}

export default DescriptionComp