// Importieren
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const paperRoutes = require('./routes/papers')

// starte Express Server
const app = express()

// Middleware (next to go on to next piece of middleware (app.use/get/...)), erstmal nur console logging
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes (see routes/papers.js)
app.use('/api/papers', paperRoutes)

// IMPORTANT: .env file wird nicht in GitHub/GitLab gepusht, eigenes .env file erstellen mit werten MONGO_URI (von Mongo Atlas Cluster) und PORT

//connect to Db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // starte Server, listened auf PORT, über dotenv file: Process greift auf Variable PORT zu in .env
        app.listen(process.env.PORT, () => {
        console.log(`connected to database, listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

