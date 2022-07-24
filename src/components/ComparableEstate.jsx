function ComparableEstate({ estateData, priceColor, floorColor, landColor }) {
  const {
    name,
    locality,
    prize_czk: price,
    building_area: floorArea,
    land_area: landArea,
    images,
    company_name: companyName,
    company_logo: companyLogo,
  } = estateData;

  return (
    <div className="compared-estate">
      <div
        className="compared-estate__image"
        style={{
          backgroundImage: `url(${images[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      ></div>

      <p className="compared-estate__name">{name}</p>

      <div
        className="compared-estate__description"
        style={{
          backgroundColor: priceColor,
        }}
      >
        <span className="compared-estate__title">Price</span>
        <p className="compared-estate__price">
          {price.toLocaleString("fi-FI")} Kč
        </p>
      </div>

      <div className="compared-estate__description">
        <span className="compared-estate__title">Locality</span>
        <p className="compared-estate__locality">{locality}</p>
      </div>

      <div
        className="compared-estate__description"
        style={{
          backgroundColor: floorColor,
        }}
      >
        <span className="compared-estate__title">Floor area</span>
        <p className="compared-estate__floor-area">
          {floorArea} m<sup>2</sup>
        </p>
      </div>

      <div
        className="compared-estate__description"
        style={{
          backgroundColor: landColor,
        }}
      >
        <span className="compared-estate__title">Land area</span>
        <p className="compared-estate__land-area">
          {landArea} m<sup>2</sup>
        </p>
      </div>
      {companyName && companyLogo ? (
        <div className="compared-estate__company">
          <img className="compared-estate__img" src={companyLogo} alt="" />
          <p className="compared-estate__name">{companyName}</p>
        </div>
      ) : null}
    </div>
  );
}

export default ComparableEstate;
