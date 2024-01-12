const mongoose = require("mongoose")

const Schema = mongoose.Schema

// Tao cau truc du lieu
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {
    // add time vao khi dc tao hay update
    timestamps: true
})

// export va khoi tao model
module.exports = mongoose.model("Workout", workoutSchema)