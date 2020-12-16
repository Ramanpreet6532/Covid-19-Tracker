import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
        hex: "#aa4443",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 1200,
    },
    deaths: {
        hex: "#ff0000",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 2000,
    },
}

export const sortData = (data) => {
    // copy data to an array
    let sortedData = [...data];

    // sort function takes 1st two values out of entire list compare and sort them then the next two and so on
    // sortedData.sort((a, b) => {
    //     if (a.cases > b.cases)
    //         return -1; // -1 is like returning false
    //     else
    //         return 1; //return true
    // });
    // return sortedData;

    //Shorter syntax
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
}

export const statPrint = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "+0";


// show circles on map with interactive tootip
export const showDataOnMap = (data, casesType = 'cases') =>
    data.map((country) => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-container">
                    <div
                        className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}>

                    </div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
