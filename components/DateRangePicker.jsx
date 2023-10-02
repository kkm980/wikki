import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Import the styles
import 'react-date-range/dist/theme/default.css'; // Import the theme styles

function CalendarDateRangeSelector({dateRange, setDateRange}) {

    const handleSelect = (ranges) => {
        setDateRange({...ranges.selection});
    };

  return (
    <div className='absolute -top-[20px] right-[0px] border-4 border-text'>
        <h1>select date range in 1 week</h1>
      <DateRange
        ranges={[dateRange]}
        onChange={handleSelect}
      />
    </div>
  );
}

export default CalendarDateRangeSelector;

