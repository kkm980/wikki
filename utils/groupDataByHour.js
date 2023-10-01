import moment from 'moment';

export default function groupDataByHour(dataList) {
  const now = moment();
  const dataByHour = {};

  for (let i = 0; i < 24; i++) {
    const currentHour = now.clone().subtract(i, 'hours');
    const hourKey = currentHour.format('H');

    dataByHour[hourKey] = dataList.filter((data) => {
      const createdAt = moment(data.createdAt);
      return createdAt.format('H') === hourKey;
    });
  }

  return dataByHour; // Return the object directly
}

