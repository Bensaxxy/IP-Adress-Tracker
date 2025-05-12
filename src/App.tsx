import { useState, useEffect } from "react";
import type { LatLngExpression } from "leaflet";
import axios from "axios";
import Header from "./components/Header";
import InfoCard from "./components/InfoCard";
import SearchBar from "./components/SearchBar";
import Mapview from "./components/Mapview";
import "leaflet/dist/leaflet.css";
import mobileBackground from "/images/pattern-bg-mobile.png";
import desktopBackground from "/images/pattern-bg-desktop.png";

interface IpData {
  ip: string;
  location: {
    lat: number;
    lng: number;
    city: string;
    region: string;
    postalCode: string;
    timezone: string;
  };
  isp: string;
}

// Fallback position
const DEFAULT_POSITION: LatLngExpression = [51.505, -0.09];

const App = () => {
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userPosition, setUserPosition] = useState<LatLngExpression | null>(
    null
  );

  // Determine background image based on screen width
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Get user's current geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (err) => {
          console.warn("Geolocation error:", err);
          setUserPosition(DEFAULT_POSITION);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser");
      setUserPosition(DEFAULT_POSITION);
    }
  }, []);

  const fetchIPData = async (ipOrDomain = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country,city`,
        {
          params: {
            apiKey: import.meta.env.VITE_IPIFY_API_KEY,
            ipAddress: ipOrDomain,
          },
        }
      );
      const data = response.data;

      if (!data?.location?.lat || !data?.location?.lng) {
        throw new Error("Invalid location data");
      }

      setIpData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim()) fetchIPData(query);
  };

  useEffect(() => {
    fetchIPData("");
  }, []);

  const position: LatLngExpression =
    ipData?.location?.lat && ipData?.location?.lng
      ? [ipData.location.lat, ipData.location.lng]
      : userPosition || DEFAULT_POSITION;

  return (
    <div className="relative" style={{ fontFamily: "var(--font-display)" }}>
      <div
        className="bg-cover bg-no-repeat text-center pt-6 pb-30 flex flex-col items-center gap-4 px-2"
        style={{
          backgroundImage: `url(${
            isDesktop ? desktopBackground : mobileBackground
          })`,
        }}
      >
        <Header />
        <SearchBar onSearch={handleSearch} />
        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="absolute top-70 md:top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-5xl px-4">
          {ipData && <InfoCard data={ipData} />}
        </div>
      </div>

      <div className="relative z-10">
        <Mapview position={position} />
      </div>
    </div>
  );
};

export default App;
