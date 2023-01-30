import React, { useEffect, useState } from 'react'
type obj = {
    Country:string,CustomerID:string,Description:string,InvoiceDate:string,InvoiceNo:string,Quantity:string,StockCode:string,UnitPrice:string
}
type desProps={
    dataArr:obj|undefined|any
}

const DescriptionComp = (props:desProps) => {
    var [DesObj,setDesObj]=useState<any>([])
    var [DesArr,setDesArr]=useState<obj[]>([])
    var [quantity,setQuantity]=useState(0)
    var [len,setLen]=useState(0)

    useEffect(()=>{
        var DesObj:any=[]
        props.dataArr.slice(1,50).map((item:any)=>{
           
            if(!DesObj.includes(item.Description)){
                DesObj.push(item.Description)
            }
        })
        setDesObj(DesObj)
    },[props.dataArr])

    const selectHandler=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        DesArr=[]
        props.dataArr.map((item:any)=>{
            if(item.Description==e.currentTarget.value){
                DesArr.push(item)
            }
        })
        setDesArr(DesArr)
        calculateQuant()
    }

    const calculateQuant=()=>{
        setLen(DesArr.length)
        DesArr.map((item)=>{
            quantity += Number(item.Quantity)
        })
        setQuantity(quantity)
    }

    // console.log(DesArr)
    
  return (
    <div className='mt-4'>
        <h4>Ordered Item</h4>
        {props.dataArr!==undefined?
        <select onChange={(e)=>selectHandler(e)} className='mt-3 p-2 fs-6 fw-bold bg-primary text-white col-4 border-primary border-3 rounded'>
            <option>Select</option>
            {DesObj.map((item:any)=>{
                return <option>{item}</option>
            })}
        </select>
        :<></>}
        {quantity!=0?<h5>Total Quantity: {quantity}</h5>:<></>}
        {len!=0?<h5>{len} no. of times item is Ordered</h5>:<></>}
    </div>
  )
}

export default DescriptionComp