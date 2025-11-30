import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";



const Map = () => {
  const [isBaseView, setIsBaseView] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const streetRef = useRef<any>(null);
  const satelliteRef = useRef<any>(null);

  useEffect(() => {
    // ⛔ Prevent multiple map initializations
    if (mapRef.current) return;

    // ⭐ Initialize Map only ONCE
    const map = L.map("map", {
      center: [20.5937, 78.9629],
      zoom: 6,
      zoomControl: false,
    });

    mapRef.current = map;

    // ⭐ Add zoom controls
    L.control.zoom({ position: "topright" }).addTo(map);

    // ⭐ Street Layer
    const streetLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { attribution: "© OpenStreetMap" }
    );
    streetRef.current = streetLayer;

    // ⭐ Satellite Layer
    const satelliteLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "Tiles © Esri" }
    );
    satelliteRef.current = satelliteLayer;

    // Add default street layer
    streetLayer.addTo(map);

    // ⭐ WMS Layer
    L.tileLayer.wms("https://ahocevar.com/geoserver/wms", {
      layers: "topp:states",
      transparent: true,
      format: "image/png",
    }).addTo(map);

    // ⭐ Draw Layer
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      position: "bottomright",
      draw: {
        polygon: {},
        rectangle: {},
        polyline: {},
        marker: {},
        circle: false,
        circlemarker: false,
      },
      edit: { featureGroup: drawnItems },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (event: any) => {
      drawnItems.addLayer(event.layer);
    });
  }, []);

  // ⭐ Toggle map layers smoothly
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const street = streetRef.current;
    const satellite = satelliteRef.current;

    if (isBaseView) {
      // switch to satellite
      map.removeLayer(street);
      map.addLayer(satellite);
    } else {
      // switch to street
      map.removeLayer(satellite);
      map.addLayer(street);
    }
  }, [isBaseView]);

  return (
    <div className="relative w-full h-full">
      {/* Toggle Button */}
      <button
        onClick={() => setIsBaseView(!isBaseView)}
        className="absolute bottom-6 left-300 z-9999 bg-black opacity-60 px-4 py-2 text-white rounded"
      >
        {isBaseView ? "Map View" : "Base View"}
      </button>

      {/* Map container */}
      <div id="map" className="w-full h-full" />
    </div>
  );
};

export default Map;
