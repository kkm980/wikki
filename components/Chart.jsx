"use client";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import thirtyDaysAgo from '../lib/getDatesArr';
import hoursArr from '../lib/getDayArr';
import minutesArr from "../lib/getMinutesArr";
import groupDataByDate from "../utils/groupDataByDate";
import groupDataByHour from "../utils/groupDataByHour";
import groupDataByMinute from "../utils/groupDataByMinute";
import { groupDataByHourlyForLastWeek } from "../utils/groupDataByDay";
import LineChart from "./LineChart"
Chart.register(...registerables);

const LineChartComponent = ({ dataVal, chartTime, dateRange }) => {
  // Define initial states
  const DayState = [...hoursArr];
  const monthState = [...thirtyDaysAgo];
  const minuteState = [...minutesArr];

  const [labels, setLabels] = useState([]);
  const [usefulData, setUsefulData] = useState({});
  const [dataSets, setDataSets] = useState([]);
  const [hrArray, setHrArray] = useState([]);

  const [preState, setPreState] = useState({
    labels: [],
    datasets: [
      {
        label: 'Search Strength',
        backgroundColor: [
          'Indigo',
          'Purple',
          'Yellow',
          'Teal',
          'Red',
          'Navy',
          'Brown',
        ],
        fill: false,
        lineTension: 1,
        borderColor: 'rgba(251, 37, 118, 1)',
        borderWidth: 2,
        data: [],
      },
    ],
  });

  // Update labels and usefulData based on chartTime and dataVal
  useEffect(() => {
    // Define labels based on the selected chartTime
    let selectedLabels;
    switch (chartTime) {
      case 'daily':
        selectedLabels = DayState;
        break;
      case 'weekly':
        selectedLabels = hrArray || [];
        break;
      case 'monthly':
        selectedLabels = monthState;
        break;
      case 'hourly':
        selectedLabels = minuteState;
        break;
      default:
        selectedLabels = [0, 0, 0, 0, 0];
        break;
    }
    setLabels(selectedLabels);

    // Define usefulData based on the selected chartTime
    let selectedUsefulData;
    switch (chartTime) {
      case 'daily':
        selectedUsefulData = groupDataByHour(dataVal);
        break;
      case 'monthly':
        selectedUsefulData = groupDataByDate(dataVal);
        break;
      case 'hourly':
        selectedUsefulData = groupDataByMinute(dataVal);
        break;
      case 'weekly':
        selectedUsefulData = chartTime === 'weekly' ? groupDataByHourlyForLastWeek(dataVal, hrArray) : {};
        break;
      default:
        selectedUsefulData = { 0: [], 0: [], 0: [], 0: [] };
        break;
    }
    setUsefulData(selectedUsefulData);
  }, [dataVal, chartTime, hrArray]);

  // Calculate startDate and endDate based on dateRange
  useEffect(() => {
    const currentDate = moment();
    let startDate, endDate;
    
    if (dateRange?.startDate) {
      startDate = moment(dateRange.startDate);
      const maxStartDate = moment().subtract(7, 'days'); // Max start date is 7 days ago from today
      startDate = startDate.isBefore(maxStartDate) ? maxStartDate : startDate;
    } else {
      // If startDate is not provided, start 7 days ago from today
      startDate = moment().subtract(7, 'days');
    }
    
    if (dateRange?.endDate) {
      endDate = moment(dateRange.endDate);
      endDate = endDate.isAfter(currentDate) ? currentDate : endDate; // Max end date is today
    } else {
      // If endDate is not provided, use today's date
      endDate = currentDate;
    }
    
    // Generate hourly time keys within the date range
    let new_heArr = []
    while (startDate.isSameOrBefore(endDate, 'hour')) {
      const hourKey = startDate.format('dddd HH:mm DD/MM/YYYY'); // Include date, day, and hour for uniqueness
      new_heArr.push(hourKey);
      startDate.add(1, 'hour');
    }
    console.log(hrArray, "hourlyTimeArray");
    setHrArray([...new_heArr]);
    
  }, [dateRange, chartTime]);

  // Update dataSets based on chartTime and usefulData
  useEffect(() => {
    let updatedDataSets;
    if (chartTime === 'weekly') {
      updatedDataSets = Object.keys(usefulData).length === 0 ?
        hrArray.map(() => 0) :
        hrArray.map(e => usefulData[e]?.length || 0);
    } else {
      updatedDataSets = Object.keys(usefulData).length === 0 ?
        labels.map(() => 0) :
        labels.map(e => usefulData[e]?.length || 0);
    }
    setDataSets(updatedDataSets);
  }, [labels, usefulData, hrArray, chartTime]);

  // Update preState based on chartTime, labels, and dataSets
  useEffect(() => {
    setPreState({
      labels: chartTime === 'weekly' ? hrArray : labels,
      datasets: [
        {
          label: 'Total Searches',
          backgroundColor: [
            'Indigo',
            'Purple',
            'Yellow',
            'Teal',
            'Red',
            'Navy',
            'Brown',
          ],
          fill: false,
          lineTension: 1,
          borderColor: 'rgba(251, 37, 118, 1)',
          borderWidth: 2,
          data: dataSets,
        },
      ],
    });
  }, [labels, dataSets]);

  return (
    <div className=''>
      <LineChart {...{preState}}/>
    </div>
  );
};

export default LineChartComponent;