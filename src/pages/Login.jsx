import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider.jsx"; // Make sure to import the context

const Login = () => {
  const { user, googleSignIn } = useContext(AuthContext);

  console.log('user', user);

  const handleGoogleSignIn = () => {
    googleSignIn().then(result => {
      console.log('Google Sign In Success:', result.user);
    }).catch(error => {
      console.error('Google Sign In Error:', error);
    });
  };

  return (
    <div>
      <div className="bg-white flex justify-center items-center">
        <div className="h-[300px] bg-blue-500 rounded-lg p-10 mt-20">
          <h1 className="text-white text-3xl text-center font-semibold">
            Login
          </h1>
          <div className="flex justify-center items-center pt-10">
            <button
              className="bg-white text-black rounded-lg px-5 py-2 font-semibold"
              onClick={handleGoogleSignIn} // Handle Google Sign In
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
