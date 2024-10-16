// src/components/Chart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Dataset Label',
                data: data.values,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return <Bar data={chartData} />;
};

export default Chart;
