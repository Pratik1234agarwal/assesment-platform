import React, { useState, useEffect } from "react";
import logo1 from "../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import user from "../images/icons/user.png";
import group from "../images/icons/group.png";
import university from "../images/icons/university.png";

const AdminRoutes = () => {
  let history = useHistory();

  const [activeusers, setactiveusers] = useState(0);
  const [testsubmittedcount, settestsubmittedcount] = useState(0);
  const [no, setno] = useState([]);

  const logout = () => {
    localStorage.removeItem("Admin");
    history.push("/admin");
  };

  function result() {
    history.push("/admin1");
  }
  function slotcheck() {
    history.push("/studentslots");
  }
  function registrations() {
    history.push("/A-DSAT_Registration");
  }

  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res1 = await axios.get(
          "/api/v1/admin/registrationStats/active",
          config
        );
        const res = await axios.get("/api/v1/admin/registrationStats", config);
        setno(res.data.data.numberOfUserRegistered);
        console.log(res1);
        console.log(res1.data.data.activeUser);
        setactiveusers(res1.data.data.activeUser);
        settestsubmittedcount(res1.data.data.testSubmitted);
      } catch (err) {
        console.log(err.response.data);
        if (err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        }
      }
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

      <div className="container pt-3">
        <div className="row ">
          <div className="col-12 col-lg-4">
            <div className="adbox1 pt-2 pb-2">
              <div className="row">
                <div className="col">
                  <div className="text-center">
                    <img src={university} />
                  </div>
                </div>
                <div className="col-8">
                  Candidates Giving Test
                  <h5>{activeusers}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="adbox2  pt-2 pb-2">
              <div className="row">
                <div className="col">
                  <div className="text-center">
                    <img src={group} />
                  </div>
                </div>
                <div className="col-8">
                  Total Students
                  <h5>{no}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 ">
            <div className="adbox3  pt-2 pb-2">
              <div className="row">
                <div className="col">
                  <div className="text-center">
                    <img src={user} />
                  </div>
                </div>
                <div className="col-8">
                  Students Submitted Test
                  <h5>{testsubmittedcount}</h5>
                </div>
              </div>
            </div>
          </div>
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

      <div className="container text-center mt-3 mb-4">
        <div className="row">
          <div className="col-12 col-lg-4">
            <div class="card text-center">
              <div class="card-header">Students Outcome</div>
              <div class="card-body">
                <h5 class="card-title">Result</h5>
                <p class="card-text" style={{ fontSize: "17px" }}>
                  Check the results of all the student and also mail them.
                </p>
                <button className="btn btn-danger " onClick={result}>
                  See Result
                </button>
              </div>
              <div class="card-footer text-muted">Admin</div>
            </div>
          </div>
          {/* /////////////////////////////// */}
          <div className="col-12 col-lg-4 mt-4 mt-lg-0 ">
            <div class="card text-center">
              <div class="card-header">Make your own Strategy</div>
              <div class="card-body">
                <h5 class="card-title">Students Slots</h5>
                <p class="card-text" style={{ fontSize: "17px" }}>
                  Check aloted Time Slots and Date to Students
                </p>
                <button className="btn btn-danger " onClick={slotcheck}>
                  Check Slots
                </button>
              </div>
              <div class="card-footer text-muted">Admin</div>
            </div>
          </div>
          {/* /////////////////////////////// */}
          <div className="col-12 col-lg-4 mt-4 mt-lg-0 mb-5 mb-lg-0">
            <div class="card text-center">
              <div class="card-header">Registrations</div>
              <div class="card-body">
                <h5 class="card-title">Total Registrations for A-DSAT</h5>
                <p class="card-text" style={{ fontSize: "17px" }}>
                  Check Registered students information....
                  <br />
                </p>
                <button className="btn btn-danger " onClick={registrations}>
                  Check Registration
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
