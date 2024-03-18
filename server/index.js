require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const router = require('./router/index.js')
const errorMiddleware = require('./middlewares/error-middlewares')

const app = express();

app.use(cors(
  {
    origin: [""],
    methods: ["POST","GET"],
    credentials:true
  }
))

mongoose.connect('mongodb+srv://referee:12345@nodejsexpressclustersss.8hkecg2.mongodb.net/test?retryWrites=true&w=majority');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api',router)
app.use(errorMiddleware)



const start = async() =>{
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT,()=>console.log(`Server is listen on port - ${PORT}`))

        // app.listen(3000,()=>console.log('123'))

    }
    catch (error){
        console.log(error)
    }
}

start()
