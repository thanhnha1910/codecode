import { useState } from "react";
import RevenueDashboard from "../admin/RevenueDashboard.jsx";

const StatisticsPage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [filterType, setFilterType] = useState("Yearly");

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div>
      <h1>Tour Revenue Statistics</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Year: 
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            style={{ marginLeft: "10px" }}
          />
        </label>

        <label style={{ marginLeft: "20px" }}>
          Filter By: 
          <select value={filterType} onChange={handleFilterTypeChange}>
            <option value="Yearly">Yearly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>
        </label>
      </div>

      <RevenueDashboard year={year} filterType={filterType} />
    </div>
  );
};

export default StatisticsPage;
