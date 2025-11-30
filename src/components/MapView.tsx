// MapView.tsx
import { type RefObject } from "react";

const MapView = ({ mapRef }: { mapRef: RefObject<any> }) => {
  const zoomIn = () => {
    if (mapRef.current) mapRef.current.setZoom(mapRef.current.getZoom() + 1);
  };

  const zoomOut = () => {
    if (mapRef.current) mapRef.current.setZoom(mapRef.current.getZoom() - 1);
  };

  return (
    <div className="absolute bottom-4 right-4 z-999 bg-white p-3 shadow rounded">
      <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={zoomIn}>
        Zoom In
      </button>
      <button className="bg-gray-600 text-white px-3 py-1 rounded" onClick={zoomOut}>
        Zoom Out
      </button>
    </div>
  );
};

export default MapView;
