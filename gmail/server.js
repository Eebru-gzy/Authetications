const express = require('express');
const app = express();
const cors = require('cors');
const { urlencoded } = require('express');
require('dotenv').config();
const mongoServer = require('./config/db');
const userSignup = require('./routes/user')

//Initialize DB server
mongoServer();

//Global Middlewares
app.use(cors());
app.use(express.json())
app.use(urlencoded({extended: false}))

app.get('/', (req, res)=> {
  res.send('App in development')
})

app.use('/api', userSignup)

const PORT = 8999;

app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});