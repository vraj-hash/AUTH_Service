const express = require('express');

const {PORT} = require('./config/server-config');

const app =express();


const prepareAndStartServer = ()=>{
     
    app.listen(PORT,()=>{
        console.log(`Server started at PORT: ${PORT}`);
    })
}

prepareAndStartServer();