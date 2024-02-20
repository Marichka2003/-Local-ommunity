import React, { useEffect, useState } from "react";
import Footer from '../Footer/footer';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import './style.css';
import { useTranslation } from 'react-i18next';

const defaultCenter = [49.5083239, 26.7658004];
const markerPositions = [
  [49.5140706, 26.7537180],
  [49.5301522, 26.7881078],
  [49.4752107, 26.7751945],
  [49.4945821, 26.7495268],
  [49.5251564, 26.7201594],
  [49.5423813, 26.6838790],
  [49.5956608, 26.7561735],
  [49.5096248, 26.7413286],
  [49.5786583, 26.7253336],
  [49.5747522, 26.9058268],
  [49.5828274, 26.8735675],
  [49.4657975, 26.7717054],
  [49.4666152, 26.7299632],
  [49.5047035, 26.8406831],
  [49.4749671, 26.8281882],
  [49.4439815, 26.6890001],
  [49.4754986, 26.6942220],
  [49.5695532, 26.8059397],
  [49.5825503, 26.8417555],
  [49.5482966, 26.7482545],
  [49.5051662, 26.7560568]
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
const { t } = useTranslation();
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
          {t('Settlements within the OTG: Chornoostrivska community')} <br/>
          _________________________________________
        </p>
        <div className="square-chornyi">
          {data.map((item, index) => (
            <div key={item.id}>
              {index === 0 && (
                <>
                  <h2>{t(item.name)}</h2>
                  <p>
                    {t('Postal address: 31310, Khmelnytskyi region, Khmelnytskyi district, Chornyi Ostriv village, str. Independence, bldg. 13')} <br />
                    {t('E-mail address:')} chorost@ukr.net <br />
                    {t('Contact numbers:')} 0382-62-22-74<br />
                    {t('COATUU')}: {item.coatuu} <br />
                    {t('CATOTTG')}: UA{item.catottg} <br />
                    {t('Population')}: {item.population} <br />
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
                <h2>{t(item.name)}</h2>
                <p>
                  {t('COATUU')}: {item.coatuu} <br/>
                  {t('CATOTTG')}: UA{item.catottg} <br/>
                  {t('Population')}: {item.population} <br/>
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
