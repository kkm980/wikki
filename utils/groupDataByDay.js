import moment from 'moment';

export function hourlyWeekTimeArr(dateRange) {
  console.log(dateRange)
  const hourlyTimeArray = [];
  const currentDate = moment();
  let startDate, endDate;
  console.log(dateRange, dateRange?.startDate, dateRange?.endDate);
  if (dateRange?.startDate) {
    console.log("hi");
    startDate = moment(dateRange.startDate);
  } else {
    // If startDate is not provided, start 7 days ago from today
    startDate = moment().subtract(7, 'days');
  }

  if (dateRange?.endDate) {
    endDate = moment(dateRange.endDate);
  } else {
    // If endDate is not provided, use today's date
    endDate = currentDate;
  }

  // Ensure that startDate is not later than endDate
  // if (startDate.isAfter(endDate)) {
  //   throw new Error('startDate cannot be later than endDate');
  // }

  // Generate hourly time keys within the date range
  while (startDate.isSameOrBefore(endDate, 'hour')) {
    const hourKey = startDate.format('dddd HH:mm'); // Include day and hour for uniqueness
    hourlyTimeArray.push(hourKey);
    startDate.add(1, 'hour');
  }
  console.log(hourlyTimeArray,"hourlyTimeArray");
  return hourlyTimeArray;
}

export function groupDataByHourlyForLastWeek(dataList, hrArray) {
  const dataByHourly = {};
  const hourlyTimeArray = hrArray; // Reuse the generated hourlyTimeArray

  hourlyTimeArray.forEach((hourKey) => {
    dataByHourly[hourKey] = dataList?.filter((data) => {
      const createdAt = data.createdAt;
      // Parse the ISO timestamp
      const parsedTimestamp = moment(createdAt);

      // Format it as "Wednesday 02:49"
      const formattedTimestamp = parsedTimestamp.format('dddd HH:mm');


      // Split the time strings into day and hour parts
      const [day1, hourMinute1] = hourKey.split(' ');
      const [day2, hourMinute2] = formattedTimestamp.split(' ');

      // Extract the hour from the hourMinute parts
      const [hour1] = hourMinute1.split(':');
      const [hour2] = hourMinute2.split(':');
     console.log(day1 === day2 && hour1 === hour2);
      // Compare the day and hour parts
      return day1 === day2 && hour1 === hour2;

    });
  });

  return dataByHourly;
}

