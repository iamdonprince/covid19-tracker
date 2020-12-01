import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./info.css";
function InfoBox({ title, cases, total }) {
  return (
    <>
      {/* info coronavirus cases */}
      <Card className="card" variant="outlined">
        <CardContent>
          <Typography className="card__title" color="textSecondary">
            {title}
          </Typography>
          <h2 className="card__cases">+{cases}</h2>
          <Typography color="textSecondary" className="card__total">
            {total} Total
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
    </>
  );
}

export default InfoBox;
