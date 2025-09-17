import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Aggregate visitors by period
        const periodVisitors = data.reduce((acc, item) => {
            acc[item.period] = (acc[item.period] || 0) + item.visitors;
            return acc;
        }, {});
        const labels = Object.keys(periodVisitors);
        const visitorsData = Object.values(periodVisitors);

        const ctx = canvasRef.current.getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: visitorsData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(64, 206, 86, 0.6)',
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Users by Time Period' }
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

export default PieChart;