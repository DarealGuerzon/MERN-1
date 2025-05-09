const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find({}).sort({ createdAt: -1 });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const createTask = async (req, res) => {
    try {
      const { title, description } = req.body;
      
      if (!title) {
        return res.status(400).json({ message: 'Please provide a title' });
      }
      
      const task = await Task.create({
        title,
        description,
      });
      
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // @desc    Get task by ID
  // @route   GET /api/tasks/:id
  // @access  Public
const getTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // @desc    Update task
  // @route   PUT /api/tasks/:id
  // @access  Public
const updateTask = async (req, res) => {
    try {
      const { title, description, status } = req.body;
      
      const task = await Task.findById(req.params.id);
      
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { title, description, status },
        { new: true }
      );
      
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // @desc    Delete task
  // @route   DELETE /api/tasks/:id
  // @access  Public
const deleteTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      await Task.findByIdAndDelete(req.params.id);
      
      res.status(200).json({ id: req.params.id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
  };