import { useEffect, useState, useRef } from "react";
import { 
  Save, 
  Download, 
  Upload, 
  RefreshCw, 
  Plus, 
  Bug, 
  CheckSquare, 
  Menu, 
  Edit, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ThemeSwitcher } from "@/components/theme-switcher";
import ProgressStats from "@/components/progress-stats";
import { Stats, Template, TaskFilter, Category } from "@/types";
import { templates } from "@/data/templates";

interface SidebarProps {
  currentTemplate: Template;
  stats: Stats;
  filter: TaskFilter;
  onTemplateChange: (templateId: string) => void;
  onFilterChange: (filter: TaskFilter) => void;
  onSaveMethodology: () => void;
  onExportMethodology: () => void;
  onAddCategory: () => void;
  onImportMethodology?: (data: any) => void;
  onResetCheckboxes?: () => void;
  onRenameTemplate?: (templateId: string, newName: string) => void;
}

const Sidebar = ({
  currentTemplate,
  stats,
  filter,
  onTemplateChange,
  onFilterChange,
  onSaveMethodology,
  onExportMethodology,
  onAddCategory,
  onImportMethodology = () => {},
  onResetCheckboxes = () => {},
  onRenameTemplate = () => {}
}: SidebarProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const importFileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        onImportMethodology(data);
        toast({
          title: "Import Successful",
          description: "Your methodology has been imported"
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Failed to parse the imported file",
          variant: "destructive"
        });
      } finally {
        // Reset the input value so the same file can be imported again
        if (importFileRef.current) {
          importFileRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  const handleRenameTemplate = () => {
    if (newTemplateName.trim()) {
      onRenameTemplate(currentTemplate.id, newTemplateName.trim());
      setRenameDialogOpen(false);
      toast({
        title: "Template Renamed",
        description: `Template has been renamed to "${newTemplateName.trim()}"`
      });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

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
          <Button variant="secondary" className="flex-1" onClick={() => importFileRef.current?.click()}>
            <Upload className="h-4 w-4 mr-1" /> Import
            <input 
              type="file" 
              ref={importFileRef}
              accept=".json" 
              className="hidden" 
              onChange={handleImportFile}
            />
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button className="flex-1" onClick={onSaveMethodology}>
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
          <Button variant="outline" className="flex-1" onClick={onExportMethodology}>
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
        </div>
        
        <div className="flex space-x-2 mt-2">
          <Button variant="secondary" className="flex-1" onClick={onResetCheckboxes}>
            <CheckSquare className="h-4 w-4 mr-1" /> Reset Boxes
          </Button>
        </div>
      </div>
    );
  }

  // Desktop sidebar
  return (
    <div className={`bg-card md:h-screen flex flex-col border-r border-border transition-all duration-300 ${isSidebarCollapsed ? 'md:w-16' : 'md:w-64'} w-full relative`}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute -right-4 top-6 h-8 w-8 rounded-full bg-secondary hidden md:flex z-10"
        onClick={toggleSidebar}
      >
        {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
      
      <div className="p-4 flex flex-col h-full overflow-y-auto">
        <div className="flex items-center mb-6">
          <Bug className="text-primary h-6 w-6 mr-2 shrink-0" />
          {!isSidebarCollapsed && <h1 className="text-xl font-bold text-foreground">BugHunt Tracker</h1>}
        </div>
        
        {!isSidebarCollapsed && (
          <>
            <div className="mb-6">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Templates</h2>
              <div className="flex">
                <div className="flex-1">
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
                {currentTemplate.id === "custom" && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-1"
                    onClick={() => {
                      setNewTemplateName(currentTemplate.name);
                      setRenameDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
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
          </>
        )}

        <div className={`mt-auto space-y-2 ${isSidebarCollapsed ? 'flex flex-col items-center py-2' : ''}`}>
          {!isSidebarCollapsed ? (
            <>
              <Button 
                className="w-full bg-primary hover:bg-primary/80 text-white"
                onClick={onSaveMethodology}
              >
                <Save className="mr-2 h-4 w-4" /> Save Methodology
              </Button>
              <Button 
                variant="secondary" 
                className="w-full hover:bg-secondary/80 text-foreground"
                onClick={() => importFileRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" /> Import
                <input 
                  type="file" 
                  ref={importFileRef}
                  accept=".json" 
                  className="hidden" 
                  onChange={handleImportFile}
                />
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-secondary hover:bg-secondary/80 text-foreground"
                onClick={onExportMethodology}
              >
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
              <Button 
                variant="secondary" 
                className="w-full hover:bg-secondary/80 text-foreground"
                onClick={onResetCheckboxes}
              >
                <CheckSquare className="mr-2 h-4 w-4" /> Reset Checkboxes
              </Button>
            </>
          ) : (
            <div className="flex flex-col space-y-3 w-full">
              <Button variant="ghost" size="icon" onClick={onSaveMethodology} title="Save Methodology" className="flex justify-center">
                <Save className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => importFileRef.current?.click()} title="Import" className="flex justify-center">
                <Upload className="h-5 w-5" />
                <input 
                  type="file" 
                  ref={importFileRef}
                  accept=".json" 
                  className="hidden" 
                  onChange={handleImportFile}
                />
              </Button>
              <Button variant="ghost" size="icon" onClick={onExportMethodology} title="Export" className="flex justify-center">
                <Download className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onResetCheckboxes} title="Reset Checkboxes" className="flex justify-center">
                <CheckSquare className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Rename Template Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent className="bg-card text-card-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Rename Template</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="template-name" className="text-sm font-medium text-muted-foreground">
                Template Name
              </Label>
              <Input
                id="template-name"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                placeholder="e.g., My Custom Methodology"
                className="bg-background text-foreground border-border"
              />
            </div>
          </div>
          <DialogFooter className="flex space-x-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setRenameDialogOpen(false)}
              className="bg-secondary hover:bg-secondary/80 text-foreground"
            >
              Cancel
            </Button>
            <Button onClick={handleRenameTemplate} className="bg-primary hover:bg-primary/80 text-white">
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;