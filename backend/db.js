const mongoose = require('mongoose');


const mongoURI = "mongodb+srv://Rajan2125:Rajan2125@cluster0.odasbup.mongodb.net/"


const mogoConnection = () => {
    mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch((error) => {
        console.log('MongoDB not connected because:',error)
    })
}


module.exports = mogoConnection;