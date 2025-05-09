const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title for the task'], // Custom error message
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: 'pending', // Default value if not provided
      enum: {
        values: ['pending', 'completed'],
        message: '{VALUE} is not a valid status', // Custom error message for invalid status
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
