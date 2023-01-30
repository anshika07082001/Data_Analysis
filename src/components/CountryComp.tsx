import React, { useEffect, useState } from 'react'
type obj = {
    Country:string,CustomerID:string,Description:string,InvoiceDate:string,InvoiceNo:string,Quantity:string,StockCode:string,UnitPrice:string
}
type countryProps={
    dataArr:obj|undefined|any
}

const CountryComp = (props:countryProps) => {
    var [countryObj,setcountryObj]=useState<any>([])
    var [countryArr,setCountryArr]=useState<obj[]>([])
    useEffect(()=>{
        var countryObj:any=[]
        props.dataArr.slice(1,50).map((item:any)=>{
           
            if(!countryObj.includes(item.Country)){
                countryObj.push(item.Country)
            }
        })
        setcountryObj(countryObj)
    },[props.dataArr])

    const selecthandler=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        countryArr=[]
        props.dataArr.map((item:any)=>{
            if(item.Country==e.currentTarget.value){
                countryArr.push(item)
            }
        })
        setCountryArr(countryArr)
    }
  return (
    <div className='mt-3'>
        <h2>Orders in country</h2>
        {props.dataArr!==undefined?
        <select className='mt-3 p-2 fs-6 fw-bold bg-primary text-white col-4 border-primary border-3 rounded' onChange={(e)=>selecthandler(e)}>
            <option>Select Country</option>
            {countryObj.map((item:any)=>{
                return <option>{item}</option>
            })}
        </select>
        :
        <></>}
        {countryArr.length>0?
        <table className='m-auto mt-4 border-2 border-primary p-2 col-8'>
            <tr className='fs-5'><th className='border border-primary border-2 p-2 bg-primary text-white'>CustomerID</th><th className=' bg-primary text-white border border-primary border-2 p-2'>Description</th><th className='bg-primary text-white border border-primary border-2 p-2'>Quantity</th></tr>
            {countryArr.map((item)=>{
                return <tr className='fw-bold'>
                <td className='border border-primary border-2 p-2'>{item.CustomerID}</td>
                <td className='border border-primary border-2 p-2'>{item.Description}</td>
                <td className='border border-primary border-2 p-2'>{item.Quantity}</td>
                </tr>
            })}
        </table>
        :<></>}
    </div>
  )
}

export default CountryComp