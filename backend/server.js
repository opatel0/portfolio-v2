require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./models')

const assistantCtrl = require('./controllers/assistant')

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/assistant', assistantCtrl)

app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});