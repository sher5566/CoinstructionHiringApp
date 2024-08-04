import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    vechileType: "",
    address: "",
    sort: "created_at",
    order: "desc",
  });

  const [showMore, setShowMore] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const vechileTypeFromUrl = urlParams.get("vechileType");
    const addressFromUrl = urlParams.get("address");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      sortFromUrl ||
      orderFromUrl ||
      vechileTypeFromUrl ||
      addressFromUrl
    ) {
      setSideBarData({
        searchTerm: searchTermFromUrl || "",
        vechileType: vechileTypeFromUrl || "",
        address: addressFromUrl || "",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        if (!res.ok) {
          
          const errorText = await res.text();
          throw new Error(
            `HTTP error! status: ${res.status}, message: ${errorText}`
          );
        }
        
        const data = await res.json();
        if (data.length === 0) {
          navigate(`/searchforworkforce?${searchQuery}`);
         }
        if (data.length > 8) {
          setShowMore(true);
        }
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "searchTerm" 
     
    ) {
      setSideBarData({ ...sideBarData, searchTerm: e.target.value });
    }

    if (e.target.id === "vechileType") {
      setSideBarData({ ...sideBarData, vechileType: e.target.value });
    }

    if (e.target.id === "address") {
      setSideBarData({ ...sideBarData, address: e.target.value });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSideBarData({ ...sideBarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("vechileType", sideBarData.vechileType);
    urlParams.set("address", sideBarData.address);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("order", sideBarData.order);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length; 
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Location :
            </label>
            <input
              type="text"
              id="address"
              placeholder="search..."
              className="border rounded-lg p-3 w-full"
              value={sideBarData.address}
              onChange={handleChange}
            />
          </div>
          <div className=" flex items-center gap-2">
            <label className="font-semibold"> Sort :</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className=" border rounded-lg p-3"
            >
              <option value="rentPrice_desc">price high to low </option>
              <option value="rentPrice_asc">price low to high </option>
              <option value="createdAt_desc">latest </option>
              <option value="createdAt_asc">oldest </option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          List of{" "}
          {!loading && listings && listings[0] && listings[0].vechileType}'s
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700 ">No Listings found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              loading...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
