import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaMailBulk, FaPhone } from "react-icons/fa";

export default function WorkforceListingItem({ listing }) { 
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]">
      <Link to={`/workforcelisting/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700  truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1 ">
            <MdLocationOn className="h-8 w-8 text-green-700" />
            <p className="text-sm truncate text-slate-600 w-full font-semibold">
              {listing.address}
            </p>
            <p className="text-sm truncate text-slate-600 w-full font-semibold">
              {listing.profession}
            </p>
          </div>
          <p className="text-slate-600 text-sm line-clamp-2 ">
            {listing.description}
          </p>

          <p className="text-slate-500 font-semibold mt-2">
            RS :{listing.desiredSalary.toLocaleString("en-US")} / Month
          </p>

          <div className="flex gap-2">
            <div className="flex gap-1 text-xs ">
              <FaMailBulk className="text-lg" />
              {listing.email}
            </div>
            <div className=" gap-1 items-center text-xs flex">
              <FaPhone className="" />
              {listing.contactNumber}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
