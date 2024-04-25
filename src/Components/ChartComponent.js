import BarChart from "./BarChart";
import { DateFilter } from "./DateFilter";
import { Filter } from "./Filter";
import LineChart from "./LineChart";
import "./chartComponent.css"
export function ChartComponent() {

  return (
    <div className="chartComponent">
      <div className="chartFilter">
        <DateFilter />
        <Filter />
      </div>
      <div className="chartsContainer">
        <BarChart />
        <LineChart />
      </div>
    </div>
  );
}

export default ChartComponent;
