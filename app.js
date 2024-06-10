const express = require('express')
const app = express()
const port = 3000

// see how this variable passes the property on...
function middleware1 (req, res, next) {
    req.customProperty = 100;
    next();
}

function middleware2 (req, res, next) {
    console.log(`The custom property: ${req.customProperty}`)
    req.customProperty = 600;
    next();
}

function errorHandler (err, req, res, next) {
    res.json({ err: err })
}

// Global middleware
app.use(middleware1);
app.use(middleware2);

// middleware function
function standExpressCallback (req, res, next) {
    console.log('I am the standard express function')
    res.send(`<h1>the value is: ${req.customProperty}</h1>`);
}

// 
app.get('/', standExpressCallback)

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

