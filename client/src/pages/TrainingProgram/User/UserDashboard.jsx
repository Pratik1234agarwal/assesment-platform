import React from "react";
import logo1 from "../../../images/logo.png";
import { useHistory } from "react-router-dom";

const UserDashboard = () => {
  let history = useHistory();
  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <div className="container mt-3">
        <h3>Student Portal</h3>
      </div>
      <div className="container mt-3 px-5 text-center">
        <div class="card mt-4 shadow border-0">
          <div class="card-body">
            <h6>Student Dashboard</h6>
          </div>
        </div>
      </div>

      <div className="container mt-5 px-5">
        <div className="row text-center">
          <div className="col">
            <div class="card shadow border-0">
              <div class="card-body">
                <h5 class="card-title">Live Class</h5>
                This is some text within a card body.
                <br />
                <button className="btn btn-danger mt-3">Check</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card shadow border-0">
              <div class="card-body">
                <h5 class="card-title">Quiz</h5>
                This is some text within a card body.
                <br />
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => {
                    history.push("/alltest");
                  }}
                >
                  Check
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 px-5 mb-5">
        <div className="row text-center">
          <div className="col">
            <div class="card shadow border-0">
              <div class="card-body">
                <h5 class="card-title">Assignment</h5>
                This is some text within a card body.
                <br />
                <button className="btn btn-danger mt-3">Check</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card shadow border-0">
              <div class="card-body">
                <h5 class="card-title">Reading Material</h5>
                This is some text within a card body.
                <br />
                <button className="btn btn-danger mt-3">Check</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
