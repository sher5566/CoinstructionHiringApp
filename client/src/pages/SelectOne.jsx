
import { Link } from "react-router-dom";

export default function SelectOne() {

    return (
        <div className="p-3  pt-10  max-w-lg mx-auto">
            <p className = "text-xl font-semibold p-3"> Please Select what are you List</p>
        <form className="flex flex-col gap-4">
          <Link
            className="bg-green-700 rounded-lg p-3 text-center text-white uppercase hover:opacity-90 disabled:opacity-75"
            to="/create-listing"
          >
            Are you listing Machinery 
          </Link>
          <Link
            className="bg-blue-900 rounded-lg p-3 text-center text-white uppercase hover:opacity-90 disabled:opacity-75"
            to="/create-workforce-listing"
          >
            Are you listing Workforce
          </Link>
        </form>
      </div>
    );


}