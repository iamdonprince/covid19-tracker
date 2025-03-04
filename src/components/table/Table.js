import React from "react";
import "./Table.css";
import numeral from "numeral";
function Table({ countries }) {
  return (
    <div className="table">
      <table>
        <tbody>
          {countries.map((country, i) => (
            <tr key={i}>
              <td>{country.country}</td>
              <td>{numeral(country.cases).format("0,0")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
