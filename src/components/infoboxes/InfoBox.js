import { Card, CardContent, Typography } from "@material-ui/core";
import numeral from "numeral";
import React from "react";
import "./info.css";

import { numFormated } from "../../utile";

function InfoBox({ title, cases, total, isDeaths, isGreen, onClick, active }) {
  return (
    <div
      className={`info__box ${active && "infoBox--selected"} ${
        isGreen && "recovered"
      } ${isDeaths && "deaths"}`}
    >
      {/* info coronavirus cases */}
      <Card className="card" variant="outlined" onClick={onClick}>
        <CardContent>
          <Typography className="infoBox__title" color="textSecondary">
            {title}
          </Typography>
          <h2
            className={`infoBox__cases  ${
              title === "Recovered" ? "infoBox--green" : ""
            }`}
          >
            {numFormated(cases)}
          </h2>
          <Typography color="textSecondary" className="infoBox__total">
            {numeral(total).format("0,0")} Total
          </Typography>
        </CardContent>
      </Card>
      {/* <div className="infoBoxs__cases">
        <h4>coronavirus cases</h4>
        <h5>+2000</h5>
        <h5>1.5m total</h5>
      </div>
      {/* info recoverd */}
      {/* <div className="infoBoxs__recovered">
        <h4>recoverd</h4>
        <h5>+2000</h5>
        <h5>1.5m total</h5>
      </div> */}
      {/* info deadth */}
      {/* <div className="infoBoxs__deaths">
        <h4>deaths</h4>
        <h5>+2000</h5>
        <h5>1.5m total</h5>
      </div>{" "} */}
    </div>
  );
}

export default InfoBox;
