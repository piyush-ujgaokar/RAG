import express from 'express'
import {PDFParse} from 'pdf-parse'
import fs from 'fs'
import {RecursiveCharacterTextSplitter} from '@langchain/textsplitters'

const app=express()

    let dataBuffer=fs.readFileSync('./Full Stack 2.pdf')
    const parser=new PDFParse({
        data:dataBuffer
    })
    const data=await parser.getText()
    console.log(data)



const textSplitter=new RecursiveCharacterTextSplitter({
    chunkSize:300,
    chunkOverlap:0
})

const chunks=await textSplitter.splitText(data.text)
console.log(chunks,chunks.length)

export default app
