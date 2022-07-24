// Component for a single estate card

function Estate({
  name,
  locality,
  image,
  index,
  estates,
  setFirstComparableEstate,
  firstComparableEstate,
  setSecondComparableEstate,
  secondComparableEstate,
  clicks,
  setClicks,
}) {
  return (
    <div
      className="estate"
      // Click on estate from the list sets first/second comparable estate to be displayed and added for comparison below. First click sets A (first) comparable estate, second -> B (second)
      onClick={() => {
        if (clicks === 0) {
          setFirstComparableEstate(estates[index]);
          setClicks(clicks + 1);
        } else if (clicks === 1) {
          setSecondComparableEstate(estates[index]);
          setClicks(0);
        }
      }}
    >
      {/* If estate from the list is clicked (set for comparison), highlight chosen estate by adding additonal blue border and A/B letters inside the card  */}
      {firstComparableEstate === estates[index] ||
      secondComparableEstate === estates[index] ? (
        <div className="estate__border">
          {firstComparableEstate === estates[index] ? (
            <div className="estate__letter">A</div>
          ) : (
            <div className="estate__letter">B</div>
          )}
        </div>
      ) : null}

      <div
        className="estate__image"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      ></div>
      <p className="estate__description">
        {name} {locality}
      </p>
    </div>
  );
}

export default Estate;
