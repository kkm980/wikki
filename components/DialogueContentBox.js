import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import axios from 'axios';

export default function DialogueBox({ selectedTitle, setSelectedTitle }) {
  const { resolvedTheme } = useTheme();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // Styles for the dialog component
  const dialogStyles = {
    backdropFilter: 'blur(50px)', // Add a blur effect to the background
    backgroundColor: `rgba(255, 255, 255, ${resolvedTheme === 'dark' ? '0.2' : '0.7'})`, // Transparent background with different opacity based on theme
  };

  // Function to fetch contents based on the selected title
  const getContents = async () => {
    setLoading(true);
    try {
      // Make a POST request to '/api/wikiOne' with the 'selectedTitle' in the request body
      const response = await axios.post('/api/wikiOne', { tag: selectedTitle });

      // Access the response data directly
      const json = response.data;

      // Assuming 'json' contains the expected 'contents' property
      const contents = json.contents;
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
  }, [selectedTitle]);

  // Render loading message
  if (loading) return "Loading ...";

  // Render error message if an error occurs
  if (error) return "An error occurred";

  return (
    <div className="fixed top-0 left-0 h-full w-[100%] flex items-start justify-start z-[100] bg-white">
      <div
        className={`w-80% h-90% ${resolvedTheme === 'dark' ? 'bg-[#2D4263] text-white' : 'bg-white text-black'} rounded-lg shadow-xl`}
        style={dialogStyles}
      >
        <div className="sticky top-0 w-full py-2 text-lg font-medium bg-amber-600 text-white flex justify-between items-center px-4">
          {selectedTitle}
          <div onClick={() => setSelectedTitle('')}>cancel</div>
        </div>
        
        {contents?.map((content, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: content }} />
        ))}
        
      </div>
    </div>
  );
}