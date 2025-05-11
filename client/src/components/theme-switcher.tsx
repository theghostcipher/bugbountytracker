import { useState } from "react";
import { Monitor, Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "@/components/theme-provider";

interface ThemeSwitcherProps {
  type?: "button" | "menu-item";
  className?: string;
}

export function ThemeSwitcher({ type = "button", className }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const handleThemeChange = (newTheme: "light" | "dark" | "bios") => {
    setTheme(newTheme);
    setOpen(false);
  };

  let icon;
  if (theme === "light") {
    icon = <Sun className="h-4 w-4" />;
  } else if (theme === "dark") {
    icon = <Moon className="h-4 w-4" />;
  } else {
    icon = <Laptop className="h-4 w-4" />;
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className={className}
      >
        {icon}
        <span className="ml-2">Theme</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card text-card-foreground sm:max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">Choose Theme</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div
              className={`p-3 rounded-md flex flex-col items-center cursor-pointer ${
                theme === "light" ? "bg-primary/20 ring-1 ring-primary" : "bg-background"
              }`}
              onClick={() => handleThemeChange("light")}
            >
              <Sun className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Light</span>
            </div>
            <div
              className={`p-3 rounded-md flex flex-col items-center cursor-pointer ${
                theme === "dark" ? "bg-primary/20 ring-1 ring-primary" : "bg-background"
              }`}
              onClick={() => handleThemeChange("dark")}
            >
              <Moon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Dark</span>
            </div>
            <div
              className={`p-3 rounded-md flex flex-col items-center cursor-pointer ${
                theme === "bios" ? "bg-primary/20 ring-1 ring-primary" : "bg-background"
              }`}
              onClick={() => handleThemeChange("bios")}
            >
              <Monitor className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">BIOS</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}