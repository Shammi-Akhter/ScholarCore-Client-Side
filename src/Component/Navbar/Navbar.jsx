import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Menu, X, LogOut, User, Home, GraduationCap, LayoutDashboard } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase.init";
import { Button } from "../../components/ui/button";


const commonLinks = [
  { path: "/", label: "Home", icon: Home },
  { path: "/all-scholarship", label: "All Scholarships", icon: GraduationCap },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

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
      if (currentUser?.email) fetchUserRole(currentUser.email);
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
      items.push({ path: "/admin-dashboard", label: "Admin Dashboard", icon: LayoutDashboard });
    } else if (role === "moderator") {
      items.push({ path: "/moderator-dashboard", label: "Moderator Dashboard", icon: LayoutDashboard });
    } else if (role === "user") {
      items.push({ path: "/user-dashboard", label: "User Dashboard", icon: LayoutDashboard });
    }

    return items;
  };

  const renderLinks = () => (
    <ul className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6 text-base font-medium">
      {getNavItems().map(({ path, label, icon: Icon }) => (
        <li key={label}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                ? "bg-[#FEE685] text-black font-semibold shadow-sm"
                : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky bg-white top-0 z-50 shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-7 h-7 text-black" />
          </div>
          <h1 className="text-2xl font-bold text-black">
            ScholarCore
          </h1>
        </NavLink>

        <div className="hidden lg:block">{renderLinks()}</div>


        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <>
              {user.displayName && (
                <span className="text-gray-700 font-medium hidden md:block">{user.displayName}</span>
              )}

              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FEE685] shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-[#FEE685] to-[#ffd93d] rounded-full flex items-center justify-center text-black font-semibold shadow-sm">
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}

              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                size="sm"
                className="hover:bg-gray-100"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                size="sm"
                className="bg-[#FEE685] text-black hover:bg-[#FEE685]/90 shadow-sm"
              >
                Register
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center lg:hidden">
          <div className="bg-white w-full max-w-sm p-6 mt-20 mx-4 rounded-2xl shadow-2xl relative animate-fadeIn">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
            {renderLinks()}
            <div className="flex flex-col gap-3 pt-6 mt-6 border-t">
              {user ? (
                <>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-12 h-12 rounded-full mx-auto object-cover ring-2 ring-[#FEE685] shadow-sm"
                    />
                  ) : (
                    <div className="text-center text-gray-700 font-medium">
                      {user.displayName || "User"}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/login")}
                    variant="outline"
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate("/register")}
                    className="w-full bg-[#FEE685] text-black hover:bg-[#FEE685]/90"
                  >
                    Register
                  </Button>
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
