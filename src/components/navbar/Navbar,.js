import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import "./navbar.css";
import { signOut } from "@firebase/auth";
import { Auth } from "../../firebase-config";

function Navbar() {
  const history = useHistory();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  //-----------Logout user---------------------
  const logout = async () => {
    await signOut(Auth);
    alert("logout successfully");
    history.push("/");
  };
  //--

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a className="navbar-logo" onClick={closeMobileMenu}>
            ATTEND-IT
          </a>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/user" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-links" onClick={closeMobileMenu}>
                Dashboard
              </Link>
            </li>
          </ul>

          {button && (
            <button className="btn-outline" onClick={logout}>
              LOG OUT
            </button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
