import { useState, useEffect } from 'react';
import LineChart from './Components/LineChart';
import PieChart from './Components/PieChart';
import DataTable from './Components/DataTable';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch JSON data from the server
        axios.get('../data.json')
            .then(response => {
                const parsedData = response.data.peopleFlow.map(record => ({
                    hour: record.hour,
                    visitors: parseInt(record.visitors),
                    period: record.period
                }));
                setData(parsedData);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load data');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">MGM AI Dashboard</h1>
            <div className="row">
                <div className="col-12 mb-4">
                    <LineChart data={data} />
                </div>
            </div>
            <div>
                <p>

                </p>
            </div>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <PieChart data={data} />
                </div>

                <div className="col-md-6 mb-4">
                    <DataTable data={data} />
                </div>
            </div>
        </div>
    );
};

export default App;