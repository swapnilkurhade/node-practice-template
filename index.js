import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
const app = express();

app.use(express.json())
app.use(bodyParser.json());

app.get('/',(req, res)=>{
    res.send({'name':'swapnil'})
})

const connectToDB = () =>{
    mongoose.connect('mongodb://127.0.0.1:27017/testdb').then(()=>{
        console.log("connected")
    }).catch((e)=>{
        console.log('error occured')
        console.log(e)
    })
}

connectToDB();

const sampleDataSchema = new mongoose.Schema({
    name : { type: String, required: true},
    lastName : { type: String, required: true}
})

const dataModel = mongoose.model('sampleData', sampleDataSchema)

// ===== EndPoints===

app.get('/saveData', async(req, res)=>{
    try {

        const obj = { name : 'swapnil', lastName:'Kurhade'}
        const {name,lastName} = obj;
        const newData = new dataModel({ name , lastName});
        const saveData = await newData.save();
        res.status(201).json(saveData)
        
    } catch (error) {
        res.status(500).json({error : error})
    }
})


// =====
app.listen(5000,()=>{
    console.log('server is running...');  
})





















// const http = require('http');
// const server = http.createServer((req, res)=>{
    
//     if(req.url == '/'){
//         res.end('Home Page...')
//     }

//     if(req.url == '/about'){
//         res.end('About Page')
//     }

//     res.end('Error')
// })

// server.listen(5000, ()=>{
//     console.log('Server is running....');
// })

