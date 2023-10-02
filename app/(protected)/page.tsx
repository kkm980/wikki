"use client";
import { useEffect, useState } from "react";
import axios from "axios";

import LineChart from "../../components/Chart.jsx";
import "tailwindcss/tailwind.css";
import ScrollBox from "../../components/ScrollArea.jsx";
import ContentText from "../../components/ContentText.jsx";
import DropDownMenu from "../../components/DropDownMenu.jsx";
import DateRangePicker from "../../components/DateRangePicker.jsx";
import {dateType, chartType} from "../../utils/typeEnums.js";

export default function Home() {
  const [usernameFromApiReq, setUsernameFromApiReq] = useState("");
  const [dashboardData, setDashboardData] = useState([[], [], [], []]);
  const [loading, setLoading] = useState(true);
  const [chartTime, setChartTime] = useState('daily');
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const currentDate = new Date();
  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);
  
  const [dateRange, setDateRange] = useState(
    {
      startDate: sevenDaysAgo,
      endDate: currentDate,
      key: 'selection',
    },
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the "/api/whoAmI" endpoint
        const res = await axios.get("/api/whoAmI");
        setUsernameFromApiReq(res.data?.name ?? "");

        const dashboardDataApi = "/api/dbWiki";
        setLoading(false);

        // Fetch one-day data
        const oneDayData = await axios.post(dashboardDataApi, { date: dateType.twentyfourHours });
        const oneDayDataArray = [...oneDayData.data];

        // Fetch one-week data
        const oneWeekData = await axios.post(dashboardDataApi, { date: dateType.oneWeek});
        const oneWeekDataArray = [...oneWeekData.data];

        // Fetch one-month data
        const oneMonthData = await axios.post(dashboardDataApi, { date: dateType.oneMonth });
        const oneMonthDataArray = [...oneMonthData.data];

        // Fetch one-hour data
        const oneHourData = await axios.post(dashboardDataApi, { date: dateType.oneHour });
        const oneHourDataArray = [...oneHourData.data];


        // Initialize dashboardData as an array of arrays
        setDashboardData([oneDayDataArray, oneWeekDataArray, oneMonthDataArray, oneHourDataArray]);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, []);

  function addNewSearchedData(data){
    let [a,b,c,d] = dashboardData;
    setDashboardData([[data, ...a],[data, ...b],[data, ...c],[data, ...d]]);
  }

  return (
    <main className={`px-8 py-[40px] mt-[60px] font-sans overflow-x-hidden`}>
      {!loading && <>
        <div className="flex items-center justify-between mt-[200px]">
          <ContentText />
        </div>

        <div className="flex items-center justify-between">
          <ScrollBox header="1 Hour results" showData={dashboardData[3]} addNewSearchedData={addNewSearchedData}/>
          <ScrollBox header="1 Day results" showData={dashboardData[0]} addNewSearchedData={addNewSearchedData}/>
          <ScrollBox header="1 Week results" showData={dashboardData[1]} addNewSearchedData={addNewSearchedData}/>
        </div>
        <div className="flex items-center justify-between mt-[200px]">
          <ContentText text={`${chartTime} Search chart`} />
        </div>
        <div className="w-[60%] h-[400px] mt-8 relative border border-text">
          <LineChart dataVal={dashboardData[chartType[chartTime]]} chartTime={chartTime} dateRange={dateRange}/>
          <div className="absolute top-0 right-0 flex justify-between items-center">
            <DropDownMenu {...{ chartTime, setChartTime }} />
            <div style={{display:chartTime==='weekly'?"block":"none"}}>
              <div className="rounded rounded-md border border-text text-md p-1 mx-2 cursor-pointer" style={{border:"1px solid black", marginLeft:"10px"}} 
              onClick={() => { setOpenDatePicker(!openDatePicker) }}>{`${openDatePicker?'Close ':'Open '}Range Selector `}</div>
            </div>
            
            {
              openDatePicker && chartTime==='weekly' && <div className="absolute"><DateRangePicker {...{dateRange, setDateRange}}/></div>
            }
          </div>
        </div>
      </>}

    </main>
  );
}

