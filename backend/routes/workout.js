const express = require("express")
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutController")

// Do ta khong the truy cap dc bien app
const route = express.Router()

// Get all
route.get("/", getWorkouts)

// Get one
route.get("/:id", getWorkout)

// Post 
route.post("/",createWorkout)

// Delete 
route.delete("/:id", deleteWorkout)

// Update
route.patch("/:id", updateWorkout)

// Xuat route ra
module.exports = route