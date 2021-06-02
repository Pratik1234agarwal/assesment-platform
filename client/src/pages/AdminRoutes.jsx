import React, { useState, useEffect } from "react";
import logo1 from "../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AdminRoutes = () => {
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem("Admin");
    history.push("/admin");
  };

  function result() {
    history.push("/admin1");
  }
  function setquestionpaper() {
    history.push("/settest");
  }

  useEffect(() => {
    if (localStorage.getItem("Admin")) {
      // history.push("/Instdsat");
    } else {
      history.push("/admin");
    }
  });

  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <div className="container mt-3 text-white">
        <button
          className="btn float-right"
          style={{ backgroundColor: "#0E3B7D", color: "white" }}
          onClick={logout}
        >
          Log Out
        </button>
      </div>

      <div className="text-center pt-5">
        <h1> Welcome to Admin Panel</h1>
        {/* <h5>Choose the option</h5> */}
      </div>

      <div className="container text-center mt-5">
        <div className="row">
          <div className="col">
            <div class="card text-center">
              <div class="card-header">Students Outcome</div>
              <div class="card-body">
                <h5 class="card-title">Result Of All Tests</h5>
                <p class="card-text" style={{ fontSize: "17px" }}>
                  Check the results of all the student and also see the
                  reportcard of a person and mail them.
                </p>
                <button className="btn btn-danger " onClick={result}>
                  See Result
                </button>
              </div>
              <div class="card-footer text-muted">Admin</div>
            </div>
          </div>
          <div className="col">
            <div class="card text-center">
              <div class="card-header">Make your own Strategy</div>
              <div class="card-body">
                <h5 class="card-title">Create Test</h5>
                <p class="card-text" style={{ fontSize: "17px" }}>
                  Create your own test and add questions etc... <br />
                  fill the required details
                </p>
                <button className="btn btn-danger " onClick={setquestionpaper}>
                  Add New Test
                </button>
              </div>
              <div class="card-footer text-muted">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRoutes;
