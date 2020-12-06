import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Axios from "../axios";
import numeral from "numeral";

// https://disease.sh/v3/covid-19/historical/all?lastdays=all

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgba(204, 16, 52,0.8)",
    half_op: "#af0827",
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgba(125, 215, 29,0.8)",
    half_op: "#6ec215",
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgba(251, 68, 67,0.8)",
    half_op: "#fa3030",
  },
};

const buildChartData = (data, caseType = "cases") => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[caseType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[caseType][date];
  }
  return chartData;
};

function LineGraph({ caseType, className }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("v3/covid-19/historical/all?lastdays=100").then((res) => {
      let chartData = buildChartData(res.data, caseType);
      setData(chartData);
    });
  }, [caseType]);

  return (
    <div className={className}>
      {data && (
        <Line
          data={{
            datasets: [
              {
                label: "My First dataset",
                backgroundColor: casesTypeColors[caseType].rgb,
                borderColor: casesTypeColors[caseType].half_op,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
