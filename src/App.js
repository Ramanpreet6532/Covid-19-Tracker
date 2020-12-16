import React, { useState, useEffect } from "react";
import './App.css';
import { formControl, Select, MenuItem, Card, CardContent } from "@material-ui/core"
import InfoBox from "./Views/InfoBox";
import Map from "./Views/Map";
import Table from "./Views/Table";
import { sortData, statPrint } from "./util";
import LineGraph from "./Views/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide"); //state is uesd to keep track of which option we actually selected
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(4);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {

          const countries = data.map((country) => ({
            name: country.country, //united state, united kingdom
            value: country.countryInfo.iso2 // US, Uk
          }));

          let sortedData = sortData(data);

          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
          console.log(mapCountries, "MAP_COUNTRIES")
        });
    };

    getCountries(); //asynchronous Api calls work like this in useEffect
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    // console.log("countryCode", countryCode);

    // we are going to call api for getting info of selected country from dropdown so for this since we have one option worldwide so calling these 2 api below

    const url = countryCode === "worldwide" ? `https://disease.sh/v3/covid-19/all` : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setCountry(countryCode)

        // All of data from country response
        setCountryInfo(data);

        countryCode === 'worldwide' ? setMapCenter([34.80746, -40.4796]) : setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4);
      });
  };

  console.log("setCountryInfo", countryInfo);

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid-19 Tracker</h1>
          <formControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}>

              <MenuItem value="worldwide">Worldwide</MenuItem>

              {/* loop through all countries and show list in dropdown */}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}


            </Select>
          </formControl>
        </div>

        <div className="app_stats">

          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType('cases')}
            title="Coronavirus Cases"
            total={statPrint(countryInfo.cases)}
            cases={statPrint(countryInfo.todayCases)}
          />

          <InfoBox

            active={casesType === "recovered"}
            onClick={(e) => setCasesType('recovered')}
            title="Recovered"
            total={statPrint(countryInfo.recovered)}
            cases={statPrint(countryInfo.todayRecovered)}
          />

          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType('deaths')}
            title="Deaths"
            total={statPrint(countryInfo.deaths)}
            cases={statPrint(countryInfo.todayDeaths)}
          />

        </div>

        <Map
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />

      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by country</h3>
          <Table countries={tableData} />
          <h3 className="graph_title">Worldwide new {casesType}</h3>

          <LineGraph className="app_graph" casesType={casesType} />
        </CardContent>
      </Card>
      {/* header */}
      {/* Title + select input dropdown field */}

      {/* infoboxes */}
      {/* infoboxes */}
      {/* infoboxes */}

      {/* table */}
      {/* graph */}

      {/* map */}

    </div>
  );
}

export default App;
