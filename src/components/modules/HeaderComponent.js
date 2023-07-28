import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import cookies from "js-cookie";
import UserLogin from "../molecules/UserLogin";
import { BarsSVG, CloseSVG } from "./SVG";
import { Modal, Button } from "react-bootstrap";

function HeaderComponent(props) {
  const [collapse, setCollapse] = useState(false);

  const token = cookies.get("token");
  const { user } = useSelector((state) => state.dataUserById);
  const cart = useSelector((state) => state.addCart);
  const router = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleCollapse = () => setCollapse(!collapse);

  const activeClass = (path) => {
    return router.pathname === path ? " active" : "";
  };

  const toLogin = () => {
    router.push("/auth/login");
  };

  const toRegister = () => {
    router.push("/auth/register");
  };

  const toHome = () => {
    router.push("/");
  };

  const toHomeProduct = () => {
    router.push("/main/home");
  };

  const yourCart = () => {
    // VALIDATE CART
    if (!cart.cart.length) {
      setShow(true);

      return;
    }

    router.push("/main/payment");
  };

  return (
    <header className="header">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>No order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Order first your favorit foods!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="/">Mie Ayam Kangen</a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleCollapse}
          >
            {!collapse ? (
              <BarsSVG width="20" height="20" />
            ) : (
              <CloseSVG width="20" height="20" />
            )}
          </button>
          <div className={`${!collapse ? "collapse" : ""} navbar-collapse`}>
            <ul className="navbar-nav mx-md-auto mb-2 mb-lg-0">
              {!token ? null : (
                <>
                  <li className="nav-item">
                    <a
                      style={{ cursor: "pointer" }}
                      className={`nav-link${activeClass("/")}`}
                      onClick={toHome}
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      style={{ cursor: "pointer" }}
                      className={`nav-link${activeClass("/main/home")}`}
                      onClick={toHomeProduct}
                    >
                      Product
                    </a>
                  </li>

                  {user.role === "admin" ? (
                    <>
                                <li className="nav-item pe-0">
                        <a
                          style={{ cursor: "pointer" }}
                          className={`nav-link${activeClass(
                            "/admin/order"
                          )}`}
                          onClick={() => router.push("/admin/order")}
                        >
                          Order
                        </a>
                      </li>
                      <li className="nav-item pe-1 mx-5">
                        <a
                          style={{ cursor: "pointer" }}
                          className={`nav-link${activeClass(
                            "/admin/dashboard"
                          )}`}
                          onClick={() => router.push("/admin/dashboard")}
                        >
                          Dashboard
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <a
                          style={{ cursor: "pointer" }}
                          className={`nav-link${activeClass("/main/payment")}`}
                          onClick={yourCart}
                        >
                          Your Cart
                        </a>
                      </li>
                      <li className="nav-item pe-0">
                        <a
                          style={{ cursor: "pointer" }}
                          className={`nav-link${activeClass(
                            "/main/profile/history"
                          )}`}
                          onClick={() => router.push("/main/profile/history")}
                        >
                          History
                        </a>
                      </li>{" "}
                    </>
                  )}
                </>
              )}
            </ul>

            {token ? (
              <UserLogin />
            ) : (
              <>
                <div className="header__navbar--button d-none d-md-block">
                  <a className="btn__link--signin" onClick={toLogin}>
                    Signin
                  </a>
                  <a className="btn__link--signup" onClick={toRegister}>
                    Signup
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderComponent;
