import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  // Fetch tasks
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);
  
  // Add task
  const addTask = async (task) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, task);
      setTasks([response.data, ...tasks]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  // Set task to edit
  const editTask = (task) => {
    setTaskToEdit(task);
  };
  
  // Update task
  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
      setTaskToEdit(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm 
        onAdd={addTask} 
        taskToEdit={taskToEdit} 
        onUpdate={updateTask} 
      />
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList 
          tasks={tasks} 
          onDelete={deleteTask} 
          onEdit={editTask} 
        />
      )}
    </div>
  );
}

export default App;