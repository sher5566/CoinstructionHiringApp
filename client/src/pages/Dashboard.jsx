import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState({
    machinery: [],
    workforce: [],
  });
  const [showListingError, setShowListingError] = useState(false);

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleListingDelete = async (listingId, type) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) => ({
        ...prev,
        [type]: prev[type].filter((listing) => listing._id !== listingId),
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 pt-10 max-w-lg mx-auto">
      <form className="flex flex-col gap-4">
        <Link
          className="bg-green-700 rounded-lg p-3 text-center text-white uppercase hover:opacity-90 disabled:opacity-75"
          to="/select-one"
        >
          Add Listing
        </Link>
      </form>
      <div className="flex flex-col ">
        <button
          onClick={handleShowListing}
          className="bg-slate-700 rounded-lg p-3 text-center text-white uppercase hover:opacity-90 mt-7"
        >
          Show Listings
        </button>
        <p className="text-red-700 mt-5">
          {showListingError ? "Error showing listings" : ""}
        </p>
      </div>
      
      {userListings &&
        (userListings.machinery.length > 0 ||
          userListings.workforce.length > 0) && (
          <div className="flex flex-col gap-4">
            <h1 className="text-center mt-7 text-2xl font-semibold">
              Your Listings
            </h1>
            {userListings.machinery.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mt-4">
                  Machinery Listings
                </h2>
                {userListings.machinery.map((listing) => (
                  <div
                    className="border rounded-lg p-3 flex justify-between items-center gap-4"
                    key={listing._id}
                  >
                    <Link to={`/listing/${listing._id}`}>
                      <img
                        className="h-16 w-16 object-contain"
                        src={listing.imageUrls[0]}
                        alt="listing image"
                      />
                    </Link>
                    <Link
                      className="flex-1 text-slate-700 hover:underline truncate"
                      to={`/listing/${listing._id}`}
                    >
                      <p className="font-semibold">{listing.name}</p>
                    </Link>
                    <div className="flex flex-col">
                      <button
                        onClick={() =>
                          handleListingDelete(listing._id, "machinery")
                        }
                        className="text-red-700 uppercase"
                      >
                        Delete
                      </button>
                      <Link to={`/update-listing/${listing._id}`}>
                        <button className="text-green-700 uppercase">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {userListings.workforce.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mt-4">
                  Workforce Listings
                </h2>
                {userListings.workforce.map((listing) => (
                  <div
                    className="border rounded-lg p-3 flex justify-between items-center gap-4"
                    key={listing._id}
                  >
                    <Link to={`/workforcelisting/${listing._id}`}>
                      <img
                        className="h-16 w-16 object-contain"
                        src={listing.imageUrls[0]}
                        alt="listing image"
                      />
                    </Link>
                    <Link
                      className="flex-1 text-slate-700 hover:underline truncate"
                      to={`/workforcelisting/${listing._id}`}
                    >
                      <p className="font-semibold">{listing.name}</p>
                    </Link>
                    <div className="flex flex-col">
                      <button
                        onClick={() =>
                          handleListingDelete(listing._id, "workforce")
                        }
                        className="text-red-700 uppercase"
                      >
                        Delete
                      </button>
                      <Link to={`/update-workfoce-listing/${listing._id}`}>
                        <button className="text-green-700 uppercase">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
    </div>
  );
}
