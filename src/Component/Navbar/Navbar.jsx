import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase.init";


const commonLinks = [
  { path: "/", label: "Home" },
  { path: "/all-scholarship", label: "All Scholarships" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 🆕

  const fetchUserRole = async (email) => {
    try {
      const res = await fetch(`https://scholarcore.vercel.app/users/role/${email}`);
      const data = await res.json();
      setRole(data.role || "user");
    } catch (err) {
     
      setRole("user");
    }
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) fetchUserRole(currentUser.email); // 🆕
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
    navigate("/login");
  };

 
  const getNavItems = () => {
    const items = [...commonLinks];

    if (role === "admin") {
      items.push({ path: "/admin-dashboard", label: "Admin Dashboard" });
    } else if (role === "moderator") {
      items.push({ path: "/moderator-dashboard", label: "Moderator Dashboard" });
    } else if (role === "user") {
      items.push({ path: "/user-dashboard", label: "User Dashboard" });
    }

    return items;
  };

  const renderLinks = () => (
    <ul className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 text-base font-medium">
      {getNavItems().map(({ path, label }) => (
        <li key={label}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-primary-600 ${
                isActive ? "text-yellow-500" : "text-white dark:text-gray-200"
              }`
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky bg-gray-800 top-0 z-50 dark:bg-gray-900/80 backdrop-blur shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-6">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-semibold">
          <img
            src="https://i.postimg.cc/hv5WW3Nx/lo2-removebg-preview.png"
            alt="ScholarCore logo"
            className="h-12 w-12 text-white object-contain"
          />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e0c87d] via-[#ffffff] to-[#e0c87d]">
            ScholarCore
          </h1>
        </NavLink>

        <div className="hidden lg:block">{renderLinks()}</div>

     
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <>
              {user.displayName && (
                <span className="text-white font-medium">{user.displayName}</span>
              )}

              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}

              <button
                onClick={handleLogout}
                className="px-2 py-1 rounded-lg border text-white hover:bg-yellow-400 border-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-lg text-white hover:bg-yellow-400 border border-primary-600 text-primary-600 transition-colors hover:bg-primary-50 dark:hover:bg-primary-700/20"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-yellow-400 transition-colors hover:bg-primary-700"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white dark:bg-gray-900 shadow-md border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4 space-y-6">
            {renderLinks()}
            <div className="flex flex-col gap-3 pt-2 sm:hidden">
              {user ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="w-full text-white text-center px-4 py-2 rounded-lg border border-red-500 hover:bg-red-500"
                  >
                    Logout
                  </button>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full mx-auto object-cover"
                    />
                  ) : (
                    <div className="text-center text-white font-medium">
                      {user.displayName || "User"}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="w-full text-center px-4 py-2 rounded-lg text-white border border-primary-600 text-primary-600 transition-colors hover:bg-primary-50 dark:hover:bg-primary-700/20"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="w-full text-center px-4 py-2 rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-700"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
