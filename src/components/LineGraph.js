import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Axios from "../axios";
// https://disease.sh/v3/covid-19/historical/all?lastdays=all
function LineGraph() {
  const [data, setData] = useState([]);

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    Axios.get("v3/covid-19/historical/all?lastdays=all").then((res) => {
      console.log(res.data.cases);

      setData(tableData(res.data.cases));
    });
  }, []);

  const tableData = (data, sortType = "cases") => {
    if (data) {
      for (let x of data) {
        return [
          {
            x: x,
            y: data[x],
          },
        ];
      }
    }
  };
  console.log(data);
  return (
    <div>
      <h1>I am graph</h1>
      {data && <Line data={data} options={options} />}
    </div>
  );
}

export default LineGraph;
