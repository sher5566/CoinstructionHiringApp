import { FaSearch } from "react-icons/fa";
import svgIcon from "../assets/Excavator.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [profession, setProfession] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowDropdown(true);
    setShowCategoryDropdown(false);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
    setShowCategoryDropdown(false);
  };

  const handleItemClick = (item) => {
    setShowDropdown(false);
    setShowCategoryDropdown(false);

    navigate(`/search?vechileType=${item}`);
  };
  const handleItemClickW = (item) => {
    setShowDropdown(false);
    setShowCategoryDropdown(false);

    navigate(`/searchforworkforce?profession=${item}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    if (searchQuery) {
      navigate(`/search?${searchQuery}`);
    } else { navigate(`/searchforworkforce?${searchQuery}`); }
    
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const res = await fetch("/api/listing/get");
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `HTTP error! status: ${res.status}, message: ${errorText}`
          );
        }
        const data = await res.json();
        setVehicleTypes(
          data
            .map((listing) => listing.vechileType)
            .filter((value, index, self) => self.indexOf(value) === index)
        );
      } catch (error) {
        console.error("Error fetching vehicle types:", error);
      }
    };

    fetchVehicleTypes();
  }, []);
  useEffect(() => {
    const fetchProfession = async () => {
      try {
        const res = await fetch("/api/workforcelisting/get");
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `HTTP error! status: ${res.status}, message: ${errorText}`
          );
        }
        const data = await res.json();
        setProfession(
          data
            .map((listing) => listing.profession)
            .filter((value, index, self) => self.indexOf(value) === index)
        );
      } catch (error) {
        console.error("Error fetching profession:", error);
      }
    };

    fetchProfession();
  }, []);

  return (
    <header className="bg-slate-200 shadow-xl sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap items-center ">
            <div className="px-2">
              <img src={svgIcon} alt="SVG Icon" className="w-14 h-14" />
            </div>
            <span className="text-slate-700 px-2 hidden sm:inline">
              Hiring Of
            </span>
            <span className="text-slate-700 hidden sm:inline">
              {" "}
              Construction Gear & WorkFroce
            </span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex justify-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex justify-center gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              Category
            </li>
            {showDropdown && (
              <div className="absolute top-full hidden sm:inline  right-0  w-[900px]  text-white bg-slate-700 rounded-xl border border-gray-300 shadow-lg">
                <div className="flex flex-row p-6">
                  <div className="w-1/2 p-2 border-r border-gray-600">
                    <h3 className="text-2xl  font-bold mb-2">Machinery</h3>
                    <ul className="flex flex-col gap-1">
                      {vehicleTypes.map((item) => (
                        <li
                          key={item}
                          onClick={() => handleItemClick(item)}
                          className="cursor-pointer hover:text-gray-400"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-1/2 p-2">
                    <h3 className="text-2xl font-bold mb-2">
                      Workforce Professions
                    </h3>
                    <ul className="flex flex-col gap-1">
                      {profession.map((item) => (
                        <li
                          key={item}
                          onClick={() => handleItemClickW(item)}
                          className="cursor-pointer hover:text-gray-400"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover hidden sm:inline"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
        {/* Mobile: Show three dots menu */}
        <div className="sm:hidden ml-4">
          <button
            className="text-slate-700 hover:underline"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="font-bold text-3xl">...</span>
          </button>
          {showDropdown && (
            <div className="absolute top-full right-0 w-[200px] sm:w-[900px] text-white bg-slate-700 rounded-xl border border-gray-300 shadow-lg">
              <div className="flex flex-col p-6">
                <Link
                  to="/"
                  onClick={handleMouseLeave}
                  className="mb-4 hover:text-gray-400"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={handleMouseLeave}
                  className="mb-4 hover:text-gray-400"
                >
                  About
                </Link>
                {/* DropDown in the three Dots  */}
                <div className="relative">
                  <button
                    className="text-white hover:underline cursor-pointer"
                    onClick={() =>
                      setShowCategoryDropdown(!showCategoryDropdown)
                    }
                  >
                    Category
                  </button>
                  {showCategoryDropdown && (
                    <div className="absolute top-full right-0 w-[400px] text-white bg-slate-700 rounded-xl border border-gray-300 shadow-lg">
                      {/* Category dropdown content */}
                      <div className="flex flex-row p-6">
                        <div className="w-1/2 p-2 border-r border-gray-600">
                          <h3 className="text-xl font-bold mb-2">Machinery</h3>
                          <ul className="flex flex-col gap-1">
                            {vehicleTypes.map((item) => (
                              <li
                                key={item}
                                onClick={() => handleItemClick(item)}
                                className="cursor-pointer hover:text-gray-400"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="w-1/2 p-2">
                          <h3 className="text-2xl font-bold mb-2">
                            Workforce Professions
                          </h3>
                          <ul className="flex flex-col gap-1">
                            {profession.map((item) => (
                              <li
                                key={item}
                                onClick={() => handleItemClickW(item)}
                                className="cursor-pointer hover:text-gray-400"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Link to="/profile" onClick={handleMouseLeave}>
                  {currentUser ? (
                    <img
                      className="rounded-full h-7 w-7 object-cover mt-4"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                  ) : (
                    <button className="mt-4 text-slate-700 hover:text-gray-400">
                      Sign In
                    </button>
                  )}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
