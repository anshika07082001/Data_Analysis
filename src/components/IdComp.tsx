import React, { useEffect, useState } from 'react'
type obj = {
    Country:string,CustomerID:string,Description:string,InvoiceDate:string,InvoiceNo:string,Quantity:string,StockCode:string,UnitPrice:string
}
type idProps={
    dataArr:obj|undefined|any
}

const IdComp = (props:idProps) => {
    var [idObj,setIdObj]=useState<any>([])
    var [selArr,setSelArr]=useState<obj[]>([])

    useEffect(()=>{
        var idObj:any=[]
        props.dataArr.slice(0,200).map((item:any)=>{
           
            if(!idObj.includes(item.CustomerID)){
                idObj.push(item.CustomerID)
            }
        })
        setIdObj(idObj)
    },[props.dataArr])

    const selectHandler=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        selArr=[]
        props.dataArr.slice(0,200).map((item:any)=>{
            if(item.CustomerID==e.currentTarget.value){
                selArr.push(item)
            }
        })
        setSelArr(selArr)
    }

    return (
    <div>
        <h3>Invoice generation</h3>
        {props.dataArr!==undefined?
        <select onChange={(e)=>selectHandler(e)} className='mt-3'>
            <option>Select</option>
            {idObj.map((item:any)=>{
                return <option>{item}</option>
            })}
        </select> 
        :<></>}
        {selArr.length>0?
        <table className='m-auto mt-4'> 
            <tr><th>CustomerID</th><th>Country</th><th>InvoiceDate</th><th>Quantity</th><th>UnitPrice</th></tr>
            {selArr.map((item)=>{
               return <tr><td>{item.CustomerID}</td><td>{item.Country}</td><td>{item.InvoiceDate}</td><td>{item.Quantity}</td><td>{item.UnitPrice}</td></tr>
            })}
        </table> 
        :<></>}
    </div>
    )
}

export default IdComp