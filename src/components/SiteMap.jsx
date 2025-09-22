import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useTranslation } from "react-i18next";

// Solar and Wind mock data with additional information
export const solarSites = [
  { 
    id: 1, 
    name: "Solar Farm Alpha", 
    lat: 10.93713, 
    lng: 76.95641,
    capacity: "5.2 MW",
    status: "Active",
    efficiency: "87%"
  },
  { 
    id: 2, 
    name: "Solar Array Beta", 
    lat: 10.93730, 
    lng: 76.95655,
    capacity: "3.8 MW",
    status: "Maintenance",
    efficiency: "92%"
  },
  { 
    id: 3, 
    name: "Solar Park Gamma", 
    lat: 10.93700, 
    lng: 76.95670,
    capacity: "6.1 MW",
    status: "offline",
    efficiency: "85%"
  },
];

export const windSites = [
  { 
    id: 1, 
    name: "Wind Turbine A-1", 
    lat: 10.93750, 
    lng: 76.95620,
    capacity: "2.5 MW",
    status: "Active",
    rotorDiameter: "112m"
  },
  { 
    id: 2, 
    name: "Wind Turbine B-2", 
    lat: 10.93760, 
    lng: 76.95635,
    capacity: "2.5 MW",
    status: "Active",
    rotorDiameter: "112m"
  },
  { 
    id: 3, 
    name: "Wind Turbine C-3", 
    lat: 10.93740, 
    lng: 76.95650,
    capacity: "3.0 MW",
    status: "Offline",
    rotorDiameter: "136m"
  },
];

// Custom SVG icons with better wind turbine icon
const solarIcon = new L.Icon({
  iconUrl: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2600.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: "solar-marker",
});


// Alternative wind icon using Font Awesome (uncomment if you prefer)
const windIcon = new L.Icon({
  iconUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjUgMTJWMTVNNi41IDguNUgxMC41TTE3LjUgOC41SDEzLjVNMTAgMTVWMTJNMTAgMTJIMTMuNU0xMCAxMkg2LjVNMTMuNSAxMkgxN00xOCAxNUwxNyAxNE0xOCAxNUwxNyAxNk0xOCAxNUgyMS41TTYgMTVMMyAxMi41TTYgMTVMOSAxMi41TTYgMTVIMi41IiBzdHJva2U9IiMwMDcyQzciIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: "wind-marker",
});

const center = [10.9373, 76.9565];

const SiteMap = () => {
  const { t } = useTranslation();

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-white">
        {t("siteMap.title", "Renewable Energy Site Locations")}
      </h2>

      {/* Legend */}
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          <span className="text-sm text-white">{t("siteMap.solarSites", "Solar Sites")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-white">{t("siteMap.windSites", "Wind Sites")}</span>
        </div>
      </div>


    <MapContainer
      center={center}
      zoom={17}
      maxZoom={22} // You can allow higher zoom for marker precision
      minZoom={10}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
      scrollWheelZoom={true}
      className="shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxNativeZoom={19} // This is the highest zoom OSM tiles support
        maxZoom={22}       // This allows you to zoom in further, but tiles will be upscaled
      />
      
      {/* Solar Sites */}
      {solarSites.map((site) => (
        <Marker key={`solar-${site.id}`} position={[site.lat, site.lng]} icon={solarIcon}>
          <Popup className="custom-popup">
            <div className="p-2">
              <h3 className="font-bold text-yellow-600 text-lg">{site.name}</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="font-semibold">Capacity:</span> {site.capacity}</p>
                <p><span className="font-semibold">Status:</span> 
                  <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                    site.status === "Operational" ? "bg-green-100 text-green-800" : 
                    site.status === "Maintenance" ? "bg-yellow-100 text-yellow-800" : 
                    "bg-red-100 text-red-800"
                  }`}>
                    {site.status}
                  </span>
                </p>
                <p><span className="font-semibold">Efficiency:</span> {site.efficiency}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {/* Wind Sites */}
      {windSites.map((site) => (
        <Marker key={`wind-${site.id}`} position={[site.lat, site.lng]} icon={windIcon}>
          <Popup className="custom-popup">
            <div className="p-2">
              <h3 className="font-bold text-blue-600 text-lg">{site.name}</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p><span className="font-semibold">Capacity:</span> {site.capacity}</p>
                <p><span className="font-semibold">Status:</span> 
                  <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                    site.status === "Operational" ? "bg-green-100 text-green-800" : 
                    site.status === "Maintenance" ? "bg-yellow-100 text-yellow-800" : 
                    "bg-red-100 text-red-800"
                  }`}>
                    {site.status}
                  </span>
                </p>
                <p><span className="font-semibold">Rotor Diameter:</span> {site.rotorDiameter}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>

    <style>{`
      .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .solar-marker {
        filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.3));
      }
      .wind-marker {
        filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.3));
      }
    `}</style>
  </div>
);
};

export default SiteMap;