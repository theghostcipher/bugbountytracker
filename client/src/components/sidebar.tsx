import { useEffect, useState } from "react";
import { Save, Download, RefreshCw, Plus, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitcher } from "@/components/theme-switcher";
import ProgressStats from "@/components/progress-stats";
import { Stats, Template, TaskFilter } from "@/types";
import { templates } from "@/data/templates";

interface SidebarProps {
  currentTemplate: Template;
  stats: Stats;
  filter: TaskFilter;
  onTemplateChange: (templateId: string) => void;
  onFilterChange: (filter: TaskFilter) => void;
  onSaveMethodology: () => void;
  onExportMethodology: () => void;
  onResetChecklist: () => void;
  onAddCategory: () => void;
}

const Sidebar = ({
  currentTemplate,
  stats,
  filter,
  onTemplateChange,
  onFilterChange,
  onSaveMethodology,
  onExportMethodology,
  onResetChecklist,
  onAddCategory
}: SidebarProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // For mobile, we'll render the sidebar horizontally at the top
  if (isMobile) {
    return (
      <div className="bg-card w-full p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Bug className="text-primary h-6 w-6 mr-2" />
            <h1 className="text-xl font-bold text-foreground">BugHunt Tracker</h1>
          </div>
          <Button variant="outline" size="sm" onClick={onAddCategory}>
            <Plus className="h-4 w-4 mr-1" /> Add Category
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <Label htmlFor="mobile-template-selector" className="text-xs text-muted-foreground mb-1 block">Templates</Label>
            <Select value={currentTemplate.id} onValueChange={onTemplateChange}>
              <SelectTrigger id="mobile-template-selector" className="bg-background text-foreground border-border">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Filter</Label>
            <Select value={filter} onValueChange={(value) => onFilterChange(value as TaskFilter)}>
              <SelectTrigger className="bg-background text-foreground border-border">
                <SelectValue placeholder="Filter tasks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TaskFilter.ALL}>Show All</SelectItem>
                <SelectItem value={TaskFilter.INCOMPLETE}>Incomplete Only</SelectItem>
                <SelectItem value={TaskFilter.COMPLETE}>Completed Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex space-x-2 mb-2">
          <ThemeSwitcher className="flex-1 justify-center" />
          <Button variant="outline" className="flex-1" onClick={onExportMethodology}>
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button className="flex-1" onClick={onSaveMethodology}>
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
          <Button variant="destructive" className="flex-1" onClick={onResetChecklist}>
            <RefreshCw className="h-4 w-4 mr-1" /> Reset
          </Button>
        </div>
      </div>
    );
  }

  // Desktop sidebar
  return (
    <div className="bg-card md:w-64 w-full md:h-screen p-4 flex flex-col border-r border-border">
      <div className="flex items-center mb-6">
        <Bug className="text-primary h-6 w-6 mr-2" />
        <h1 className="text-xl font-bold text-foreground">BugHunt Tracker</h1>
      </div>
      
      <div className="mb-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Templates</h2>
        <Select value={currentTemplate.id} onValueChange={onTemplateChange}>
          <SelectTrigger className="bg-background text-foreground border-border">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map(template => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Filters</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="filter-all" 
              checked={filter === TaskFilter.ALL}
              onCheckedChange={() => onFilterChange(TaskFilter.ALL)}
            />
            <Label htmlFor="filter-all" className="text-foreground">Show All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="filter-incomplete" 
              checked={filter === TaskFilter.INCOMPLETE}
              onCheckedChange={() => onFilterChange(TaskFilter.INCOMPLETE)}
            />
            <Label htmlFor="filter-incomplete" className="text-foreground">Incomplete Only</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="filter-complete" 
              checked={filter === TaskFilter.COMPLETE}
              onCheckedChange={() => onFilterChange(TaskFilter.COMPLETE)}
            />
            <Label htmlFor="filter-complete" className="text-foreground">Completed Only</Label>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <ProgressStats stats={stats} />
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Appearance</h2>
        <ThemeSwitcher className="w-full justify-start mb-2" />
      </div>

      <div className="mt-auto space-y-2">
        <Button 
          className="w-full bg-primary hover:bg-primary/80 text-white"
          onClick={onSaveMethodology}
        >
          <Save className="mr-2 h-4 w-4" /> Save Methodology
        </Button>
        <Button 
          variant="outline" 
          className="w-full bg-secondary hover:bg-secondary/80 text-foreground"
          onClick={onExportMethodology}
        >
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={onResetChecklist}
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Reset Checklist
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
