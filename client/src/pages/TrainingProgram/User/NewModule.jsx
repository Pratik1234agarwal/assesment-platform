import React, { useState, useEffect } from "react";
import logo1 from "../../../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";
import TestChecking from "./TestChecking";

const NewModule = ({ id }) => {
  let history = useHistory();
  const [events, setevents] = useState([]);

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
    // let testid = stp.testId._id;
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

  function testChecko(x, stp) {
    let testid = stp.testId._id;
    <TestChecking testid />;
    if (x == 1) {
      return (
        <>
          <button
            className="btn btn-info mt-3"
            onClick={() => {
              // if (
              //   new Date(stp.startTime) <= Date.now() &&
              //   new Date(stp.endTime) >= Date.now()
              // ) {
              //   console.log(new Date(stp.startTime));
              //   console.log(Date.now());
              if (!stp.testId) {
              } else {
                history.push("/testinstructions/" + stp.testId._id);
              }
              // } else {
              //   console.log("not available");
              //   console.log(new Date(stp.startTime).getTime());
              //   console.log(new Date(stp.startTime) <= Date.now());
              //   console.log(new Date(stp.endTime) >= Date.now());
              //   swal(
              //     {
              //       title: "Test is not available",
              //       text: "Give test on mentioned date & time only",
              //       type: "error",
              //       confirmButtonColor: "#0E3B7D",
              //       confirmButtonText: "Ok",
              //       closeOnConfirm: TextTrackCue,
              //       customClass: "Custom_Cancel",
              //     },
              //     function (isConfirm) {
              //       if (isConfirm) {
              //       } else {
              //       }
              //     }
              //   );
              // }
            }}
          >
            Start Test
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            className="btn btn-danger mt-3 ml-3"
            onClick={() => {
              if (!stp.testId) {
              } else {
                history.push("/testresult/" + stp.testId._id);
              }
            }}
          >
            View Result
          </button>
        </>
      );
    }
  }

  useEffect(async () => {
    // console.log(id);
    if (localStorage.getItem("studtoken")) {
      const config = {
        headers: {
          Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
        },
      };
      try {
        const res = await axios.get("/api/v1/test/subtopics/" + id, config);
        console.log(res);
        setevents(res.data.data.subtopic.events);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/studentsignup");
    }
  }, []);

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
                        {/* <h6>End Date : {timed(stp.endTime)}</h6> */}
                      </p>
                    </div>
                    <div
                      className="col d-flex align-items-center justify-content-end"
                      style={{ color: "black" }}
                    >
                      {/* <i
                        class="fa fa-check-circle fa-2x"
                        aria-hidden="true"
                      ></i> */}
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
                        {/* <h6>End Date : {timed(stp.endTime)}</h6> */}
                      </p>
                    </div>
                  </div>
                  <div className="row mb-3 px-3 ">
                    <div className="col mt-3" style={{ color: "green" }}>
                      {/* <i
                        class="fa fa-check-circle fa-2x mt-3"
                        aria-hidden="true"
                      ></i> */}

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
