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
import Maps from "./components/maps/Map";
import Table from "./components/table/Table";
import { sortData } from "./utile";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";
import DarkModeToggle from "./components/DarkModeToggle";
function App() {
  const [countries, setCountries] = useState([]);
  const [tableData, setTableDat] = useState([]);
  const [mapCenter, setMapCenter] = useState([20, 77]);
  const [casesType, setCasesType] = useState("cases");

  const [mapZoom, setMapZoom] = useState(3);
  const [country, setCountry] = useState("worldwide");
  const [countryMap, setCountryMap] = useState([]);

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

      const sorted = sortData(responce.data);
      setTableDat(sorted);
      setCountryMap(responce.data);
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
    setCountryData({
      cases: countryInfoData.data.cases,
      deaths: countryInfoData.data.deaths,
      recovered: countryInfoData.data.recovered,
      todayCases: countryInfoData.data.todayCases,
      todayDeaths: countryInfoData.data.todayDeaths,
      todayRecovered: countryInfoData.data.todayRecovered,
    });
    if (countrycode !== "worldwide") {
      setMapCenter([
        countryInfoData.data.countryInfo.lat,
        countryInfoData.data.countryInfo.long,
      ]);
      setMapZoom(4);
    } else {
      setMapCenter([0, 0]);
      setMapZoom(1);
    }
  };
  return (
    <div className="App">
      <div className="app__left">
        {/* header  
          title + dropdown
      */}

        <div className="app__header">
          <h1 className="app__title">COVID-19 TRACKER</h1>
          {/* dark mode not implited */}
          {/* <DarkModeToggle></DarkModeToggle> */}
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
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Cases"
            cases={countryData.todayCases}
            total={countryData.cases}
          ></InfoBox>
          <InfoBox
            active={casesType === "recovered"}
            isGreen={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={countryData.todayRecovered}
            total={countryData.recovered}
          ></InfoBox>
          <InfoBox
            active={casesType === "deaths"}
            isDeaths={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={countryData.todayDeaths}
            total={countryData.deaths}
          ></InfoBox>
        </div>

        <Maps
          countries={countryMap}
          casesType={casesType}
          zoom={mapZoom}
          center={mapCenter}
        />
      </div>
      <Card className="app__right">
        <CardContent className="app__right--content">
          {/* table   */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}></Table>
          {/* Graphs */}
          <h3 className="appRight__title">worldwide new {casesType}</h3>
          <LineGraph className="lineGraph" caseType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
