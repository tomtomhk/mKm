import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => item.hour),
                datasets: [{
                    label: 'Users Over Time',
                    data: data.map(item => item.visitors),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Number of Users' }
                    },
                    x: {
                        title: { display: true, text: 'Time' }
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return <canvas ref={canvasRef}></canvas>;
};

export default LineChart;