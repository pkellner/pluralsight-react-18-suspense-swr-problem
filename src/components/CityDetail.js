import TemperatureDisplay, {
  TemperatureDisplayFallback,
} from "./TemperatureDisplay";
import DataStatsDisplay, { DataStatsDisplayFallback } from "./DataStatsDisplay";
import LastHoursDataDisplay from "./LastHoursDataDisplay";
import { HISTORYHOURSTOSHOW } from "../utils/constants";
import { CityContext } from "../contexts/CityContext";
import { useContext } from "react";

export const CityDetailFallback = () => {
  return (
    <div className="bg-white right-column mt-1 mb-5">
      <ul className="list-right-side">
        <li>
          <h3 className="mb-1"> City: ...</h3>
        </li>
        <br />

        <li className="list-group-item mt-1 mb-1 border-info  blue-border-rounded">
          <TemperatureDisplayFallback />
        </li>
        <br />

        <li className="list-group-item mt-1 mb-1 border-info  blue-border-rounded">
          <DataStatsDisplayFallback />
        </li>
        <br />

        <li className="list-group-item mt-1 mb-1 border-info  blue-border-rounded">
          <LastHoursDataDisplay
            recordsToSkip={0}
            recordsToReturn={HISTORYHOURSTOSHOW}
            incrementHours={1}
          />
        </li>
        <br />
      </ul>
    </div>
  );
};

function ProcessDataAndRender() {
  const { selectedCityName, hoursAgo, selectedCityId } =
    useContext(CityContext);

  // IF THE BELOW 3 LINES ARE COMMENTED OUT, THE DISPLAY SHOW MULTIPLE LastHoursDataDisplay components and not the proper fallback.
  if (!selectedCityId) {
    return <CityDetailFallback />;
  }

  return (
    <div className="bg-white right-column mt-1 mb-5">
      <ul className="list-right-side">
        <li>
          <h3 className="mb-1"> City: {selectedCityName}</h3>
        </li>
        <br />

        <li className="list-group-item mt-1 mb-1 border-info  blue-border-rounded">
          <TemperatureDisplay />
        </li>
        <br />

        <li className="list-group-item mt-1 mb-1 border-info  blue-border-rounded">
          <DataStatsDisplay />
        </li>
        <br />

        <li className="list-group-item mt-1 mb-1 border-info  blue-border-rounded">
          <LastHoursDataDisplay selectedCityId={selectedCityId} />
        </li>
        <br />
      </ul>
    </div>
  );
}

export default function CityDetail() {
  return <ProcessDataAndRender />;
}
