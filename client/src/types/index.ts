// Task represents a single to-do item
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

// Category represents a group of related tasks
export interface Category {
  id: string;
  name: string;
  icon: string;
  tasks: Task[];
  expanded?: boolean;
}

// Template represents a predefined set of categories and tasks
export interface Template {
  id: string;
  name: string;
  description: string;
  categories: Category[];
}

// Stats represents completion statistics
export interface Stats {
  completed: number;
  total: number;
  percentage: number;
}

// Filter options for tasks display
export enum TaskFilter {
  ALL = "all",
  INCOMPLETE = "incomplete",
  COMPLETE = "complete"
}

// State of the application
export interface AppState {
  categories: Category[];
  currentTemplate: Template;
  lastSaved: string | null;
  filter: TaskFilter;
}
