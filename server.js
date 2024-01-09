const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: false}))
//routes

app.get('/', (req, res) => { 
    res.send('Hello, this is emirhan2')
})

app.get('/blog', (req, res) => { 
    res.send('Hello Blog')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//update a product
app.put('/products/:id', async(req,res) => {
try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    //we cannot find any product in database
    if(!product){
        return res.status(404).json({message: `cannot find any product with ID ${id}`})
    }
    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct);
} catch (error) {
    
}
})

//delete a product 
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product  = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async(req, res) => {
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