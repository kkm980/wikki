import moment from 'moment';

export default function groupDataByDate(dataList) {
  const dataByDate = {};

  // Create an array of date keys for the past 30 days
  const dateKeys = [];
  const today = moment();
  for (let i = 0; i < 30; i++) {
    const dateKey = today.clone().subtract(i, 'days').format('DD/MM/YYYY');
    dateKeys.push(dateKey);
  }

  // Initialize dataByDate with empty arrays for each date key
  dateKeys.forEach((dateKey) => {
    dataByDate[dateKey] = [];
  });

  // Group data by date
  dataList.forEach((data) => {
    const createdAt = moment(data.createdAt);
    const dateKey = createdAt.format('DD/MM/YYYY');

    if (dataByDate[dateKey] !== undefined) {
      dataByDate[dateKey].push(data);
    }
  });

  return dataByDate; // Return the object with arrays of data by date
}


