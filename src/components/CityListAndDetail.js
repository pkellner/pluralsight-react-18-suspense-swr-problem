import CityListItems, { CityListItemsFallback } from "./CityListItems";
import CityDetail, { CityDetailFallback } from "./CityDetail";
import { Suspense } from "react";

export function CityListAndDetailFallback() {
  return (
    <>
      <div className="col-sm-12 col-lg-3 col-md-6">
        <CityListItemsFallback />
      </div>
      <div className="col-sm-12 col-lg-4 col-md-6">
        <CityDetailFallback />
      </div>
    </>
  );
}

function CityListAndDetail() {
  return (
    <>
      <div className="col-sm-12 col-lg-3 col-md-6">
        <Suspense fallback={<CityListAndDetailFallback />}>
          <CityListItems />
        </Suspense>
      </div>
      <div className="col-sm-12 col-lg-4 col-md-6">
        <Suspense fallback={<CityDetailFallback />}>
          <CityDetail />
        </Suspense>
      </div>
    </>
  );
}

export default CityListAndDetail;
