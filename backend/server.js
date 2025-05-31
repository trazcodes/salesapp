const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


app.use('/', require('./route'))

app.listen(5000,()=>{
    console.log("Server Started");
})