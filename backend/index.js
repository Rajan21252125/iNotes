const express = require('express');
const dbConnection = require('./db')

dbConnection();

const app = express();
const PORT = 4000

app.get('/',(req,res)=>{
    res.send('Hello World From Backend')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})
