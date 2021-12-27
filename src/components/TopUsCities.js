import CityListAndDetail from "./CityListAndDetail";
import Legend from "./Legend";
import { TitleAndCityDropDown } from "./TitleAndCityDropDown";

function TopUsCities() {
  return (
    <>
      <TitleAndCityDropDown />
      <div className="container-fluid grid">
        <div className="row">
          <CityListAndDetail />
          <div className="col-sm-12 col-lg-5 col-md-6">
            <Legend />
          </div>
        </div>
      </div>
    </>
  );
}

export default TopUsCities;
