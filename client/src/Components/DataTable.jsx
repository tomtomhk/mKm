const DataTable = ({ data }) => (
    <div className="table-responsive">
        <table className="table table-striped table-bordered">
            <thead>
            <tr>
                <th>Time</th>
                <th>Users</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.hour}</td>
                    <td>{item.visitors}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default DataTable;