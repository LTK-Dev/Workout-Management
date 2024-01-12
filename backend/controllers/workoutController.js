const Workout = require("../models/workout")
const mongoose = require("mongoose")

// Get all workouts
const getWorkouts = async (req,res) => {
    // Get all and sort by DESC create at
    // newest one on top
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// Get one
const getWorkout = async (req,res) => {
    const { id } = req.params

    // Kiem tra xem dung loai format ID cua DB 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: "No workout found"})
    }

    res.status(200).json(workout)
}

// Create one
const createWorkout = async (req, res) => {
    // lay data truyen vao
    const {title, reps, load} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }


    try {
        // Add new workout to db
        const workout = await Workout.create({title, reps, load})
        // Gui ve tin hieu thanh cong va in ra
        res.status(200).json(workout)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

// Delete one
const deleteWorkout = async (req,res) => {
    const { id } = req.params

    // Kiem tra xem dung loai format ID cua DB 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    // Tim va Xoa no theo id
    const workout = await Workout.findByIdAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: "No workout found"})
    }

    res.status(200).json(workout)
}

// Update one
const updateWorkout = async (req, res) => {
    const { id } = req.params

    // Kiem tra xem dung loai format ID cua DB 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"})
    }

    // Tim va Cap nhat no theo id
    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        // Tach 3 thuoc tinh ra khoi body bang ... va cap nhat
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({error: "No workout found"})
    }

    // In ra workout trc khi update
    res.status(200).json(workout)
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}