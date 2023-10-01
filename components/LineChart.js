"use client";
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LineChart = ({preState }) => {

  return (
      <Line
        data={preState}
        options={{
          title: {
            display: true,
            text: 'Search History',
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      />
  );
};

export default LineChart;