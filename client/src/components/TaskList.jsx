import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks yet. Add a task to get started!</p>;
  }
  
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;