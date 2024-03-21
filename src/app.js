const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');


dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

const routerApi = require('./router');

app.use(cors());
app.use(express.json());
app.use(helmet());


app.get('/',(req,res)=>{
    res.send('API Proyecto Curso v1.0');
});

routerApi(app);

app.listen(port,()=>{
    console.log("Port ==> ", port);
});