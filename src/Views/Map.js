import React from 'react';
import './Map.css'
import { Map, TileLayer, useMap } from "react-leaflet";
import './Map.css';
import { showDataOnMap } from '../util'

// function ChangeMap({ center, zoom }) {
//     const map = useMap();
//     map.setView(center, zoom);
//     return null;
// }

function Maps({ countries, center, zoom, casesType }) {
    return (
        <div className="map">
            <Map center={center} zoom={zoom}>
                {/* <ChangeMap center={center} zoom={zoom} /> */}
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* loop through countries and draw circles on screen */}
                {showDataOnMap(countries, casesType)}
            </Map>
        </div>
    );
}

export default Maps
