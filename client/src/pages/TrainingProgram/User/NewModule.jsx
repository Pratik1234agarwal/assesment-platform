import React, { useState, useEffect } from "react";
import logo1 from "../../../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";
import TestChecking from "./TestChecking";

const NewModule = ({ events }) => {
  let history = useHistory();

  function timed(lp) {
    var date = new Date(lp);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return date.toString().slice(4, 16) + strTime;
  }

  function testCheck(stp) {
    return (
      <>
        <TestChecking {...stp} />
      </>
    );
  }

  function durationCheck(stp) {
    if (!stp.testId) {
      return <>Test Not Available</>;
    } else {
      return <div>Duration : {stp.testId.durationOfTest} mins</div>;
    }
  }

  return (
    <>
      {/* <div className="mt-4 mb-4 container"> */}
      <div className="row mb-5">
        <div className="col-12 order-12 order-lg-0 d-none d-sm-block ">
          {events &&
            events.map((stp, index) => (
              <div>
                <div
                  class="card mt-4   "
                  style={{ border: "2px solid black", borderRadius: "20px" }}
                >
                  <div class="card-body row">
                    <div className="col ">
                      <p class="card-text ">
                        <h5>Quiz No : {index + 1}</h5>
                      </p>
                    </div>
                    <div className="col d-flex justify-content-end">
                      <p class="card-text " style={{ color: "#180D5B" }}>
                        <h6>
                          <i class="fas fa-clock"></i> : {timed(stp.startTime)}
                        </h6>
                      </p>
                    </div>
                    <div
                      className="col d-flex align-items-center justify-content-end"
                      style={{ color: "black" }}
                    >
                      {durationCheck(stp)}
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                      {testCheck(stp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* ----------- For mobile ----------- */}

        <div className="col-12 d-block d-sm-none">
          {events &&
            events.map((stp, index) => (
              <div>
                <div
                  class="card mt-4   "
                  style={{ border: "2px solid black", borderRadius: "20px" }}
                >
                  <div class="card-body row">
                    <div className="col ">
                      <p class="card-text ">
                        <h5>Quiz No : {index + 1}</h5>
                      </p>
                    </div>
                    <div className="col d-flex justify-content-end">
                      <p class="card-text " style={{ color: "#180D5B" }}>
                        <h6>Start Date : {timed(stp.startTime)}</h6>
                      </p>
                    </div>
                  </div>
                  <div className="row mb-3 px-3 ">
                    <div className="col mt-3" style={{ color: "green" }}>
                      {durationCheck(stp)}
                    </div>
                    <div className="col d-flex justify-content-end">
                      {testCheck(stp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default NewModule;
