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
        props.dataArr.slice(1,200).map((item:any)=>{
           
            if(!idObj.includes(item.CustomerID)){
                idObj.push(item.CustomerID)
            }
        })
        setIdObj(idObj)
    },[props.dataArr])

    const selectHandler=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        selArr=[]
        props.dataArr.slice(1,200).map((item:any)=>{
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
        <select onChange={(e)=>selectHandler(e)} className='mt-3 p-2 fs-6 fw-bold bg-primary text-white col-4 border-primary border-3 rounded'>
            <option>Select</option>
            {idObj.map((item:any)=>{
                return <option>{item}</option>
            })}
        </select> 
        :<></>}
        {selArr.length>0?
        <table className='m-auto mt-4 border-2 border-primary p-2 col-8'> 
            <tr className='fs-5'><th className='border border-primary border-2 p-2 bg-primary text-white'>CustomerID</th><th className=' bg-primary text-white border border-primary border-2 p-2'>Country</th><th className='bg-primary text-white border border-primary border-2 p-2'>InvoiceDate</th><th className='bg-primary text-white border border-primary border-2 p-2'>Quantity</th><th className='bg-primary text-white border border-primary border-2 p-2'>UnitPrice</th></tr>
            {selArr.map((item)=>{
               return (
               <tr className='fw-bold'>
                <td className='border border-primary border-2 p-2'>{item.CustomerID}</td>
                <td className='border border-primary border-2 p-2'>{item.Country}</td>
                <td className='border border-primary border-2 p-2'>{item.InvoiceDate}</td>
                <td className='border border-primary border-2 p-2'>{item.Quantity}</td>
                <td className='border border-primary border-2 p-2'>{item.UnitPrice}</td>
                </tr>
               )
            })}
        </table> 
        :<></>}
    </div>
    )
}

export default IdComp