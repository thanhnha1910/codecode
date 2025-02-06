import { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement
} from "chart.js";
ChartJS.register(ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const RevenueDashboard = ({ year }) => {
    const [chartData, setChartData] = useState({});
    const [pieChartData, setPieChartData] = useState({});
    const [combinedChartData, setCombinedChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState("month"); // month, quarter, year
    const [selectedYear, setSelectedYear] = useState(2023);
    const [isTopRevenue, setIsTopRevenue] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [comparisonData, setComparisonData] = useState([]);

    // Function to fetch real data from API
    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5128/api/PaymentStatistics/GetAllPayments/");
            const data = await response.json();

            // Example of expected structure of response data
            const mockData = data;

            const timeLabels =
                filterType === "month"
                    ? [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                    ]
                    : filterType === "year"
                        ? ["2022", "2023", "2024"]
                        : ["Q1", "Q2", "Q3", "Q4"];

            const revenuesByMonth = mockData.map(() => Math.floor(Math.random() * 2000) + 500);

            setChartData({
                labels: timeLabels,
                datasets: [
                    {
                        label: "Revenue (in USD)",
                        data: revenuesByMonth,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1
                    }
                ]
            });

            const previousRevenues = revenuesByMonth.map((rev, index) =>
                index > 0 ? revenuesByMonth[index - 1] : revenuesByMonth[index]
            );

            const comparison = revenuesByMonth.map((rev, index) => {
                const prev = previousRevenues[index];
                const change = ((rev - prev) / prev) * 100;
                return index > 0 ? change.toFixed(2) : "N/A";
            });

            setComparisonData(
                comparison.slice(1).map((change, index) => ({
                    value: change,
                    isPositive: change >= 0,
                    label: timeLabels[index + 1]
                }))
            );

            const tourLabels = mockData.map((item) => `Tour ${item.tourID}`);
            const bookings = mockData.map((item) => item.TotalBookings);

            setPieChartData({
                labels: tourLabels,
                datasets: [
                    {
                        data: bookings,
                        backgroundColor: [
                            "#FFB6C1",
                            "#FFDAB9",
                            "#FFFACD",
                            "#D3FFCE",
                            "#ADD8E6"
                        ],
                        hoverBackgroundColor: [
                            "#FFB6C1",
                            "#FFDAB9",
                            "#FFFACD",
                            "#D3FFCE",
                            "#ADD8E6"
                        ],
                        label: "% of Bookings",
                        hoverOffset: 4
                    }
                ]
            });

            setCombinedChartData({
                labels: tourLabels,
                datasets: [
                    {
                        label: "Total Bookings",
                        data: bookings,
                        type: "bar",
                        backgroundColor: "rgba(255, 159, 64, 0.6)",
                        borderColor: "rgba(255, 159, 64, 1)",
                        borderWidth: 1
                    },
                    {
                        label: "Revenue (in USD)",
                        data: mockData.map((item) => item.TotalRevenue),
                        type: "line",
                        borderColor: "#4BC0C0",
                        borderWidth: 2,
                        fill: false
                    }
                ]
            });

            const sortedByRevenue = [...mockData].sort((a, b) => b.TotalRevenue - a.TotalRevenue);
            const sortedByLowRevenue = [...mockData].sort((a, b) => a.TotalRevenue - b.TotalRevenue);
            setTableData(isTopRevenue ? sortedByRevenue.slice(0, 3) : sortedByLowRevenue.slice(0, 3));

            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [filterType, selectedYear, isTopRevenue]);

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const handleYearChange = (e) => {
        setSelectedYear(Number(e.target.value));
    };

    const toggleRevenueView = () => {
        setIsTopRevenue((prev) => !prev);
    };

    if (loading) {
        return <p>Loading...</p>;
    } else {
        return (
            <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "1000px", margin: "auto" }}>
                <h1
                    style={{
                        textAlign: "center",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: "20px",
                        textShadow: "2px 2px 4px rgba(255, 182, 193, 0.8)"
                    }}
                >
                    Revenue Report
                </h1>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                    <div>
                        <label style={{ fontWeight: "bold", marginRight: "10px" }}>Year:</label>
                        <select
                            value={selectedYear}
                            onChange={handleYearChange}
                            style={{ padding: "5px", borderRadius: "5px" }}
                        >
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ fontWeight: "bold", marginRight: "10px" }}>Filter by:</label>
                        <select
                            value={filterType}
                            onChange={handleFilterChange}
                            style={{ padding: "5px", borderRadius: "5px" }}
                        >
                            <option value="month">Month</option>
                            <option value="quarter">Quarter</option>
                            <option value="year">Year</option>
                        </select>
                    </div>
                </div>

                {/* Section 1: Bar chart with revenue comparison */}
                <div style={{ marginBottom: "30px" }}>
                    <h2 style={{ textAlign: "center", fontSize: "1.5rem", color: "#444" }}>Revenue Over Time ({filterType})</h2>
                    <Bar data={chartData} />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                        {comparisonData.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    width: "30%",
                                    textAlign: "center",
                                    padding: "10px",
                                    backgroundColor: item.isPositive ? "#d4f8db" : "#f8d4d4",
                                    borderRadius: "5px",
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <h3 style={{ fontSize: "1rem", color: item.isPositive ? "#28a745" : "#dc3545" }}>
                                    {item.isPositive ? "Increase" : "Decrease"}
                                </h3>
                                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                                    {item.value}%<br />
                                    <span style={{ color: "#666" }}>({item.label})</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 2: Pie chart */}
                <div style={{ marginBottom: "30px" }}>
                    <h2 style={{ textAlign: "center", fontSize: "1.5rem", color: "#444" }}>Tour Bookings Distribution</h2>
                    <Pie data={pieChartData} />
                </div>

                {/* Section 3: Combined bar and line chart */}
                <div style={{ marginBottom: "30px" }}>
                    <h2 style={{ textAlign: "center", fontSize: "1.5rem", color: "#444" }}>Bookings and Revenue Per Tour</h2>
                    <Bar data={combinedChartData} />
                </div>

                {/* Section 4: Top 3 revenue tours */}
                <div style={{ marginBottom: "30px" }}>
                    <h2 style={{ textAlign: "center", fontSize: "1.5rem", color: "#444" }}>
                        Top 3 {isTopRevenue ? "Highest Revenue" : "Lowest Revenue"} Tours
                    </h2>
                    <button
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007BFF",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            margin: "10px 0"
                        }}
                        onClick={toggleRevenueView}
                    >
                        {isTopRevenue ? "View Lowest Revenue" : "View Highest Revenue"}
                    </button>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr style={{ backgroundColor: "#f9f9f9" }}>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Tour ID</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Total Revenue (USD)</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Total Bookings</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData.map((tour) => (
                            <tr key={tour.TourID}>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{tour.TourID}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>${tour.TotalRevenue}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{tour.TotalBookings}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

export default RevenueDashboard;
