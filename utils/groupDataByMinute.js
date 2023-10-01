import moment from 'moment';

export default function groupDataByMinute(dataList) {
  const now = moment();
  const dataByMinute = {};

  for (let i = 0; i < 60; i++) { // Loop for the past 60 minutes
    const currentMinute = now.clone().subtract(i, 'minutes');
    const minuteKey = currentMinute.format('HH:mm'); // Use 'HH:mm' to represent minutes

    dataByMinute[minuteKey] = dataList.filter((data) => {
      const createdAt = moment(data.createdAt);
      return createdAt.isBetween(currentMinute, currentMinute.clone().add(1, 'minutes'), null, '[]'); // Check if createdAt is within this minute
    });
  }

  return dataByMinute;
}
