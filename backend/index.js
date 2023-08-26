const express = require('express');
const dbConnection = require('./db')
const cors = require('cors')

dbConnection();

const app = express();
app.use(express.json())
const PORT = 4000
app.use(cors())



//routes
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.get('/',(req,res)=>{
    try {
    res.send('Hello World From Backend')
    } catch (error) {
        console.error()
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})
