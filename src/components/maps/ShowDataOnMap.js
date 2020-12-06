import React, { useState } from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
function ShowDataOnMap({ data, casesType }) {
  const [casesTypeColors, setColor] = useState({
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",

      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",

      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",

      multiplier: 2000,
    },
  });

  //   useEffect(() => {
  //     if (casesType === "recovered") {
  //       setColors("#7dd71d");
  //       //   map.setStyle({ color: "#7dd71d", fillColor: "#7dd71d" });
  //     }
  //   }, [casesType]);

  if (casesType) {
    return data.map((country, i) => (
      <Circle
        key={i}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        fillOpacity={0.4}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            ></div>
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    ));
  }
}

export default ShowDataOnMap;
