import { useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { Task } from "@/types";
import { formatDate } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string, completed: boolean) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem = ({ task, onToggleComplete, onDelete }: TaskItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = () => {
    onToggleComplete(task.id, !task.completed);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <li
      className="group"
      data-task-id={task.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <label className="custom-checkbox flex items-start p-2 rounded-md hover:bg-secondary group-hover:bg-secondary">
        <div className="relative shrink-0 mr-5 mt-1"> 
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleChange}
            className="absolute opacity-0 cursor-pointer h-0 w-0"
          />
          <span className="checkmark"></span>
        </div>
        <div className="flex-1 min-w-0">
          <span className={`block text-textColor-light ${task.completed ? 'task-completed' : ''} break-words`}>
            {task.title}
          </span>
          <span className="block text-xs text-muted-foreground mt-1">
            Added: {formatDate(task.createdAt)}
          </span>
        </div>
        <div className={`transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            className="text-muted-foreground hover:text-destructive p-1"
            onClick={handleDelete}
            title="Delete Task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </label>
    </li>
  );
};

export default TaskItem;
