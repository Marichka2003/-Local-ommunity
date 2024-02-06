import React, { useEffect, useState } from "react";
import Footer from '../Footer/footer';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import './style.css';

const defaultCenter = [49.5083239, 26.7658004];
const markerPositions = [
  [49.5083239, 26.7658004],
  [49.5140706, 26.7537180],
  [49.5301522, 26.7881078],
  [49.4752107, 26.7751945]
];
const customRedIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:44369/api/Map');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <div className="content-container-map">
        <p className="main-text-map">
          Settlements within the OTG: Chornoostrivska community <br/>
          _________________________________________
        </p>
        <div className="square-chornyi">
          {data.map((item, index) => (
            <div key={item.id}>
              {index === 0 && (
                <>
                  <h2>{item.name}</h2>
                  <p>
                    Postal address: 31310, Khmelnytskyi region, Khmelnytskyi district, Chornyi Ostriv village, str. Independence, bldg. 13 <br />
                    E-mail address: chorost@ukr.net <br />
                    Contact numbers: 0382-62-22-74 <br />
                    COATUU: {item.coatuu} <br />
                    CATOTTG: {item.catottg} <br />
                    Population: {item.population} <br />
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="square-white-map-container">
          {data.map((item, index) => (
            index !== 0 && (
              <div key={item.id} className="square-white-map">
                <h2>{item.name}</h2>
                <p>
                  COATUU: {item.coatuu} <br/>
                  CATOTTG: {item.catottg} <br/>
                  Population: {item.population} <br/>
                </p>
              </div>
            )
          ))}
        </div>
      <div className="space"></div>
      <MapContainer center={defaultCenter} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {markerPositions.map((position, index) => (
        <Marker key={index} position={position} icon={customRedIcon}>
          <Popup>Marker {index + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
    <div className="space"></div>
        <Footer />
      </div>
    </div>
  );
};

export default Map;
