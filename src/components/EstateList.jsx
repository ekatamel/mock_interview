import { useState, useEffect } from "react";
import Estate from "./Estate";
import ComparableEstate from "./ComparableEstate";

// Component representating the whole list of available estates

function EstateList() {
  const [estates, setEstates] = useState(null);
  const [firstComparableEstate, setFirstComparableEstate] = useState(null);
  const [secondComparableEstate, setSecondComparableEstate] = useState(null);

  // State used to react on user clicking estates from the list. First click always sets first comparable estate to by displayed, second - the second one,  then clicks are reset (see Estate.jsx component)
  const [clicks, setClicks] = useState(0);

  // States used to set "winning" estate based on price, floor and land area criteria
  const [cheaperEstate, setCheaperEstate] = useState(null);
  const [biggerFloorEstate, setBiggerFloorEstate] = useState(null);
  const [biggerLandEstate, setBiggerLandEstate] = useState(null);

  // Fetching the data from API endpoint
  useEffect(() => {
    loadEstates();
  }, []);

  const loadEstates = async () => {
    const response = await fetch(
      "https://estate-comparison.codeboot.cz/list.php"
    );
    const responseData = await response.json();

    // Include and display only the first 10 estates
    const estateArray = [];
    responseData.forEach((e, i) => {
      if (i < 10) {
        estateArray.push(e);
      }
    });

    setEstates(estateArray);
    // On page load, select by default estate #5 and #7 for comparison
    setFirstComparableEstate(estateArray[4]);
    setSecondComparableEstate(estateArray[6]);
  };

  // Dynamically compare selected (clicked) estates based on price, floor area and land area and set "winning" estate to the React state. If estate selected for comparison changes, run effect again and rerender components
  useEffect(() => {
    if (firstComparableEstate && secondComparableEstate) {
      if (firstComparableEstate.prize_czk > secondComparableEstate.prize_czk) {
        setCheaperEstate(secondComparableEstate);
      } else {
        setCheaperEstate(firstComparableEstate);
      }

      if (
        parseInt(firstComparableEstate.building_area) >
        parseInt(secondComparableEstate.building_area)
      ) {
        setBiggerFloorEstate(firstComparableEstate);
      } else {
        setBiggerFloorEstate(secondComparableEstate);
      }

      if (
        parseInt(firstComparableEstate.land_area) >
        parseInt(secondComparableEstate.land_area)
      ) {
        setBiggerLandEstate(firstComparableEstate);
      } else {
        setBiggerLandEstate(secondComparableEstate);
      }
    }
  }, [firstComparableEstate, secondComparableEstate]);

  return (
    <>
      <div className="estates">
        {/* Rendering all available estates using Estate component */}
        {estates &&
          estates.map((estate, index) => {
            return (
              <Estate
                key={index}
                estates={estates}
                index={index}
                name={estate.name_extracted}
                locality={estate.locality}
                image={estate.images[0]}
                setFirstComparableEstate={setFirstComparableEstate}
                firstComparableEstate={firstComparableEstate}
                setSecondComparableEstate={setSecondComparableEstate}
                secondComparableEstate={secondComparableEstate}
                setClicks={setClicks}
                clicks={clicks}
              />
            );
          })}
      </div>
      <div className="compared-estate__container">
        {/* Rendering 2 estates chosen comparison. Colors for price, floor and land area comparison are passed to component via props as a result of comparison */}
        {estates && (
          <>
            <ComparableEstate
              estateData={firstComparableEstate}
              // cheaperEstate={cheaperEstate}
              priceColor={
                cheaperEstate === firstComparableEstate ? "#7EDA7F" : "#F09191"
              }
              floorColor={
                biggerFloorEstate === firstComparableEstate
                  ? "#7EDA7F"
                  : "#F09191"
              }
              landColor={
                biggerLandEstate === firstComparableEstate
                  ? "#7EDA7F"
                  : "#F09191"
              }
            />
            <ComparableEstate
              estateData={secondComparableEstate}
              priceColor={
                cheaperEstate === firstComparableEstate ? "#F09191" : "#7EDA7F"
              }
              floorColor={
                biggerFloorEstate === firstComparableEstate
                  ? "#F09191"
                  : "#7EDA7F"
              }
              landColor={
                biggerLandEstate === firstComparableEstate
                  ? "#F09191"
                  : "#7EDA7F"
              }
            />
          </>
        )}
      </div>
    </>
  );
}

export default EstateList;
