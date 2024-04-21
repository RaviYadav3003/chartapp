import BarChart from "./BarChart";
import { DateFilter } from "./DateFilter";
import { Filter } from "./Filter";
import LineChart from "./LineChart";
export function ChartComponent() {

  return (
    <div>
      <div className="chartComponent">
        <DateFilter />
        <Filter />
      </div>
      <BarChart />
      <LineChart />
      <div>
      </div>
    </div>
  );
}

export default ChartComponent;
