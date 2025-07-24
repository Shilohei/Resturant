import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const restaurants = [
  { id: 1, name: 'The Gorkha Kitchen', lat: 27.7172, lng: 85.3240, rating: 4.5 },
  { id: 2, name: 'Himalayan Java', lat: 27.7182, lng: 85.3250, rating: 4.8 },
  { id: 3, name: 'Newari Bites', lat: 27.7162, lng: 85.3230, rating: 4.2 },
];

const UserLocationMarker = ({ setUserPosition }: { setUserPosition: (pos: [number, number]) => void }) => {
  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      setUserPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map, setUserPosition]);

  return null;
};

const InteractiveMap = () => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  return (
    <MapContainer center={[27.7172, 85.3240]} zoom={15} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <UserLocationMarker setUserPosition={setUserPosition} />
      {restaurants.map(r => (
        <Marker key={r.id} position={[r.lat, r.lng]}>
          <Popup>
            <b>{r.name}</b><br />
            Rating: {r.rating} / 5<br />
            {userPosition && 
              `Distance: ${calculateDistance(userPosition[0], userPosition[1], r.lat, r.lng).toFixed(2)} km`
            }
          </Popup>
        </Marker>
      ))}
      {userPosition && (
        <Marker position={userPosition} icon={new L.Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] })}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default InteractiveMap;
