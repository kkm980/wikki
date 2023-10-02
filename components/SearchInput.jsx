import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import axios from 'axios'; // Use ES6 import syntax
import { useTheme } from 'next-themes';
import { Input } from "./ui/input"
// import DialogueBox from './DialogueBox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog"
  
export default function SearchInput({ performSearch, searchResults }) {
    const { resolvedTheme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(''); // State to hold the selected title
    const [contents, setContents]=useState([])
    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        performSearch(query);
    };

    // Close the dropdown when the user clicks outside of it
    // Removed this part to allow dropdown to stay open

    useEffect(() => {
        // Show the dropdown if searchText has a value and searchResults has length
        if (searchTerm.length>0 && searchResults?.length > 0) {
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    }, [searchTerm, searchResults]);

    // Function to handle button click and set the selected title and contents
    const handleButtonClick = (title) => {
        setSelectedTitle(title);
    };

    const getContents = async (tag) => {
        let resp;
        let contents = [];
        // setLoading(true);
        try {
          // Make a POST request to '/api/wikiOne' with the 'tag' in the request body
          const response = await axios.post('/api/wikiOne', { tag });
        
          // Access the response data directly
          const json = response.data;
          // Assuming 'json' contains the expected 'contents' property
          contents = json.contents;
          setContents(contents);

        // Make a POST request to '/api/dbPostWiki' with the obtained response in the request body
        const postResponse = await axios.post('/api/dbPostWiki', { tag: json });
        } catch (err) {
        //   setError(err);
        console.log(err,"err")
        } finally {
        //   setLoading(false);
        }
        // setContents(contents);
      };
    
    


    return (
        <div className="relative mx-4">
            
            <div className="relative">
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search Wikipedia"
                    className="px-2 py-1 rounded-full border border-gray-300 transition-all duration-300 focus:ring focus:ring-blue-300 focus:outline-none focus:border-blue-500 hover:border-blue-500 pr-8"
                />
                {searchTerm && (
                    <button
                        onClick={() => { setSearchTerm(''); }}
                        className="absolute top-1 right-0 mt-1 mr-2 text-gray-500 hover:text-blue-500 cursor-pointer"
                    >
                        &#x2715; {/* Unicode character for a multiplication sign (×) */}
                    </button>
                )}
            </div>

            {showDropdown && (
                <div className={`absolute z-10 mt-2 py-1 border rounded-md shadow-lg w-64 max-h-[80vh] overflow-y-auto p-2`}>
                    <ul className={`${resolvedTheme === 'dark' ? 'bg-black text-white border-gray-300 rounded-md' : 'bg-white text-black border-gray-300 rounded-md'}`}>
                        {searchResults?.map((result) => (
                        <Dialog>
                        <DialogTrigger className={`block border border-zinc p-1 rounded-md mb-2 hover:bg-gray px-3 py-2 ${resolvedTheme === 'dark' ? 'hover:bg-gray-300' : 'hover:bg-blue-600'} cursor-pointer`}
                        onClick={() => {
                                handleButtonClick(result.text);
                                getContents(result.text) // Set the selected title and contents
                            }}>{result.text}</DialogTrigger>
                                <DialogContent

                                >
                                    <DialogHeader>
                                        <DialogTitle>{selectedTitle}</DialogTitle>
                                        {contents?.map(content => (
                                            <div dangerouslySetInnerHTML={{ __html: content }} />
                                        ))}
                                        <div>
                                            <a href={`https://en.wikipedia.org/wiki/${selectedTitle}`} target="_blank">
                                                ...Read More
                                            </a>
                                        </div>
                                    </DialogHeader>
                                </DialogContent>
                      </Dialog>

                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
