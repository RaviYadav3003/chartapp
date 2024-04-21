import { Bar } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import { useDataContext } from "../Context/DataContext";
const BarChart = () => {
  const { filtersData, setClickedData , userData  } = useDataContext();
  const barChartClicked = (event, array) => {
    const clickedValue = array[0]?.index;
    const feats = ["A", "B", "C", "D", "E", "F"];
    const featValue = feats[clickedValue];
    const featureClick = filtersData?.map((data) => {
      return data.features[featValue];
    });
    setClickedData(featureClick);
  };
  return (
    <div className="barChart">
      <Bar
        data={userData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          indexAxis: "y",
          onClick: barChartClicked,
        }}
      />
    </div>
  );
};
export default BarChart;
