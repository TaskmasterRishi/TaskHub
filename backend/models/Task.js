const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    enum: ['todo', 'in-progress', 'completed'],
    default: 'todo'
  }
}, {
  timestamps: true
});


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;