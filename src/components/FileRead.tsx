import React, { useEffect, useState } from 'react'
import CountryComp from './CountryComp'
import DescriptionComp from './DescriptionComp'
import IdComp from './IdComp'

type obj = {
    Country:string,CustomerID:string,Description:string,InvoiceDate:string,InvoiceNo:string,Quantity:string,StockCode:string,UnitPrice:string
}

const FileRead = () => {
    var [str,setStr]=useState<React.SetStateAction<undefined|ArrayBuffer|null|string>>()
    var [dataArr,setDataArr]=useState<React.SetStateAction<obj>|undefined|{}[]>()
    var [loader,setLoader]=useState(false)

    // Function Fetches the data from csv file
    useEffect(()=>{
        setLoader(true)
        fetch('./online_retail.csv')
        .then(res=>res.text())
        .then(resText=>{
            setStr(resText)
        })
        convertToReadable()
    },[str])

    // Function converts the text data into object Array
    const convertToReadable=()=>{
        if(typeof(str)=='string'){  
            var headings = str.slice(0,str.indexOf('\r\n')).split(',')
            var rowsData  = str.slice(str.indexOf('\r\n')+1).split('\r\n')
            let arr=rowsData.map((item)=>{
                return item.split(',')
            })
            let objArr:{}[]=arr.map(ele=>{
                let obj={};
                ele.forEach((innerEle,i)=>{
                    Object.assign(obj,{[headings[i]]:innerEle})
                })
                return obj;
            }) 
            setDataArr(objArr)
            setLoader(false)
        }
    }

  return (
    <div>
        {dataArr!==undefined?<IdComp dataArr={dataArr}/>:<></>}
        {dataArr!==undefined?<DescriptionComp dataArr={dataArr}/>:<></>}
        {dataArr!==undefined?<CountryComp dataArr={dataArr}/>:<></>}
        {/* renders the loader during fetching of data */}
        {loader?
        <>
        <h2>Loading Data</h2>
        <img style={{height:'100px',width:'100px'}} src='https://media.tenor.com/1s1_eaP6BvgAAAAC/rainbow-spinner-loading.gif' alt=''/>
        </>:<></>}
    </div>
  )
}

export default FileRead