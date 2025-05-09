import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { type LatLngExpression } from "leaflet";

// Fix for default marker icons in Leaflet
const DefaultIcon = L.icon({
  iconUrl: "/images/icon-location.svg",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Component to handle map view changes
const ChangeView = ({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

interface MapviewProps {
  position?: LatLngExpression;
  zoom?: number;
}

const Mapview = ({ position = [51.505, -0.09], zoom = 13 }: MapviewProps) => {
  // Set default icon
  useEffect(() => {
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  return (
    <div className="h-[calc(100vh-280px)] relative z-10">
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <ChangeView center={position} zoom={zoom} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Mapview;
