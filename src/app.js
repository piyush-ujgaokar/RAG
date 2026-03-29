const express=require('express')
const {PDFParse}=require('pdf-parse')
const app=express()

async function extractText(){
    const parser=new PDFParse('./Full Stack 2.pdf')
    const data=await parser.getText()
    console.log(data)
}

extractText()


module.exports=app
