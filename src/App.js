import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import Axios from "./axios";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./components/infoboxes/InfoBox";
import Map from "./components/maps/Map";
import Table from "./components/table/Table";
import { sortData } from "./utile";
import LineGraph from "./components/LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [tableData, setTableDat] = useState([]);

  const [country, setCountry] = useState("worldwide");
  const [countryData, setCountryData] = useState({
    cases: null,
    deaths: null,
    recovered: null,
    todayCases: null,
    todayDeaths: null,
    todayRecovered: null,
  });

  useEffect(() => {
    Axios.get("/v3/covid-19/all").then((res) => {
      setCountryData({
        cases: res.data.cases,
        deaths: res.data.deaths,
        recovered: res.data.recovered,
        todayCases: res.data.todayCases,
        todayDeaths: res.data.todayDeaths,
        todayRecovered: res.data.todayRecovered,
      });
    });
  }, []);
  useEffect(() => {
    const getCountriesData = async () => {
      const responce = await Axios.get("/v3/covid-19/countries");
      const allConuntries = responce.data.map((country) => {
        return {
          name: country.country,
          value: country.countryInfo.iso2,
          id: country.countryInfo._id,
        };
      });
      console.log(responce);
      const sorted = sortData(responce.data);
      setTableDat(sorted);
      setCountries(allConuntries);
      return responce;
    };

    getCountriesData();
  }, []);

  const changeHandler = async (e) => {
    let countrycode = e.target.value;
    setCountry(countrycode);
    const url =
      countrycode === "worldwide"
        ? "/v3/covid-19/all"
        : `/v3/covid-19/countries/${countrycode}`;

    const countryInfoData = await Axios.get(url);
    console.log(countryInfoData);
    setCountryData({
      cases: countryInfoData.data.cases,
      deaths: countryInfoData.data.deaths,
      recovered: countryInfoData.data.recovered,
      todayCases: countryInfoData.data.todayCases,
      todayDeaths: countryInfoData.data.todayDeaths,
      todayRecovered: countryInfoData.data.todayRecovered,
    });
  };
  return (
    <div className="App">
      <div className="app__left">
        {/* header  
          title + dropdown
      */}

        <div className="app__header">
          <h1 className="app__title">COVID-19 TRACKER</h1>
          <FormControl className="app__drowpdown">
            <Select
              className="dropdown__select"
              variant="outlined"
              value={country}
              onChange={changeHandler}
            >
              <MenuItem value="worldwide">worldwide</MenuItem>;
              {countries.map((country) => {
                return (
                  <MenuItem key={country.id} value={country.value}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        {/* 
           info box
      */}

        <div className="app__infoBoxs">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryData.todayCases}
            total={countryData.cases}
          ></InfoBox>
          <InfoBox
            title="Recovered"
            cases={countryData.todayRecovered}
            total={countryData.recovered}
          ></InfoBox>
          <InfoBox
            title="Deaths"
            cases={countryData.todayDeaths}
            total={countryData.deaths}
          ></InfoBox>
        </div>

        <Map></Map>
      </div>
      <Card className="app__right">
        <CardContent>
          {/* table   */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}></Table>
          {/* Graphs */}
          <h3>worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
