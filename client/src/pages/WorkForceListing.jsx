import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    profession: "",
    qualification: "",
    description: "",
    address: "",
    contactNumber: "",
    email: "",
    desiredSalary: "",
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData);

  const handleImageSubmit = () => {
    if (files.length === 1) {
      setUploading(true);
      setImageUploadError(false);

      storeImage(files[0])
        .then((url) => {
          setFormData({
            ...formData,
            imageUrls: [url], // Only allow a single image URL
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload error: (2 MB max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload one image per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "email"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Corrected typo
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      
      setLoading(true);
      setError(false);

      const res = await fetch("/api/workforcelisting/createworkforce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();

      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/workforcelisting/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7">Add Listing </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">
        <div className=" flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name "
            className="border p-3 rounded-lg border-gray-400"
            id="name"
            maxLength="64"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Your Profession "
            className="border p-3 rounded-lg  border-gray-400"
            id="profession"
            required
            onChange={handleChange}
            value={formData.profession}
          />
          <input
            type="text"
            placeholder="Your Qualification "
            className="border p-3 rounded-lg  border-gray-400"
            id="qualification"
            required
            onChange={handleChange}
            value={formData.qualification}
          />
          <input
            type="text"
            placeholder="Address "
            className="border p-3 rounded-lg  border-gray-400"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <input
            type="textarea"
            placeholder="Description "
            className="border p-3 rounded-lg  border-gray-400"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Contact Number "
            className="border p-3 rounded-lg  border-gray-400"
            id="contactNumber"
            required
            onChange={handleChange}
            value={formData.contactNumber}
          />
          <input
            type="email"
            placeholder="Email "
            className="border p-3 rounded-lg  border-gray-400"
            id="email"
            required
            onChange={handleChange}
            value={formData.email}
          />
          <div className=" flex  gap-4 items-center">
            <input
              type="text"
              className="border p-3 rounded-lg  border-gray-400"
              placeholder="0.00"
              min="10000"
              max="100000000"
              id="desiredSalary"
              required
              onChange={handleChange}
              value={formData.desiredSalary}
            />
            <div className="">
              <p className="font-semibold">Desired Salary </p>
              <span className="text-sm">(Rs/Month)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">Profile Image :</p>

          <div className="flex flex-row gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              disabled={uploading}
              type="button"
              onClick={handleImageSubmit}
              className=" p-3 border text-green-700 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading" : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className=" flex justify-between p-3 items-center border "
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg "
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg hover:opacity-75 uppercase"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 text-white rounded-lg bg-slate-700 uppercase disabled:opacity-80 hover:opacity-90"
          >
            {loading ? "Publishing..." : "Publish Listing"}
          </button>
          {error && <p className=" text-red-700 text-sm">{error} </p>}
        </div>
      </form>
    </main>
  );
}
