import { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from "chart.js";

ChartJS.register(
    ArcElement,
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
);

const RevenueDashBoard = ({ year }) => {
    const [chartData, setChartData] = useState({});
    const [pieChartData, setPieChartData] = useState({});
    const [combinedChartData, setCombinedChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState("month");
    const [selectedYear, setSelectedYear] = useState(2023);
    const [topTours, setTopTours] = useState([]);
    const fetchData = async () => {
        setLoading(true);
        try {
            let url;
            
            // Chọn API endpoint dựa trên filterType
            if (filterType === "month") {
                // Lấy dữ liệu theo tháng
                const currentMonth = new Date().getMonth() + 1;
                url = `http://localhost:5128/api/PaymentStatistics/RevenueByTourMonthly?year=${selectedYear}&month=${currentMonth}`;
            } else if (filterType === "quarter") {
                // Lấy dữ liệu theo quý
                const currentQuarter = Math.floor((new Date().getMonth() + 3) / 3);
                url = `http://localhost:5128/api/PaymentStatistics/RevenueByTourQuarterly?year=${selectedYear}&quarter=${currentQuarter}`;
            } else {
                // Lấy dữ liệu theo năm
                url = `http://localhost:5128/api/PaymentStatistics/RevenueByTourYearly?year=${selectedYear}`;
            }
    
            // Lấy top 5 tour phổ biến
            const top5Response = await fetch(`http://localhost:5128/api/PaymentStatistics/Top5PopularTours?year=${selectedYear}`);
            const top5Data = await top5Response.json();
    
            const response = await fetch(url);
            const jsonData = await response.json();
    
            if (!response.ok || !top5Response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Xử lý dữ liệu cho biểu đồ
            const revenueData = jsonData.map(item => ({
                tourId: item.tourID,
                revenue: item.totalRevenue,
                bookings: item.totalPayments
            }));
    
            // Cập nhật chart data
            setChartData({
                labels: revenueData.map(item => `Tour ${item.tourId}`),
                datasets: [{
                    label: 'Revenue',
                    data: revenueData.map(item => item.revenue),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            });
    
            // Cập nhật pie chart data
            const totalBookings = top5Data.reduce((sum, item) => sum + item.totalBookings, 0);
            setPieChartData({
                labels: top5Data.map(item => `Tour ${item.tourID}`),
                datasets: [{
                    data: top5Data.map(item => ((item.totalBookings / totalBookings) * 100).toFixed(2)),
                    backgroundColor: [
                        '#FFB6C1', '#FFDAB9', '#FFFACD', '#D3FFCE', '#ADD8E6'
                    ]
                }]
            });
    
            // Cập nhật combined chart data
            setCombinedChartData({
                labels: revenueData.map(item => `Tour ${item.tourId}`),
                datasets: [
                    {
                        label: 'Bookings',
                        data: revenueData.map(item => item.bookings),
                        type: 'bar',
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Revenue',
                        data: revenueData.map(item => item.revenue),
                        type: 'line',
                        borderColor: '#4BC0C0',
                        borderWidth: 2,
                        fill: false
                    }
                ]
            });
    
            setTopTours(top5Data);
            setLoading(false);
    
        } catch (error) {
            console.error("Error fetching data:", error.message);
            setLoading(false);
        }
    };
    
    

    useEffect(() => {
        fetchData();
    }, [filterType, selectedYear]);
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Revenue Dashboard
                    </h1>
                    
                    <div className="flex flex-wrap justify-center gap-6 mb-4">
                        <div className="flex items-center space-x-2">
                            <label className="text-gray-700 font-medium">Filter Type:</label>
                            <select 
                                value={filterType} 
                                onChange={(e) => setFilterType(e.target.value)}
                                className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            >
                                <option value="month">Month</option>
                                <option value="quarter">Quarter</option>
                                <option value="year">Year</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <label className="text-gray-700 font-medium">Year:</label>
                            <select 
                                value={selectedYear} 
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                disabled={filterType === "year"}
                                className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            >
                                <option value={2023}>2023</option>
                                <option value={2024}>2024</option>
                                <option value={2025}>2025</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue Over Time</h2>
                        <div className="h-[400px]">
                            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Percentage of Bookings</h2>
                        <div className="h-[400px]">
                            <Pie 
                                data={pieChartData} 
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        tooltip: {
                                            callbacks: {
                                                label: function(tooltipItem) {
                                                    return `${tooltipItem.raw}%`;
                                                }
                                            }
                                        }
                                    }
                                }} 
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Bookings and Revenue by Tour</h2>
                        <div className="h-[400px]">
                            <Bar data={combinedChartData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top 3 Most Popular Tours</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {topTours.slice(0, 3).map((tour, index) => (
                                <div 
                                    key={tour.tourID}
                                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                >
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className={`text-lg font-bold ${
                                            index === 0 ? 'text-yellow-500' : 
                                            index === 1 ? 'text-gray-500' : 
                                            'text-bronze-500'
                                        }`}>
                                            #{index + 1}
                                        </span>
                                        <h3 className="font-semibold">Tour {tour.tourID}</h3>
                                    </div>
                                    <p className="text-gray-600">
                                        <span className="font-medium">{tour.totalBookings}</span> bookings
                                    </p>
                                    <p className="text-green-600 font-medium">
                                        ${tour.totalRevenue} revenue
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default RevenueDashBoard;