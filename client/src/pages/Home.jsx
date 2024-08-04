import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import WorkforceListingItem from "../components/workforceListingItems";
import Footer from "../components/Footer.jsx";
import heroBackground from "../assets/background-image.jpg";
import heroBackground1 from "../assets/background-image1.jpg";
import heroBackground2 from "../assets/background-image2.jpg";

const backgroundImages = [heroBackground, heroBackground1, heroBackground2];

function Home() {
  SwiperCore.use([Navigation, Autoplay]);
  const [listings, setListings] = useState([]);
  const [wlistings, setWListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [wshowMore, setWShowMore] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const searchTerm = urlParams.get("searchTerm") || "";

        const res = await fetch(
          `/api/listing/get?order=desc&limit=all&searchTerm=${searchTerm}`
        );
        const data = await res.json();
        setListings(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchListingsW = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const searchTerm = urlParams.get("searchTerm") || "";

        const res = await fetch(
          `/api/workforcelisting/get?order=desc&limit=all&searchTerm=${searchTerm}`
        );
        const data = await res.json();
        setWListings(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
    fetchListingsW();
  }, [location.search]);

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
  const onShowMoreClickW = async () => {
    const numberOfListings = wlistings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/workforcelisting/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setWShowMore(false);
    }
    setWListings([...wlistings, ...data]);
  };

  return (
    <div>
      <div className="bg-cover bg-center bg-repeat-y">
        <Swiper
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          modules={[Navigation, Autoplay]}
          className="relative h-[50vh] max-w-full mx-auto"
        >
          {backgroundImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-start sm:pl-32 text-white p-8">
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    Access Top-Quality Construction <br />{" "}
                    <span>Machinery and Workforce</span>
                  </h1>
                  <p className="mt-4 text-left text-sm sm:text-base max-w-lg">
                    For your construction needs, rent the best and diverse
                    machinery and workforce on our website. Contact us to get
                    quality machinery and skilled workforce at the best prices.
                  </p>
                  <Link
                    className="mt-4 text-sm sm:text-base bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    to={"/search"}
                  >
                    Let's get started...
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Listings */}
      <div className="max-w-6xl mx-auto p-5 flex flex-col gap-8 my-16">
        <div className="flex justify-between items-center my-3">
          <h2 className="text-black text-2xl font-semibold">Machinery</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingItem listing={listing} key={listing._id} />
          ))}
        </div>
        <button
          className="text-sm text-blue-400 hover:underline"
          onClick={onShowMoreClick}
        >
          Show more
        </button>
      </div>

      {/* Swiper */}
      <Swiper
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="my-10 max-w-full mx-auto"
      >
        {listings &&
          listings.length > 0 &&
          listings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[300px] sm:h-[400px] rounded-lg shadow-lg"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Workforce Listing */}
      <div className="max-w-6xl mx-auto p-5 flex flex-col gap-8 my-10">
        <div className="flex justify-between items-center my-3">
          <h2 className="text-black text-2xl font-semibold">WorkForce</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wlistings.map((listing) => (
            <WorkforceListingItem listing={listing} key={listing._id} />
          ))}
        </div>
        <button
          className="text-sm text-blue-400 hover:underline"
          onClick={onShowMoreClickW}
        >
          Show more
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
