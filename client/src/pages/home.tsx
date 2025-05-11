import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Category, Task, Template, TaskFilter, AppState } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { calculateStats, downloadJSON, generateId, stringToDate } from "@/lib/utils";
import { getTemplateById, templates } from "@/data/templates";
import Sidebar from "@/components/sidebar";
import TaskList from "@/components/task-list";
import AddCategoryDialog from "@/components/add-category-dialog";
import { Button } from "@/components/ui/button";
import { Plus, Clock, CheckSquare } from "lucide-react";

const Home = () => {
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  
  // Initial app state
  const initialState: AppState = {
    categories: [],
    currentTemplate: getTemplateById("web-app"),
    lastSaved: null,
    filter: TaskFilter.ALL
  };
  
  // Load state from localStorage
  const [appState, setAppState] = useLocalStorage<AppState>("bug-bounty-app-state", initialState);
  
  // Setup keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+N to add new task
      if (e.altKey && e.key === "n") {
        e.preventDefault();
        const firstCategory = document.querySelector("[data-category-id]");
        if (firstCategory) {
          const input = firstCategory.querySelector("input[type='text']");
          if (input) {
            (input as HTMLInputElement).focus();
          }
        }
      }
      
      // Alt+S to save methodology
      if (e.altKey && e.key === "s") {
        e.preventDefault();
        handleSaveMethodology();
      }
      
      // Escape to close modal
      if (e.key === "Escape") {
        setOpenDialog(false);
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [appState]);
  
  // Filter tasks based on selected filter
  const getFilteredCategories = (): Category[] => {
    if (appState.filter === TaskFilter.ALL) {
      return appState.categories;
    }
    
    return appState.categories.map(category => {
      const filteredTasks = category.tasks.filter(task => {
        if (appState.filter === TaskFilter.COMPLETE) {
          return task.completed;
        } else {
          return !task.completed;
        }
      });
      
      return {
        ...category,
        tasks: filteredTasks
      };
    });
  };
  
  // Handle template change
  const handleTemplateChange = (templateId: string) => {
    const newTemplate = getTemplateById(templateId);
    
    // Confirm if there are existing tasks
    if (appState.categories.flatMap(c => c.tasks).length > 0) {
      if (!confirm("Changing templates will reset your current tasks. Are you sure?")) {
        return;
      }
    }
    
    setAppState({
      ...appState,
      currentTemplate: newTemplate,
      categories: newTemplate.categories,
      lastSaved: new Date().toISOString()
    });
    
    toast({
      title: "Template Changed",
      description: `Loaded "${newTemplate.name}" template`,
    });
  };
  
  // Handle filter change
  const handleFilterChange = (filter: TaskFilter) => {
    setAppState({
      ...appState,
      filter
    });
  };
  
  // Handle saving methodology
  const handleSaveMethodology = () => {
    setAppState({
      ...appState,
      lastSaved: new Date().toISOString()
    });
    
    toast({
      title: "Changes Saved",
      description: "Your methodology has been saved to localStorage",
    });
  };
  
  // Handle exporting methodology
  const handleExportMethodology = () => {
    const exportData = {
      template: appState.currentTemplate.name,
      categories: appState.categories,
      exportedAt: new Date().toISOString()
    };
    
    downloadJSON(exportData, `bug-bounty-methodology-${new Date().toISOString().split('T')[0]}.json`);
    
    toast({
      title: "Export Complete",
      description: "Your methodology has been downloaded as JSON",
    });
  };
  
  // Handle resetting checklist
  const handleResetChecklist = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      // Reset completion status but keep task structure
      const resetCategories = appState.categories.map(category => {
        const resetTasks = category.tasks.map(task => ({
          ...task,
          completed: false
        }));
        
        return {
          ...category,
          tasks: resetTasks
        };
      });
      
      setAppState({
        ...appState,
        categories: resetCategories,
        lastSaved: new Date().toISOString()
      });
      
      toast({
        title: "Progress Reset",
        description: "All task completion has been reset",
      });
    }
  };
  
  // Handle resetting checkboxes (just completed tasks)
  const handleResetCheckboxes = () => {
    if (confirm("Are you sure you want to reset all checkboxes? This will uncheck all completed tasks.")) {
      const resetCategories = appState.categories.map(category => {
        const resetTasks = category.tasks.map(task => {
          if (task.completed) {
            return {
              ...task,
              completed: false
            };
          }
          return task;
        });
        
        return {
          ...category,
          tasks: resetTasks
        };
      });
      
      setAppState({
        ...appState,
        categories: resetCategories,
        lastSaved: new Date().toISOString()
      });
      
      toast({
        title: "Checkboxes Reset",
        description: "All completed tasks have been unchecked",
      });
    }
  };
  
  // Handle renaming template
  const handleRenameTemplate = (templateId: string, newName: string) => {
    if (templateId === 'custom') {
      const updatedTemplate = {
        ...appState.currentTemplate,
        name: newName
      };
      
      setAppState({
        ...appState,
        currentTemplate: updatedTemplate,
        lastSaved: new Date().toISOString()
      });
      
      // Also update the template in local storage for persistence
      const updatedTemplates = templates.map(t => {
        if (t.id === 'custom') {
          return {
            ...t,
            name: newName
          };
        }
        return t;
      });
      
      localStorage.setItem('bug-bounty-templates', JSON.stringify(updatedTemplates));
    }
  };
  
  // Handle importing methodology
  const handleImportMethodology = (data: any) => {
    try {
      if (!data || !data.categories || !Array.isArray(data.categories)) {
        throw new Error('Invalid import data format');
      }
      
      // Map imported data to our data structure
      const importedCategories = data.categories.map((category: any) => {
        if (!category.id || !category.name || !category.tasks || !Array.isArray(category.tasks)) {
          throw new Error('Invalid category format in import');
        }
        
        // Ensure tasks have the proper format
        const validTasks = category.tasks.map((task: any) => {
          if (!task.id || !task.title) {
            // Generate valid task if missing required fields
            return {
              id: generateId(),
              title: task.title || 'Imported Task',
              completed: !!task.completed,
              createdAt: task.createdAt || new Date().toISOString()
            };
          }
          return task;
        });
        
        return {
          id: category.id,
          name: category.name,
          icon: category.icon || 'folder',
          tasks: validTasks,
          expanded: true
        };
      });
      
      setAppState({
        ...appState,
        categories: importedCategories,
        lastSaved: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import Error",
        description: "The imported file has an invalid format",
        variant: "destructive"
      });
    }
  };
  
  // Handle toggling category expansion
  const handleToggleCategory = (categoryId: string) => {
    const updatedCategories = appState.categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          expanded: !category.expanded
        };
      }
      return category;
    });
    
    setAppState({
      ...appState,
      categories: updatedCategories
    });
  };
  
  // Handle adding new task
  const handleAddTask = (categoryId: string, title: string) => {
    const newTask: Task = {
      id: generateId(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    const updatedCategories = appState.categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          tasks: [...category.tasks, newTask]
        };
      }
      return category;
    });
    
    setAppState({
      ...appState,
      categories: updatedCategories,
      lastSaved: new Date().toISOString()
    });
    
    toast({
      title: "Task Added",
      description: "New task added successfully",
    });
  };
  
  // Handle deleting task
  const handleDeleteTask = (categoryId: string, taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      const updatedCategories = appState.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.filter(task => task.id !== taskId)
          };
        }
        return category;
      });
      
      setAppState({
        ...appState,
        categories: updatedCategories,
        lastSaved: new Date().toISOString()
      });
      
      toast({
        title: "Task Deleted",
        description: "Task removed successfully",
      });
    }
  };
  
  // Handle toggling task completion
  const handleToggleTaskComplete = (categoryId: string, taskId: string, completed: boolean) => {
    const updatedCategories = appState.categories.map(category => {
      if (category.id === categoryId) {
        const updatedTasks = category.tasks.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              completed
            };
          }
          return task;
        });
        
        return {
          ...category,
          tasks: updatedTasks
        };
      }
      return category;
    });
    
    setAppState({
      ...appState,
      categories: updatedCategories,
      lastSaved: new Date().toISOString()
    });
    
    toast({
      title: completed ? "Task Completed" : "Task Marked Incomplete",
      description: completed ? "Task marked as complete" : "Task marked as incomplete",
    });
  };
  
  // Handle adding new category
  const handleAddCategory = (newCategory: Omit<Category, "tasks">) => {
    const categoryWithTasks: Category = {
      ...newCategory,
      tasks: []
    };
    
    setAppState({
      ...appState,
      categories: [...appState.categories, categoryWithTasks],
      lastSaved: new Date().toISOString()
    });
    
    toast({
      title: "Category Added",
      description: "New category added successfully",
    });
  };
  
  // If no template is loaded, initialize with web app template
  useEffect(() => {
    if (appState.categories.length === 0 && appState.currentTemplate) {
      setAppState({
        ...appState,
        categories: appState.currentTemplate.categories
      });
    }
  }, [appState.currentTemplate]);
  
  // Calculate stats from all categories
  const stats = calculateStats(appState.categories);
  
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <Sidebar
        currentTemplate={appState.currentTemplate}
        stats={stats}
        filter={appState.filter}
        onTemplateChange={handleTemplateChange}
        onFilterChange={handleFilterChange}
        onSaveMethodology={handleSaveMethodology}
        onExportMethodology={handleExportMethodology}
        onAddCategory={() => setOpenDialog(true)}
        onImportMethodology={handleImportMethodology}
        onResetCheckboxes={handleResetCheckboxes}
        onRenameTemplate={handleRenameTemplate}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-card p-4 border-b border-border">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
            <h1 className="text-lg md:text-xl font-bold text-foreground">
              {appState.currentTemplate.name} Methodology
            </h1>
            <div className="flex items-center space-x-2">
              {appState.lastSaved && (
                <div className="bg-background rounded-md px-2 py-1 flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-xs">Last saved: {stringToDate(appState.lastSaved)}</span>
                </div>
              )}
              <Button 
                onClick={handleResetCheckboxes}
                variant="secondary"
                size="sm"
                className="hover:bg-secondary/80"
              >
                <CheckSquare className="h-4 w-4 mr-1" /> Reset Checkboxes
              </Button>
              <Button 
                onClick={() => setOpenDialog(true)}
                className="bg-primary hover:bg-primary/80 text-white"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Category
              </Button>
            </div>
          </div>
        </header>
        
        {/* Tasks Area */}
        <TaskList
          categories={getFilteredCategories()}
          onToggleCategory={handleToggleCategory}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          onToggleTaskComplete={handleToggleTaskComplete}
        />
        
        {/* Add Task Button (Floating)
        <Button
          className="fixed bottom-6 right-6 bg-primary hover:bg-primary/80 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          onClick={() => {
            const firstCategory = document.querySelector("[data-category-id]");
            if (firstCategory) {
              const input = firstCategory.querySelector("input[type='text']");
              if (input) {
                (input as HTMLInputElement).focus();
              }
            }
          }}
        >
          <Plus className="h-6 w-6" />
        </Button> */}
      </div>
      
      {/* Add Category Dialog */}
      <AddCategoryDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onSave={handleAddCategory}
      />
    </div>
  );
};

export default Home;
