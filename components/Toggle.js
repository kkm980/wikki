"use client"

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [curr_theme, setCurr_theme] = React.useState("light");

  React.useEffect(() => {
    setTheme("light");
  }, []);

  React.useEffect(() => {
    // Update the curr_theme state when resolvedTheme changes
    setCurr_theme(resolvedTheme);
  }, [resolvedTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          style={{ backgroundColor: curr_theme === "dark" ? "black" : "white" }}
        >
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

