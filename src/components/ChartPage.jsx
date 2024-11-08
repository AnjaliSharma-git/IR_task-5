import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const ChartPage = ({ entries }) => {
  const projectTimeData = () => {
    const projectTimes = {};
    entries.forEach((entry) => {
      if (!projectTimes[entry.project]) {
        projectTimes[entry.project] = 0;
      }
      projectTimes[entry.project] += entry.time / 60;
    });

    return {
      labels: Object.keys(projectTimes),
      datasets: [
        {
          label: 'Time Spent (minutes)',
          data: Object.values(projectTimes).map((time) => Math.round(time * 10) / 10),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const projectPieData = () => {
    const projectTimes = {};
    entries.forEach((entry) => {
      if (!projectTimes[entry.project]) {
        projectTimes[entry.project] = 0;
      }
      projectTimes[entry.project] += entry.time / 60;
    });

    return {
      labels: Object.keys(projectTimes),
      datasets: [
        {
          label: 'Time Spent (minutes)',
          data: Object.values(projectTimes).map((time) => Math.round(time * 10) / 10),
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const barChartOptions = () => {
    const projectTimes = Object.values(projectTimeData().datasets[0].data);
    const maxDataValue = Math.max(...projectTimes) || 1; // Fallback to 1 to avoid zero max value
    const minDataValue = Math.min(...projectTimes);

    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          min: Math.floor(minDataValue),  // Optionally adjust for visual clarity
          max: Math.ceil(maxDataValue * 1.1), // 10% padding for clarity
        },
      },
    };
  };

  return (
    <div className="chart-page">
      <h2>Time Spent per Project</h2>
      <div className="chart-container">
        <div className="bar-chart" style={{ width: '70%', height: '400px' }}>
          <h3>Bar Chart</h3>
          <Bar 
            data={projectTimeData()} 
            options={barChartOptions()} 
          />
        </div>

        <div className="pie-chart" style={{ width: '30%' }}>
          <h3>Pie Chart</h3>
          <Pie data={projectPieData()} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
