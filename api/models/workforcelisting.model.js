import mongoose from "mongoose";

const workforceListingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    desiredSalary: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    userRef: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const WorkforceListing = mongoose.model(
  "WorkforceListing",
  workforceListingSchema
);

export default WorkforceListing;
