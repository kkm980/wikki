"use client"

import * as React from "react"

import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

export default function DropDownMenu({chartTime, setChartTime}) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Duration Filter</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Search Duration</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={chartTime} onValueChange={setChartTime}> 
          <DropdownMenuRadioItem value="hourly">1 Hour</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="daily">1 Day</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="weekly">1 Week</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="monthly">1 Month</DropdownMenuRadioItem>
         
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
