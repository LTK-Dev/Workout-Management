const express = require('express')
require("dotenv").config()
const workoutRoutes = require("./routes/workout.js")
const mongoose = require("mongoose")
const cors = require('cors')

// Tao app
const app = express()

app.use(cors())


const port = process.env.PORT

// Neu khi POST PATCH thi req se duco truyen vao object req cua route
app.use(express.json())


// Tao middleware no se chay truoc moi route
// Global middleware
app.use( (req,res,next) => {
    // In ra kieu API req
    console.log(req.path, req.method)
    next()
})

// Set up cho route mac dinh chay tu local/api/workouts
app.use("/api/workouts",workoutRoutes)

// Ket noi database
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        // Tao port
        app.listen(port, () => {
            console.log(`Connect to DB and app listening on port ${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

