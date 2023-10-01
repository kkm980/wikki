"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "../components/ui/button";
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "../components/ui/dialog";
import SkeletonLoader from "./MainPageSkeleton";

export default function DialogueBox({ tag }) {
  const { resolvedTheme } = useTheme();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // Function to fetch contents based on the provided 'tag'
  const getContents = async () => {
    let contents = [];
    setLoading(true);
    try {
      // Make a POST request to the '/api/wikiOne' endpoint with the 'tag' in the request body
      const response = await axios.post('/api/wikiOne', { tag });
      const json = response.data;
      contents = json.contents;
      setContents(contents);

      // Make a POST request to '/api/dbPostWiki' with the obtained response in the request body
      const postResponse = await axios.post('/api/dbPostWiki', { tag: json });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger content fetching when the component mounts
  useEffect(() => {
    getContents();
  }, []);

  // Render loading message
  if (loading) return "Loading ...";

  // Render error message if an error occurs
  if (error) return "An error occurred";

  // Render the dialogue box with fetched contents
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{tag}</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[80%] h-[80vh] overflow-y-auto overflow-x-hidden shadow-xl ${resolvedTheme === 'dark' ? 'bg-[#2D4263] text-white' : 'bg-white text-black'}`}>
        <div className={`sticky -top-2 w-auto max-w-[30%] h-[30px] text-lg font-medium border border-amber-600 p-0.5 ${resolvedTheme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>{tag}</div>
        {contents?.map(content => (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ))}
        {contents.length === 0 &&
          <>
            {/* Display skeleton loaders while loading content */}
            <SkeletonLoader height="h-[30px]" width="w-[200px] rounded-none" />
            <SkeletonLoader height="h-[30px]" width="w-[200px] rounded-none" />
            <SkeletonLoader height="h-[30px]" width="w-[200px] rounded-none" />
          </>
        }
      </DialogContent>
    </Dialog>
  )
}



