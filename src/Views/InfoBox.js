import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, isRed, active, total, ...props }) {
    console.log(isRed)
    // className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}
    return (

        <Card onClick={props.onClick} className={(active ? isRed ? "infoBox--red infoBox" : "infoBox infoBox--selected" : "infoBox")}>
            < CardContent >
                <Typography className="infoBox_title" color="textSecondary">{title}</Typography>
                <h2 className={!isRed ? "infoBox_cases infoBox_cases--green " : "infoBox_cases"}>{cases}</h2>
                <Typography className="infoBox_total" color="textSecondary">{total} Total</Typography>
            </CardContent >
        </Card >

    )
}

export default InfoBox
