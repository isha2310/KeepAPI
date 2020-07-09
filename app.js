require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const noteRoutes = require('./routes/notes')

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE, 
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
})
.then(() => console.log('Connected'))
.catch((err) => console.log(err))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', noteRoutes)

app.listen(port, () => {
    console.log('App is ruuning at', port)
})