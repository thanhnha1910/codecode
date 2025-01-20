import {useState, useEffect} from "react";
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement} from "chart.js";
ChartJS.register(ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale);
const RevenueDashboard = ({year, filterType}) => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        // Dữ liệu gán cứng để hiển thị trên UI
        const mockData = [
            {TourID: 1, TotalRevenue: 1000, TotalBookings: 20},
            {TourID: 2, TotalRevenue: 750, TotalBookings: 15},
            {TourID: 3, TotalRevenue: 1500, TotalBookings: 30},
            {TourID: 4, TotalRevenue: 500, TotalBookings: 10},
            {TourID: 5, TotalRevenue: 1200, TotalBookings: 25}
        ];

        // Dữ liệu cho biểu đồ
        const labels = mockData.map((item) => `Tour ${item.TourID}`);
        const revenues = mockData.map((item) => item.TotalRevenue);
        setChartData({
            labels: labels,
            datasets: [
                {
                    label: "Revenue (in USD)",
                    data: revenues,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                }
            ],
        });

        setLoading(false);
    }, [year, filterType]);

    if (loading) {
        return <p>Loading...</p>;
    } else {
        return (
            <div>
                <h2>Revenue Statistics ({filterType})</h2>
                <Bar data={chartData}/>
            </div>
        );
    }
};

export default RevenueDashboard;
