import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";



export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log("Firebase Authentication result", result);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Cloud not sign in with Google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24px"
        height="24px"
        className="mr-2"
      >
        <path
          fill="#4285F4"
          d="M24 9.5c3.6 0 5.9 1.6 7.3 2.9l5.4-5.4C33.7 4.5 29.3 3 24 3 14.7 3 7 8.5 4.3 16.3l6.8 5.3C12.4 15.8 17.6 9.5 24 9.5z"
        />
        <path
          fill="#34A853"
          d="M24 44c5.4 0 9.9-1.8 13.2-4.9l-6.4-5.1c-1.8 1.2-4.2 2-6.8 2-5.2 0-9.7-3.5-11.3-8.3l-6.8 5.3C9.1 39.4 15.3 44 24 44z"
        />
        <path
          fill="#FBBC05"
          d="M41.6 20.2H40V20H24v8.4h10c-1.3 3.5-4.2 6.1-7.8 7.1l6.4 5.1C36.8 37.1 41 30.7 41 24c0-1.3-.1-2.7-.4-3.8z"
        />
        <path
          fill="#EA4335"
          d="M12.1 27.8c-.7-2.2-.7-4.6 0-6.8L5.3 16C2.6 21.4 2.6 28.6 5.3 34l6.8-5.2z"
        />
      </svg>
      Continue with Google
    </button>
  );
}
