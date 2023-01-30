import React, { useEffect, useRef, useState } from 'react'
import CountryComp from './CountryComp'
import DescriptionComp from './DescriptionComp'
import IdComp from './IdComp'
type obj = {
    Country:string,CustomerID:string,Description:string,InvoiceDate:string,InvoiceNo:string,Quantity:string,StockCode:string,UnitPrice:string
}

const FileRead = () => {
    var fileRef = useRef<HTMLInputElement>(null)
    const reader = new FileReader();
    var [str,setStr]=useState<React.SetStateAction<undefined|ArrayBuffer|null|string>>()
    var [dataArr,setDataArr]=useState<React.SetStateAction<obj>|undefined|{}[]>()

    const fileHandler =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(fileRef.current!==null){
            if(fileRef.current.value!==''){
                if(fileRef.current?.files!==null){
                    reader.readAsText(fileRef.current.files[0])
                    reader.onload=function(e){
                        setStr( e.target?.result)
                    }
                }
            }
            else{
                alert('select Data')
            }
        }
        e.currentTarget.reset()
    }

    useEffect(()=>{
        if(typeof(str)=='string'){  
            var headings = str.slice(0,str.indexOf('\r\n')).split(',')
            var rowsData  = str.slice(str.indexOf('\r\n')).split('\r\n')
            let arr=rowsData.map((item)=>{
                return item.split(',')
            })
            // let objArr:obj={Country:'',InvoiceDate:'',Description:'',CustomerID:'',InvoiceNo:'',Quantity:'',StockCode:'',UnitPrice:''}
            let objArr:{}[]=arr.map(ele=>{
                let obj={};
                ele.forEach((innerEle,i)=>{
                    Object.assign(obj,{[headings[i]]:innerEle})
                })
                return obj;
            })
            setDataArr(objArr)
        }
    },[str])

  return (
    <div>
        <h2>Select File</h2>
        <form onSubmit={(e)=>fileHandler(e)} className='p-3 m-auto col-6 border-primary border-2 border rounded' >
            <input type='file' accept='.csv' ref={fileRef}/>
            <button type='submit' className='btn btn-primary p-2 ps-3 pe-3 fs-6 fw-bold'>Submit</button>
        </form>
        {/* <>{console.log(dataArr)}</> */}
        {dataArr!==undefined?<IdComp dataArr={dataArr}/>:<></>}
        {dataArr!==undefined?<DescriptionComp dataArr={dataArr}/>:<></>}
        {dataArr!==undefined?<CountryComp dataArr={dataArr}/>:<></>}
    </div>
  )
}

export default FileRead