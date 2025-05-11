import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types";
import { generateId } from "@/lib/utils";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (category: Omit<Category, "tasks">) => void;
}

const ICON_OPTIONS = [
  { value: "folder", label: "Folder (General)" },
  { value: "shield-keyhole", label: "Shield (Security)" },
  { value: "bug", label: "Bug (Issues)" },
  { value: "lock", label: "Lock (Authentication)" },
  { value: "database", label: "Database (Storage)" },
  { value: "code", label: "Code (Implementation)" },
  { value: "list", label: "List (General)" },
  { value: "spy", label: "Spy (Reconnaissance)" },
  { value: "file-code", label: "File (Documents)" },
  { value: "user-check", label: "User (Authorization)" },
  { value: "key", label: "Key (Access)" },
  { value: "shield", label: "Shield (Protection)" },
  { value: "activity", label: "Activity (Testing)" },
  { value: "alert-triangle", label: "Alert (Warning)" },
  { value: "search", label: "Search (Discovery)" },
  { value: "filter", label: "Filter (Validation)" },
  { value: "briefcase", label: "Briefcase (Business)" },
];

const AddCategoryDialog = ({ open, onOpenChange, onSave }: AddCategoryDialogProps) => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("folder");

  const handleSave = () => {
    if (name.trim()) {
      onSave({
        id: generateId(),
        name: name.trim(),
        icon,
        expanded: true
      });
      setName("");
      setIcon("folder");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card text-card-foreground sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Category</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a new category to organize your tasks
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
              Category Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Authorization Testing"
              className="bg-background text-foreground border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="icon" className="text-sm font-medium text-muted-foreground">
              Category Icon
            </Label>
            <Select value={icon} onValueChange={setIcon}>
              <SelectTrigger id="icon" className="bg-background text-foreground border-border">
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent className="bg-card text-card-foreground">
                {ICON_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex space-x-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-secondary hover:bg-secondary/80 text-foreground"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/80 text-white">
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
