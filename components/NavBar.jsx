"use client"

import React, { useState, useRef } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

import { useTheme } from "next-themes";
import ModeToggle from "./Toggle.jsx";
import SearchInput from "./SearchInput.jsx";
import SignInButton from "./SignInButton.tsx";

export default function NavBar() {
  const { resolvedTheme } = useTheme();
  const [searchResults, setSearchResults] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dropdownRef = useRef(null);
  const abortController = useRef(new AbortController());

  const performSearch = async (searchValue) => {
    // Cancel the previous request before making a new one
    abortController.current.abort();

    // Create a new AbortController
    abortController.current = new AbortController();

    try {
      setLoadingStatus(true);

      const response = await axios.post(
        "/api/wikiSearch",
        { searchValue },
        {
          signal: abortController.current.signal, // Use the signal from the current AbortController
        }
      );

      setSearchResults(response.data);
         // Make a POST request to '/api/dbPostWiki' with the obtained response in the request body
        const postResponse = await axios.post('/api/dbPostWiki', { tag: {contents:"search again", text:searchValue, success:true} });
      setLoadingStatus(false);
    } catch (error) {
      if (error.name === "AbortError") {
        // Request was canceled, do nothing
      } else {
        setLoadingStatus(false);
        console.log("err", error);
        setErrorMessage("Unable to load Wikipedia search results at this time.");
      }
    }
  };

  return (
    <div
      className={`flex justify-between items-center h-[50px] w-full fixed ${
        resolvedTheme === "dark"
          ? "bg-black text-white"
          : "bg-white text-black"
      } z-10 font-sans`}
    >
      {/* Left Side */}
      <div className="sm:ml-1 md:ml-4">
        {/* Your logo or other content goes here */}
        Logo
      </div>

      {/* Search Box and Dropdown */}
      <SearchInput {...{ performSearch, searchResults, setSearchResults }} />
      {/* Theme Toggle */}
      <div className="sm:mr-1 md:mr-4 flex gap-3">
        <SignInButton />
        <ModeToggle />
      </div>
    </div>
  );
}

