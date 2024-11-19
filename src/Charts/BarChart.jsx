import React, { useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'; // Import necessary components
import { Bar } from 'react-chartjs-2';

// Register the chart type and necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ dataCounts, certificateTypes }) => {
  const data = {
    labels: certificateTypes,
    datasets: [{
      label: 'Certificate Distribution',
      data: certificateTypes.map((type) => dataCounts[type] || 0), // Map counts to certificate types
      backgroundColor: 'rgb(75, 192, 192)',  // Single color for all bars
      borderColor: 'rgb(54, 162, 235)',  // Border color for bars
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Positioning of the legend
        labels: {
          color: "#333", // Text color for better readability
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Certificate Type',
        },
        ticks: {
          color: "#333",  // X-axis label color
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        ticks: {
          color: "#333",  // Y-axis label color
        },
      },
    },
  };

  useEffect(() => {
    const ctx = document.getElementById('myBarChart').getContext('2d');

    // Destroy previous chart instance to avoid the 'Canvas is already in use' error
    if (ctx.chart) {
      ctx.chart.destroy();
    }

    const chartInstance = new ChartJS(ctx, {
      type: 'bar',  // Change chart type to 'bar'
      data: data,
      options: options,
    });

    return () => {
      // Clean up the chart when the component unmounts
      chartInstance.destroy();
    };
  }, [dataCounts, certificateTypes]); // Re-run effect when data changes

  return (
    <div className="chart-container h-96">
      <canvas id="myBarChart"></canvas>
    </div>
  );
};

export default BarChart;
