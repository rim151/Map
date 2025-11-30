import { useState, useRef, type FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faMagnifyingGlass,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const dropdownItems: string[] = [
  "Uttar Pradesh",
  "Mumbai",
  "Assam",
  "Delhi",
  "Karnataka",
  "West bengal",
  "Punjab"
];
const locations: Record<string, [number, number]> = {
  "Uttar Pradesh": [26.8467, 80.9462],
  "Mumbai": [19.0760, 72.8777],
  "Assam": [26.2006, 92.9376],
  "Delhi": [28.7041, 77.1025],
  "Karnataka": [15.3173, 75.7139],
  "West Bengal": [22.9868, 87.8550],
  "Punjab": [31.1471, 75.3412]
};

const AOISidebar: FC = () => {
  const [step, setStep] = useState<number>(1);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const mapRef = useRef<any>(null);


  return (
    <div className="absolute left-18 top-0 h-full w-60 bg-white shadow-xl z-9999 p-6 flex flex-col gap-5 overflow-auto">

      {/* STEP 2 HEADER BACK BUTTON */}
      {step === 2 && (
        <button
          onClick={() => setStep(1)}
          className="text-gray-700 text-lg flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}

      {/* STEP 1 – MAIN SCREEN */}
      {step === 1 && (
        <div className="flex flex-col gap-6">
          <div className="absolute left-0 top-0 w-60 h-12 bg-[#F5EEE0]"></div>

          <FontAwesomeIcon icon={faChevronLeft} className="text-gray-600" />

          <h2 className="text-l text-[#E28444]">Define Area of Interest</h2>

          <p className="text-sm text-gray-700">
            <b>Define the area(s)</b> where you will apply your object count and detection model
          </p>

          <div className="flex flex-col gap-2">
            <p className="text-sm">Options:</p>

            <button
              onClick={() => setStep(2)}
              className="w-53 text-gray-600 bg-[#F5EEE0] border border-black-300 rounded-lg px-1 py-3 text-left shadow"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} /> <b>Search</b> for a city, town... or <b>draw</b> area on map
            </button>

            <button
              className="text-gray-600 w-53 bg-[#F5EEE0] border border-gray-300 rounded-lg px-3 py-3 text-sm text-left shadow flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faFileArrowDown} /> Uploading a shape file
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 – SEARCH PANEL */}
      {step === 2 && (
        <div className="flex flex-col gap-4">

          <h2 className="text-l text-[#E28444]">
            Define Area of Interest
          </h2>

          <p className="text-sm text-gray-500">
            Search or use vector tool to create your region.
          </p>

          <p className="text-gray-600">Search Area</p>

          {/* SEARCH BOX */}
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>

            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="city, town, region..."
              onFocus={() => setShowDropdown(true)}
              className="w-full pl-10 pr-3 py-2 bg-[#F3E2BE] border border-gray-400 rounded-md placeholder-gray-600 text-sm"
            />
          </div>

          {/* STEP 3 – DROPDOWN LIST */}
          {showDropdown && (
            <div className="mt-2 bg-white rounded-xl shadow-lg p-4 w-[344px] border border-gray-200">
    {dropdownItems.map((item: string, idx: number) => (
      <p
        key={idx}
        onClick={() => {
          const coords = locations[item];  
          if (coords && mapRef.current) {
            mapRef.current.setView(coords, 8);  // zoom level
  }
          setSearchValue(item);      // <-- ADD THIS
          setShowDropdown(false);    // <-- already correct
        }}
        className="text-[14px] text-gray-700 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
      >
        {item}
      </p>
    ))}
  </div>
          )}

          {/* APPLY OUTLINE BUTTON */}
          <button className="w-full bg-[#b86127] text-white py-2 rounded-md shadow hover:opacity-90">
            Apply outline as base image
          </button>

          <p className="text-xs text-gray-500 -mt-3">
            You can always edit the shape of the area later
          </p>

          {/* CONFIRM BUTTON */}
          <button
            disabled
            className="w-full bg-gray-300 text-gray-600 py-2 rounded-md cursor-not-allowed mt-20"
          >
            Confirm Area of Interest
          </button>
        </div>
      )}
    </div>
  );
};

export default AOISidebar;
