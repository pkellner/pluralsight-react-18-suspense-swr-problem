import { CityContext } from "../contexts/CityContext";
import {
  Suspense,
  useContext,
  useState,
  useTransition,
  useEffect,
} from "react";
import useSwr from "swr";
import { CityLinkButton, CityLinkButtonFallback } from "./CityLinkButton";

export const CityListItemsFallback = () => {
  const dummyArray = [1, 2, 3, 4, 5];
  // [new Array(DEFAULTCITYCOUNT)]
  return (
    <div>
      {dummyArray.map(function (rec, index) {
        return (
          <ul key={index} className="list-group">
            <li className="list-group-item list-group-item-city-list-height mt-1 mb-1 bg-light">
              <CityLinkButtonFallback />
            </li>
          </ul>
        );
      })}
    </div>
  );
};

function ProcessDataAndRender() {
  const {
    setSelectedCityId,
    setSelectedCityName,
    setSelectedStateName,
    selectedCityId,
    cityMax,
    setHoursAgo,
  } = useContext(CityContext);

  const [tempId, setTempId] = useState();
  const [isPending, startTransition] = useTransition();

  const { data, error } = useSwr(`/api/data/cities?count=${cityMax}`, {
    suspense: true,
  });

  useEffect(() => {
    if (data && data?.length > 0) {
      setTempId(data[0].id);
      startTransition(() => {
        setSelectedCityId(data[0].id);
        setSelectedCityName(data[0].city);
        setSelectedStateName(data[0].state);
      });
    }
  }, [data, setSelectedCityId, setSelectedCityName, setSelectedStateName]);

  return (
    <div>
      {data
        ?.sort((a, b) => {
          if (a.pm25 > b.pm25) return -1;
          if (a.pm25 < b.pm25) return 1;
          return 0;
        })
        .map(function (rec, i) {
          return (
            <ul key={rec.id} className="list-group">
              <li
                className={
                  // highlight the first element by default
                  // change after user interaction
                  (!selectedCityId && i === 0) || rec.id === selectedCityId
                    ? "list-group-item list-group-item-city-list-height mt-1 mb-1 border-dark"
                    : "list-group-item list-group-item-city-list-height mt-1 mb-1 bg-light"
                }
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setTempId(rec.id);
                    startTransition(() => {
                      setSelectedCityId(rec.id);
                      setSelectedCityName(rec.city);
                      setSelectedStateName(rec.state);
                      setHoursAgo(0);
                    });
                  }}
                >
                  <CityLinkButton
                    cityRec={rec}
                    isPending={
                      rec.id === tempId && isPending === true ? true : false
                    }
                  />
                </a>
              </li>
            </ul>
          );
        })}
    </div>
  );
}

function CityListItems() {
  return (
    <Suspense fallback={<CityListItemsFallback />}>
      <ProcessDataAndRender />
    </Suspense>
  );
}

export default CityListItems;

// const CityListItemsFallback1 = () => {
//   return <div>lll</div>;
// };

// const ProcessDataAndRender1 = () => {
//   const fetcherDelay = () =>
//     new Promise((resolve) => {
//       setTimeout(() => resolve("test"), 5000);
//     });
//   const { data } = useSwr("/api/suspense", fetcherDelay);
//
//   return <div>lll: {data}</div>;
// };

// https://github.com/reactwg/react-18/discussions/41#discussioncomment-841339
//const [isPending, startTransition] = useTransition();
//const [tempId, setTempId] = useState();
