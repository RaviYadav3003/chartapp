import React from "react";
import { useDataContext } from "../Context/DataContext";
import { Line } from "react-chartjs-2";
import "./lineChart.css"

export function LineChart() {
  const { lineChartData } = useDataContext();

  const uniqueLabels = Array.from(new Set(lineChartData.labels));

  const uniqueLineChartData = {
    ...lineChartData,
    labels: uniqueLabels,
  };

  return (

    <div className="lineChart">
      <Line
        data={uniqueLineChartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>

  );
}

export default LineChart;
