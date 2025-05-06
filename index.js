const express = require('express')
const cors = require('cors')
const dotenv= require('dotenv')

dotenv.config()

// mongodb
require('./config/db')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server start running on PORT ${PORT}`);
    
})