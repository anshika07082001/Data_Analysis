import React, { useEffect, useState } from 'react'
type obj = {
    Country:string,CustomerID:string,Description:string,InvoiceDate:string,InvoiceNo:string,Quantity:string,StockCode:string,UnitPrice:string
}
type countryProps={
    dataArr:obj|undefined|any
}

const CountryComp = (props:countryProps) => {
    var [countryObj,setcountryObj]=useState<any>([])
    useEffect(()=>{
        var countryObj:any=[]
        props.dataArr.slice(0,50).map((item:any)=>{
           
            if(!countryObj.includes(item.Country)){
                countryObj.push(item.Country)
            }
        })
        setcountryObj(countryObj)
        // console.log(CountryObj)
    },[props.dataArr])
  return (
    <div className='mt-3'>
        <h2>Orders in country</h2>
        {props.dataArr!==undefined?
        <select>
            <option>Select Country</option>
            {countryObj.map((item:any)=>{
                return <option>{item}</option>
            })}
        </select>
        :
        <></>}
    </div>
  )
}

export default CountryComp