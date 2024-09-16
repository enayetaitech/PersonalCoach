import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const MainLayout = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut().then(() => {
      console.log("Logged out successfully");
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div>
          <Link to="/" className="text-white font-bold text-lg mr-4">Home</Link>
          <Link to="/payment" className="text-white font-bold text-lg mr-4">Payment</Link>
        </div>
        <div>
          {user ? (
            <>
              <span className="text-white mr-4">Hello, {user.displayName || 'User'}</span>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
