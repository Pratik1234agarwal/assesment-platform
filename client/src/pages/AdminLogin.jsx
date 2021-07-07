import React, { useState, useEffect } from "react";
import "./AdminLogin.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

import logo1 from "../images/logo.png";
const AdminLogin = () => {
  let history = useHistory();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("Admin")) {
      history.push("/adminroutes");
    } else {
      // history.push("/admin");
    }
  });

  function Login() {
    let item = { username, password };
    console.warn(item);
    axios
      .post("/api/v1/admin/login", item)
      .then((res) => {
        // console.log(res);
        localStorage.setItem("Admin", res.data.data.token);
        alert("Signin Complete");
        history.push("/adminroutes");
      })
      .catch((err) => {
        // console.log(err.response.data.message),
        alert(err.response.data.message);
      });
  }
  return (
    <>
      <div class="sidenav">
        <div class="login-main-text">
          <h1>
            Admin
            <br /> Login Page
          </h1>
          <h5 className="pt-4">Login from here to access.</h5>
        </div>
      </div>
      <div class="main">
        <div class="col-md-6 col-sm-12 mb-5">
          <div class="login-form">
            <img src={logo1} className="mb-3" />
            <div class="form-group">
              <label>User Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="User Name"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
              />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              class="btn btn-black text-white"
              onClick={Login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
