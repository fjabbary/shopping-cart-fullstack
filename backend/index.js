const express = require('express')
const app = express()
const port = 5000
const products = require('./products')
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/products', (req, res) => {
    res.send(products)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})