// import React from "react";
// import { useDataContext } from "../Context/DataContext";
// import { Line } from "react-chartjs-2";

// export function LineChart() {
//   const { lineChartData } = useDataContext();
//   console.log(lineChartData)
//   return (
//     <div>
//       <div>
//         <Line
//           data={lineChartData}
//           options={{
//             responsive: true,
//             maintainAspectRatio: false,
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default LineChart;

import React from "react";
import { useDataContext } from "../Context/DataContext";
import { Line } from "react-chartjs-2";

export function LineChart() {
  const { lineChartData } = useDataContext();

  // Remove duplicate dates from labels
  const uniqueLabels = Array.from(new Set(lineChartData.labels));

  // Create a new data object with unique labels
  const uniqueLineChartData = {
    ...lineChartData,
    labels: uniqueLabels,
  };

  return (
    <div>
      <div>
        <Line
          data={uniqueLineChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}

export default LineChart;
