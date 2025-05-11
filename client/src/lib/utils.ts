import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Category, Stats, Task } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateStats(categories: Category[]): Stats {
  const allTasks = categories.flatMap(category => category.tasks);
  const total = allTasks.length;
  const completed = allTasks.filter(task => task.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    completed,
    total,
    percentage
  };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
}

export function stringToDate(timeAgo: string): string {
  if (!timeAgo) return "Never";
  
  const now = new Date();
  const date = new Date(timeAgo);
  const diffInMs = now.getTime() - date.getTime();
  const diffInMins = Math.round(diffInMs / (1000 * 60));
  const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMins < 1) return "Just now";
  if (diffInMins === 1) return "1 minute ago";
  if (diffInMins < 60) return `${diffInMins} minutes ago`;
  if (diffInHours === 1) return "1 hour ago";
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 30) return `${diffInDays} days ago`;
  
  return formatDate(timeAgo);
}

export function downloadJSON(data: any, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getCategoryColor(index: number): string {
  const colors = [
    "text-primary",
    "text-warning",
    "text-destructive",
    "text-success",
    "text-purple-500",
    "text-cyan-500",
    "text-amber-500",
    "text-rose-500"
  ];
  
  return colors[index % colors.length];
}
