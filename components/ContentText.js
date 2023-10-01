"use client";
import * as React from "react"
import { useTheme } from 'next-themes'

export default function ContentText({ text = "Get details of query on Wikipedia that you did, you do and you will do" }) {
  const { resolvedTheme } = useTheme();
  return (
    <div className={`h-auto w-[90%] rounded-lg ${resolvedTheme === 'dark' ? 'bg-[dark] text-[#526D82]' : 'bg-white text-black'} rounded-lg flex justify-between items-center mt-12 mb-4`}>
      <h6 className="p-4 text-2xl font-lg font-bold h-auto mb-4">
        {text}
      </h6>
    </div>
  )
}