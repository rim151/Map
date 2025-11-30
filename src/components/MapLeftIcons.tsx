import {FaHome,FaLocationArrow, FaMap,FaUserCircle, FaCog } from "react-icons/fa";

const MapLeftIcons = () => {
  return (

    <div className="absolute left-0 top-0 w-18 h-full shadow-xl z-9999 bg-black opacity-49"> 

      <div className="absolute left-1 top-1 z-9000 flex flex-col gap-3 items-center ">

      {/* Profile Icon */}
      <button className="w-16 h-17 bg-[#E3CDA0] backdrop-blur shadow-lg rounded-full flex items-center justify-center hover:bg-white">
        <FaLocationArrow size={28} />
      </button>
      <button className="w-11 h-11 bg-[#E3CDA0] backdrop-blur shadow-lg rounded-full flex items-center justify-center hover:bg-white">
        <FaHome size={26} />
      </button>

      {/* Settings Icon */}
      <button className="w-8 h-8 bg-[#E3CDA0] backdrop-blur shadow-lg rounded-full flex items-center justify-center hover:bg-white">
        <FaMap size={26} />
      </button>

    </div>

      <div className="absolute left-3 bottom-25 z-9000 flex flex-col gap-3 items-center">

      {/* Profile Icon */}
      <button className="w-9 h-9 bg-[#E3CDA0] backdrop-blur shadow-lg rounded-full flex items-center justify-center hover:bg-white">
        <FaUserCircle size={26} />
      </button>

      {/* Settings Icon */}
      <button className="w-8 h-8 bg-[#E3CDA0] backdrop-blur shadow-lg rounded-full flex items-center justify-center hover:bg-white">
        <FaCog size={26} />
      </button>

    </div>
    </div>
  );
};

export default MapLeftIcons;
