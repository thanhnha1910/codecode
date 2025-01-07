import { use, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useUser } from "../context/UserProvider.jsx";
import { toast } from "react-toastify";

export default function HomeLayout() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
    useEffect(() => {
      console.log("Current user in HomeLayout:", user); // Thêm log để kiểm tra
    }, [user]);
  };
  return (
    <>
      {/*
            <div id="spinner"
                 className="show bg-white fixed inset-0 flex items-center justify-center">
                <div className="spinner-border text-primary w-12 h-12" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            */}

      <div className="container-fluid position-relative p-0">
        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
          <a href="" className="navbar-brand p-0">
            <h1 className="text-primary m-0">
              <i className="fa fa-map-marker-alt me-3"></i>Karnel
            </h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars"></span>
          </button>
          <div className="navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <NavLink to="/" className="nav-item nav-link">
                Home
              </NavLink>
              <NavLink to="/about" className="nav-item nav-link">
                About
              </NavLink>
              <NavLink to="/search" className="nav-item nav-link">
                Search
              </NavLink>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Information
                </a>
                <div className="dropdown-menu m-0">
                  <NavLink to="" className="dropdown-item">
                    Tourist Spots
                  </NavLink>
                  <NavLink to="" className="dropdown-item">
                    Travel
                  </NavLink>
                  <NavLink to="" className="dropdown-item">
                    Hotels
                  </NavLink>
                  <NavLink to="" className="dropdown-item">
                    Restaurants
                  </NavLink>
                  <NavLink to="" className="dropdown-item">
                    Resorts
                  </NavLink>
                </div>
              </div>
              <NavLink to="/contact" className="nav-item nav-link">
                Contact
              </NavLink>
            </div>
            {user ? (
              <div className="d-flex align-items-center ms-4">
                <NavLink to="/profile" className="nav-link">
                  <img
                    src={user.avatar || "/img/User_icon_2.svg.png"}
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                  />
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="btn btn-primary rounded-pill py-2 px-4 ms-3"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex">
                <NavLink
                  to="/login"
                  className="btn btn-outline-primary rounded-pill py-2 px-4 me-2"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-primary rounded-pill py-2 px-4"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        <div className="container-fluid bg-primary py-5 mb-5 hero-header">
          <div className="container py-5">
            <div className="row justify-content-center py-5">
              <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                <h1 className="display-3 text-white mb-3 animated slideInDown">
                  Enjoy Your Vacation With Us
                </h1>
                <p className="fs-4 text-white mb-4 animated slideInDown">
                  Tempor erat elitr rebum at clita diam amet diam et eos erat
                  ipsum lorem sit
                </p>
                <div className="position-relative w-75 mx-auto animated slideInDown">
                  <input
                    className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Eg: Thailand"
                  />
                  <button
                    type="button"
                    className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-1 end-0 me-2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
        <div
          className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container py-5">
            <div className="row g-5">
              <div className="col-lg-3 col-md-6">
                <h4 className="text-white mb-3">Company</h4>
                <a className="btn btn-link" href="">
                  About Us
                </a>
                <a className="btn btn-link" href="">
                  Contact Us
                </a>
                <a className="btn btn-link" href="">
                  Privacy Policy
                </a>
                <a className="btn btn-link" href="">
                  Terms & Condition
                </a>
                <a className="btn btn-link" href="">
                  FAQs & Help
                </a>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4 className="text-white mb-3">Contact</h4>
                <p className="mb-2">
                  <i className="fa fa-map-marker-alt me-3"></i>391 NKKN, HCMC,
                  Vietnam
                </p>
                <p className="mb-2">
                  <i className="fa fa-phone-alt me-3"></i>+012 345 67890
                </p>
                <p className="mb-2">
                  <i className="fa fa-envelope me-3"></i>info@example.com
                </p>
                <div className="d-flex pt-2">
                  <a className="btn btn-outline-light btn-social" href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-outline-light btn-social" href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-outline-light btn-social" href="">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a className="btn btn-outline-light btn-social" href="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4 className="text-white mb-3">Gallery</h4>
                <div className="row g-2 pt-2">
                  <div className="col-4">
                    <img
                      className="img-fluid bg-light p-1"
                      src="img/placeholder.svg"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      className="img-fluid bg-light p-1"
                      src="img/placeholder.svg"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      className="img-fluid bg-light p-1"
                      src="img/placeholder.svg"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      className="img-fluid bg-light p-1"
                      src="img/placeholder.svg"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      className="img-fluid bg-light p-1"
                      src="img/placeholder.svg"
                      alt=""
                    />
                  </div>
                  <div className="col-4">
                    <img
                      className="img-fluid bg-light p-1"
                      src="img/placeholder.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4 className="text-white mb-3">Newsletter</h4>
                <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                <div className="position-relative mx-auto max-w-[400px]">
                  <input
                    className="form-control border-primary w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Your email"
                  />
                  <button
                    type="button"
                    className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="copyright">
              <div className="row">
                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                  &copy;{" "}
                  <a className="border-bottom" href="#">
                    Karnel Travel Guide
                  </a>
                  , All Right Reserved.
                </div>
                <div className="col-md-6 text-center text-md-end">
                  <div className="footer-menu">
                    <a href="">Home</a>
                    <a href="">Cookies</a>
                    <a href="">Help</a>
                    <a href="">FQAs</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
