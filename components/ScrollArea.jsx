"use client"
import * as React from "react";
import axios from 'axios'; // Use ES6 import syntax
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { useTheme } from 'next-themes';
const moment = require('moment');
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import SkeletonLoader from "./MainPageSkeleton";

export default function ScrollBox({ header, showData, addNewSearchedData }) {
  const { resolvedTheme } = useTheme();
  const [selectedTitle, setSelectedTitle] = React.useState('');
  const [contents, setContents] = React.useState([]);

  const handleButtonClick = (title) => {
    setSelectedTitle(title);
  };

  const getContents = async (text) => {
    let resp;
    let contents = [];
    // setLoading(true);
    try {
      // Make a POST request to '/api/wikiOne' with the 'tag' in the request body
      const response = await axios.post('/api/wikiOne', { tag: text });

      // Access the response data directly
      const json = response.data;
      // Assuming 'json' contains the expected 'contents' property
      contents = json.contents;
      setContents(contents);
      addNewSearchedData(json);
      // Make a POST request to '/api/dbPostWiki' with the obtained response in the request body
      const postResponse = await axios.post('/api/dbPostWiki', { tag: json });
    } catch (err) {
      //   setError(err);
      console.log(err, "err")
    } finally {
      //   setLoading(false);
    }
    // setContents(contents);
  };
  return (
    <ScrollArea className={`h-72 w-[30%] rounded-lg border ${resolvedTheme === 'dark' ? 'bg-[#27374D] border-[#1F6E8C] text-[#9DB2BF] shadow-[#526D82] shadow-md' : 'bg-white border-black shadow-2xl shadow-blue-300'} rounded-lg`}>
      <div className="p-4 relative rounded-lg">
        <h4 className="mb-4 text-xl font-medium leading-none sticky top-0">{header}</h4>
        {showData?.length === 0 &&
          <>
            <SkeletonLoader height="h-[30px]" width="w-[200px] rounded-none" />
            <SkeletonLoader height="h-[30px]" width="w-[200px] rounded-none" />
            <SkeletonLoader height="h-[30px]" width="w-[200px] rounded-none" />
            <SkeletonLoader height="h-[30px]" width="w-[200px] rounded-none" />
          </>
        }
        {showData?.length > 0 && showData.map((tag, i) => {
          const timestamp = tag.createdAt;
          const formattedDate = moment(timestamp).format("DD/MM hh:mm A");

          return (
            <React.Fragment key={i}>
              <div className="text-sm relative">
                <p className="absolute text-[0.6rem] -top-3.5 left-1" style={{color:"red"}}>{formattedDate}</p>
                <Dialog>
                  <DialogTrigger
                    className={`block border border-[#4B527E] p-1 rounded-md mb-2 hover:bg-gray px-3 py-2 ${resolvedTheme === 'dark' ? 'hover:bg-gray-300' : 'hover:bg-blue-600'
                      } cursor-pointer`}
                    onClick={() => {
                      handleButtonClick(tag.text);
                      getContents(tag.text); // Set the selected title and contents
                    }}
                  >
                    {tag.text}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{selectedTitle}</DialogTitle>
                      {contents?.map((content, j) => (
                        <div key={j} dangerouslySetInnerHTML={{ __html: content }} />
                      ))}
                      <div>
                        <a href={`https://en.wikipedia.org/wiki/${selectedTitle}`} target="_blank">
                          ...Read More
                        </a>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <Separator className="my-2" />
            </React.Fragment>
          );
        })}
      </div>
    </ScrollArea>
  )
}
