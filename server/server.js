const port = process.env.PORT || 3000
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

app.use(morgan('dev'))
bodyParser.urlencoded({extended: true})
app.use(bodyParser.json())

app.use('/api/users', require('./routes/users'))

app.get('/', (req, res)=>{
    res.json('main page')
})

// if route could not be resolved
app.use((req, res)=>{
    res.status(404).json("route not found")
})

// global error handler
app.use((err, req, res, next) => {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);

    res.status(500).json({
      message: err.message,
      error: process.env.NODE_ENV === 'production' ? {} : err,
    });
})


app.listen(port, function(){
    console.log("Express server is running at port ", port)
})