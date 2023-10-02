// components/Toggle.jsx

// Import necessary modules and components
"use client"
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Define the ModeToggle component
export default function ModeToggle() {
  // Retrieve theme-related data using the useTheme hook
  const { setTheme, resolvedTheme } = useTheme();

  // Initialize the curr_theme state with the "light" theme as default
  const [curr_theme, setCurr_theme] = React.useState("light");

  // Effect to set the initial theme to "light" when the component mounts
  React.useEffect(() => {
    setTheme("light");
  }, []);

  // Effect to update the curr_theme state when the resolvedTheme changes
  React.useEffect(() => {
    setCurr_theme(resolvedTheme);
  }, [resolvedTheme]);

  // Render the ModeToggle component
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Button component with conditional styling based on the current theme */}
        <Button
          variant="outline"
          size="icon"
          style={{ backgroundColor: curr_theme === "dark" ? "black" : "white" }}
        >
          {/* Render Moon icon for dark theme and Sun icon for light theme */}
          {curr_theme === "dark" ? (
            <Moon
              className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white"
              onClick={() => setTheme("light")}
            />
          ) : (
            <Sun
              className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-black"
              onClick={() => setTheme("dark")}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
