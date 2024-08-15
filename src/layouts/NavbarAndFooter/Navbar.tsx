import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [showModal, setShowModal] = useState(false);

  if (!authState) {
    return <SpinnerLoading />;
  }

  const handleLogout = async () => oktaAuth.signOut();
  console.log(authState);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
        <div className="container-fluid">
          <span className="navbar-brand">Readium</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle Navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/search">
                  Search
                </NavLink>
              </li>
              {authState.isAuthenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/shelf">
                    Shelf
                  </NavLink>
                </li>
              )}
              {authState.isAuthenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/messages">
                    Messages
                  </NavLink>
                </li>
              )}
              {authState.isAuthenticated &&
                authState.accessToken?.claims?.userType === "admin" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin">
                      Admin
                    </NavLink>
                  </li>
                )}
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item m-1">
                <Link
                  type="button"
                  className="btn btn-outline-success"
                  to="/contactus"
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item m-1">
                <button
                  className="btn"
                  style={{ backgroundColor: "lightgrey", color: "black" }}
                  onClick={handleShow}
                >
                  Sign In As Guest
                </button>
              </li>
              {!authState.isAuthenticated ? (
                <li className="nav-item m-1">
                  <Link
                    type="button"
                    className="btn btn-outline-light"
                    to="/login"
                  >
                    Sign in
                  </Link>
                </li>
              ) : (
                <li>
                  <button
                    className="btn btn-outline-light"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">
            Guest Login Credentials
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Username:</strong> testuser@email.com
          </p>
          <p>
            <strong>Password:</strong> test@123
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
