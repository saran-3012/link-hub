const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connection = require('./config/db');
const userRoutes = require('./Routers/user');

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.MONGO_DB_URI;

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.status(200).send("Link hub server!");
});

app.listen(port, async () => {
    try{
        await connection(uri);
        console.log(`Server is listening to port: ${port}`);
        console.log("MongoDB is Connected");
    }
    catch(err){
        console.log(err);
    }
});