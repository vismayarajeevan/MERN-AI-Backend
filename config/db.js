const mongoose = require('mongoose')


const connectionString = process.env.DBCONNECTIONSTRING

// connect with mongodb
mongoose.connect(connectionString).then(res=>{
    console.log('Mongodb atlas connected successfully');
    
}).catch(err=>{
    console.log('Mongodb atlas connection failed');
    console.log(err);
    
})