import { useState, useEffect } from 'react';

function TaskForm({ onAdd, taskToEdit, onUpdate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please add a task title');
      return;
    }
    
    const taskData = {
      title,
      description,
      status
    };
    
    if (taskToEdit) {
      onUpdate(taskToEdit._id, taskData);
    } else {
      onAdd(taskData);
    }
    
    // Reset form
    setTitle('');
    setDescription('');
    setStatus('pending');
  };
  
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <label>Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add Task Title"
        />
      </div>
      <div className="form-control">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add Description (optional)"
        ></textarea>
      </div>
      {taskToEdit && (
        <div className="form-control">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}
      <button type="submit" className="btn">
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
      {taskToEdit && (
        <button
          type="button"
          className="btn btn-cancel"
          onClick={() => {
            setTitle('');
            setDescription('');
            setStatus('pending');
            onUpdate(null, null);
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;