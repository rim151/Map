import { useRef} from "react";
import AOISidebar from "./components/AOISidebar";
import Map from "./components/mapp";
import MapLeftIcons from "./components/MapLeftIcons";
import MapView from "./components/MapView";

// ❗ If MapView exists, import it. If not, REMOVE IT.
// import MapView from "./components/MapView";

function App() {
  // ✅ mapRef must be inside App()
  const mapRef = useRef(null);

  return (
    <div className="relative w-full h-screen">

      {/* ⭐ Full screen Map */}
      <Map mapRef={mapRef} />

      {/* ⭐ Sidebar */}
      <div className="absolute top-0 left-0 h-full z-1000">
        <AOISidebar mapRef={mapRef} />
      </div>

      {/* ⭐ Left side icons */}
      <MapLeftIcons />

      {/* ❗ If MapView is needed, uncomment below */}
      {/* <MapView mapRef={mapRef} /> */}
    </div>
  );
}

export default App;
