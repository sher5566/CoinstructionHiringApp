import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import SelectOne from "./pages/SelectOne";
import CreateListing from "./pages/CreateListing";
import WorkForceListing from "./pages/WorkForceListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import ListingForWorkforce from "./pages/ListingForWorkforce";
import Search from "./pages/Search";
import SearchForWorkforce from "./pages/SearchForWorkforce";
import UpdateWorkfoceListing from "./pages/UpdateWorkfoceListing";
import Admin from "./pages/Admin";
import ManageUsers from "./components/ManageUsers";


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<ManageUsers />} />

        <Route path="/search" element={<Search />} />
        <Route path="/searchforworkforce" element={<SearchForWorkforce />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route
          path="/workforcelisting/:listingId"
          element={<ListingForWorkforce />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/select-one" element={<SelectOne />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/create-workforce-listing"
            element={<WorkForceListing />}
          />

          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
          <Route
            path="/update-workfoce-listing/:listingId"
            element={<UpdateWorkfoceListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
