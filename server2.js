const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())

//routes

app.get('/', (req, res) => { 
    res.send('Hello, this is emirhan2')
})

app.get('/blog', (req, res) => { 
    res.send('Hello Blog')
})

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)

mongoose.connect('mongodb+srv://emirhan:fCRYG7y3bEZSgRdq@emirhan.1gsm5of.mongodb.net/Hello-Mongo?retryWrites=true&w=majority')
.then(() =>{
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    })
}).catch(() =>{
    console.log(error)
})