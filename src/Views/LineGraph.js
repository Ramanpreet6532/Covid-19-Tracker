import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import numeral from "numeral";

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
                    //Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
}

const buildChartData = (data, casesType) => { // casesType is used to specify that it will pass the case data as default if we don't pass any var (recovered or deaths)
    let chartData = [];
    let lastDatapoint;

    // data.cases.forEach(data => {  //error - forEach is not a function
    for (let date in data.cases) {
        if (lastDatapoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDatapoint, //to get the new number of cases for 2 dates by subtracting total cases of both days
            };
            chartData.push(newDataPoint);
        }
        lastDatapoint = data[casesType][date];
    }
    return chartData;
}

function LineGraph({ casesType, ...props }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data, "data");
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);
                    console.log("chartData", chartData)
                });
        };

        fetchData();
    }, [casesType]);


    return (
        <div className={props.className}>
            { data?.length > 0 && (
                <Line

                    data={{
                        datasets: [
                            {
                                backgroundColor: (casesType === 'recovered' ? "#7dd71d80" : "rgba(204, 16, 52, 0.5)"),
                                borderColor: (casesType === 'recovered' ? "#7dd71d" : "#CC1133"),
                                data: data,
                            },
                        ],
                    }}
                    options={options}

                />
            )}

        </div>
    )
}

export default LineGraph
