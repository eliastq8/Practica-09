const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const URL ='https://api-rest-productos.onrender.com/'

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/productos", (req, res) => {
    axios.get(URL + 'productos')
    .then((response)=>{
        mis_productos=[]
        response.data.map(item=>{
            const nuevo =item
            nuevo.proveedor="Elias"
            nuevo.costo=item.costo*1.6
            mis_productos.push(nuevo)
        })
        res.status(200).json(mis_productos)
    })
    .catch((e)=>{
        res.status(e.response.status).json(e)
    })   
})
  app.get("/productos/:id", (req, res) => {
    axios.get(URL + `productos/${req.params.id}`)
    .then((response)=>{
        const nuevo=response.data
        nuevo.proveedor="Elias"
        nuevo.costo=response.data.costo*1.6
        res.status(200).json(nuevo)
    })
    .catch((e)=>{
        res.status(e.response.status).json(e)
    }) 
  })
  app.get("/productos/categoria/:categoria", (req, res) => {
    axios.get(URL + `productos/categoria/${req.params.categoria}`)
    .then((response)=>{
        mis_productos=[]
        response.data.map(item=>{
            const nuevo =item
            nuevo.proveedor="Elias"
            nuevo.costo=item.costo*1.6
            mis_productos.push(nuevo)
        })
        res.status(200).json(mis_productos)
    })
    .catch((e)=>{
        res.status(e.response.status).json(e)
    }) 
  })
  app.post("/productos",(req, res) => {
    axios.post(URL + `productos/`,req.body)
    .then((response)=>{
        res.status(201).json(response.data)
    })
    .catch((e)=>{
        res.status(e.response.status).json(e)
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})