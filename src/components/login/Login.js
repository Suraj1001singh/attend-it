import React, { useState } from "react";
import "./login.css";
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "@firebase/auth";
import { Auth } from "../../firebase-config";
const Login = () => {
  const history = useHistory();
  const [userRegister, setUserRegister] = useState({
    email: "",
    password: "",
  });
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState({});
  
  onAuthStateChanged(Auth, (currentUser) => {
    setUser(currentUser);
  });
  //-----------Register user-------------------
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(Auth, userRegister.email, userRegister.password);
      if (user) history.push("/user");
    } catch (e) {
      alert(e.message);
    }
  };
  //-----------Login user----------------------
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(Auth, userLogin.email, userLogin.password);
      alert("login successfully");
      history.push("/user");
    } catch (e) {
      alert(e.message);
    }
  };

  //----------------handle on changes-----------
  const handleOnChange1 = (e) => {
    e.preventDefault();
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };
  const handleOnChange2 = (e) => {
    e.preventDefault();
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };
  const handleRegisterClick = () => {
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("btn");
    var element1 = document.getElementById("login_title");
    var element2 = document.getElementById("register_title");
    element1.classList.remove("changecolor");
    element2.classList.add("changecolor");

    x.style.left = "-200%";
    y.style.left = "0";
    z.style.left = "50%";
  };
  const handleLoginClick = () => {
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("btn");
    var element1 = document.getElementById("login_title");
    var element2 = document.getElementById("register_title");
    element1.classList.add("changecolor");
    element2.classList.remove("changecolor");

    x.style.left = "0";
    y.style.left = "100%";
    z.style.left = "0";
  };
  return (
    <>
      <section className="login section">
        <div className="login_container bd-grid">
          <div className="login_img"></div>
          <div className="login_box">
            <div className="login_form">
              <div className="form_titles">
                <div id="btn"></div>
                <a className="changecolor" id="login_title" onClick={handleLoginClick}>
                  LOGIN
                </a>
                <a id="register_title" onClick={handleRegisterClick}>
                  REGISTER
                </a>
              </div>
              <div className="input_group" id="login">
                <input className="input_field" autoComplete="off" type="email" name="email" value={userLogin.email} onChange={(e) => handleOnChange1(e)} placeholder="email"></input>
                <input className="input_field" autoComplete="off" type="password" name="password" value={userLogin.password} onChange={(e) => handleOnChange1(e)} placeholder="Password"></input>
                <button className="button" onClick={login}>
                  Login
                </button>
              </div>
              <div className="input_group" id="register">
                <input className="input_field" type="email" name="email" value={userRegister.email} onChange={(e) => handleOnChange2(e)} placeholder="email"></input>
                <input className="input_field" type="password" name="password" value={userRegister.password} onChange={(e) => handleOnChange2(e)} placeholder="Password"></input>
                <button className="button" onClick={register}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
