import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";
import HamburgerMenu from "../components/HamburgerMenu";

const navigationLinks = [
  "/Mercury",
  "/Venus",
  "/Earth",
  "/Mars",
  "/Jupiter",
  "/Saturn",
  "/Uranus",
  "/Neptune",
];

export default function Layout() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (navigationLinks.includes(pathname)) {
      navigate(pathname);
    } else {
      navigate("/Earth");
    }
    console.log("mounted");
  }, [pathname, navigate]);

  return (
    <div>
      <div className="flex justify-between p-4">
        <Header />
        <HamburgerMenu />
      </div>
      <hr className="h-[1px] opacity-20" />
      <Outlet />
    </div>
  );
}
