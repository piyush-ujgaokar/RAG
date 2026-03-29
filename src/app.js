import express from 'express'
import { PDFParse} from 'pdf-parse'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
import { Pinecone } from '@pinecone-database/pinecone'
import { MistralAIEmbeddings } from "@langchain/mistralai";
import {RecursiveCharacterTextSplitter} from '@langchain/textsplitters'
import { log } from 'console'

const app=express()


const pc= new Pinecone({
    apiKey:process.env.PINECONE_API_KEY,
})

    const index=pc.index('rag')

    // let dataBuffer=fs.readFileSync('./Full Stack 2.pdf')
    // const parser=new PDFParse({
    //     data:dataBuffer
    // })
    // const data=await parser.getText()

    const mistralEmbeddings=new MistralAIEmbeddings({
        apiKey:process.env.MISTRAL_API_KEY,
        model:"mistral-embed"
    })

// const textSplitter=new RecursiveCharacterTextSplitter({
//     chunkSize:300,
//     chunkOverlap:0
// })

// const chunks=await textSplitter.splitText(data.text)
//     console.log(chunks)
 
//     const docs=await Promise.all(chunks.map(async (chunk)=>{
//         const embedding=await mistralEmbeddings.embedQuery(chunk)
//         return {
//             text:chunk,
//             embedding
//         }
//     }))

//    const result=await index.upsert({
//     records:docs.map((doc,i)=>({
//         id:`doc-${i}`,
//         values:doc.embedding,
//         metadata:{
//             text:doc.text 
//         }
//     }))
//    })
//    console.log(result)


    const queryEmbedding=await mistralEmbeddings.embedQuery("currently piyush is studying in which college? ")

    console.log(queryEmbedding)

    const result=await index.query({
        topK:2,
        vector:queryEmbedding,
        includeMetadata:true
    })
    
    const resultData=JSON.stringify(result)
    console.log(resultData)


export default app
