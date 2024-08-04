import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
import WorkforceListing from "../models/workforcelisting.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
export const createWorkforce = async (req, res, next) => {
  try {
    const listing = await WorkforceListing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    // Try to find the listing in the MachineryListing collection
    let listing = await Listing.findById(req.params.id);
    let listingType = "machinery";

    // If not found in MachineryListing, try to find it in WorkforceListing
    if (!listing) {
      listing = await WorkforceListing.findById(req.params.id);
      listingType = "workforce";
    }

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "You can only delete your own listing"));
    }

    // Delete the listing
    if (listingType === "machinery") {
      await Listing.findByIdAndDelete(req.params.id);
    } else {
      await WorkforceListing.findByIdAndDelete(req.params.id);
    }

    res.status(200).json("Listing deleted");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    // Try to find the listing in the MachineryListing collection
    let listing = await Listing.findById(req.params.id);
    let listingType = "machinery";

    // If not found in MachineryListing, try to find it in WorkforceListing
    if (!listing) {
      listing = await WorkforceListing.findById(req.params.id);
      listingType = "workforce";
    }

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "You can only update your own listing"));
    }

    // Update the listing
    let updatedListing;
    if (listingType === "machinery") {
      updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
    } else {
      updatedListing = await WorkforceListing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
    }

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    // Try to find the listing in the MachineryListing collection
    let listing = await Listing.findById(req.params.id);
    let listingType = "machinery";

    // If not found in MachineryListing, try to find it in WorkforceListing
    if (!listing) {
      listing = await WorkforceListing.findById(req.params.id);
      listingType = "workforce";
    }

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    if (listingType === "workforce") {
      res.status(200).json(listing);
    } else {
      res.status(200).json(listing);
    }
  } catch (error) {
    next(error);
  }
};

export const getWorkforce = async (req, res, next) => {
  try {
    const listing = await WorkforceListing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "listing not found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const vechileType = req.query.vechileType
      ? req.query.vechileType
      : { $exists: true };
    const address = req.query.address
      ? { $regex: req.query.address, $options: "i" }
      : { $exists: true };
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    // Updated query to search across multiple fields
    const listings = await Listing.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        // { description: { $regex: searchTerm, $options: "i" } },
        { vechileType: { $regex: searchTerm, $options: "i" } },
        // Add more fields as needed
      ],
      vechileType,
      address,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
export const getWorkforcelisting = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const address = req.query.address
      ? { $regex: req.query.address, $options: "i" }
      : { $exists: true };
    const profession = req.query.profession
      ? { $regex: req.query.profession, $options: "i" }
      : { $exists: true };
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    // Updated query to search across multiple fields
    const listings = await WorkforceListing.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        // { description: { $regex: searchTerm, $options: "i" } },
        { profession: { $regex: searchTerm, $options: "i" } },
        // Add more fields as needed
      ],

      address,
      profession,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
