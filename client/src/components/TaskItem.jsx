function TaskItem({ task, onDelete, onEdit }) {
    return (
      <div className={`task ${task.status === 'completed' ? 'completed' : ''}`}>
        <div className="task-content">
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <p className="status">Status: {task.status}</p>
          <p className="date">
            Created: {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="task-actions">
          <button onClick={() => onEdit(task)} className="btn btn-edit">
            Edit
          </button>
          <button onClick={() => onDelete(task._id)} className="btn btn-delete">
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  export default TaskItem;