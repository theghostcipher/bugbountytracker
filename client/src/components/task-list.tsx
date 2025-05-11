import { useState } from "react";
import { Info, ChevronDown, Plus } from "lucide-react";
import { Category, Task } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TaskItem from "@/components/task-item";
import { generateId, getCategoryColor } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface TaskListProps {
  categories: Category[];
  onToggleCategory: (categoryId: string) => void;
  onAddTask: (categoryId: string, title: string) => void;
  onDeleteTask: (categoryId: string, taskId: string) => void;
  onToggleTaskComplete: (categoryId: string, taskId: string, completed: boolean) => void;
}

const TaskList = ({ 
  categories, 
  onToggleCategory, 
  onAddTask, 
  onDeleteTask, 
  onToggleTaskComplete 
}: TaskListProps) => {
  const [newTaskInputs, setNewTaskInputs] = useState<Record<string, string>>({});

  const getIcon = (iconName: string): LucideIcon => {
    // @ts-ignore - dynamic icon import
    return Icons[iconName.charAt(0).toUpperCase() + iconName.slice(1)] || Icons.List;
  };

  const handleAddTask = (categoryId: string) => {
    const taskTitle = newTaskInputs[categoryId]?.trim();
    if (taskTitle) {
      onAddTask(categoryId, taskTitle);
      setNewTaskInputs({
        ...newTaskInputs,
        [categoryId]: ""
      });
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, categoryId: string) => {
    if (e.key === "Enter") {
      handleAddTask(categoryId);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* Information Card */}
      <Card className="bg-primary/10 border border-primary/30 mb-6">
        <CardContent className="p-4 flex items-start">
          <Info className="text-primary h-5 w-5 mr-3 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Keyboard Shortcuts</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="kbd">Alt + N</span> - Add new task</p>
              <p><span className="kbd">Alt + S</span> - Save methodology</p>
              <p><span className="kbd">Space</span> - Check/uncheck selected task</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories and Tasks */}
      {categories.map((category, index) => {
        const IconComponent = getIcon(category.icon);
        const completedTasks = category.tasks.filter(task => task.completed).length;
        const iconColorClass = getCategoryColor(index);
        
        return (
          <Card key={category.id} className="bg-card rounded-lg mb-4 shadow-sm">
            <div 
              className="p-4 border-b border-border flex justify-between items-center cursor-pointer"
              onClick={() => onToggleCategory(category.id)}
            >
              <div className="flex items-center">
                <IconComponent className={`${iconColorClass} mr-2 h-5 w-5`} />
                <h2 className="font-semibold text-foreground text-lg">{category.name}</h2>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground mr-2">
                  {completedTasks}/{category.tasks.length} completed
                </span>
                <ChevronDown className={`text-muted-foreground h-5 w-5 transition-transform ${category.expanded ? 'rotate-180' : ''}`} />
              </div>
            </div>
            <div 
              className="transition-height"
              style={{ 
                maxHeight: category.expanded ? '2000px' : '0',
                opacity: category.expanded ? '1' : '0',
                overflow: category.expanded ? 'visible' : 'hidden',
                visibility: category.expanded ? 'visible' : 'hidden',
              }}
            >
              <div className="p-4">
                <div className="mb-4 flex">
                  <Input
                    value={newTaskInputs[category.id] || ""}
                    onChange={(e) => setNewTaskInputs({
                      ...newTaskInputs,
                      [category.id]: e.target.value
                    })}
                    onKeyPress={(e) => handleInputKeyPress(e, category.id)}
                    placeholder="Add a new task..."
                    className="bg-background text-foreground border-border flex-1"
                  />
                  <Button 
                    onClick={() => handleAddTask(category.id)}
                    className="ml-2 bg-primary hover:bg-primary/80 text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <ul className="space-y-2">
                  {category.tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggleComplete={(taskId, completed) => 
                        onToggleTaskComplete(category.id, taskId, completed)
                      }
                      onDelete={(taskId) => onDeleteTask(category.id, taskId)}
                    />
                  ))}
                  {category.tasks.length === 0 && (
                    <li className="text-center py-4 text-muted-foreground text-sm">
                      No tasks in this category. Add one above!
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default TaskList;
