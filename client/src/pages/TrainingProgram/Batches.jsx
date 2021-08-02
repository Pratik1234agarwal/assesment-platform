import React, { useState, useEffect } from "react";
import logo1 from "../../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import TestDetails from "./TestDetails";

const Batches = (props) => {
  let history = useHistory();
  const [events, setevents] = useState([]);
  const [batch, setbatch] = useState([]);
  const [eventid, seteventid] = useState("");
  const [testName, settestName] = useState("");
  const [marksPerQuestion, setmarksPerQuestion] = useState("");
  const [numberOfQuestions, setnumberOfQuestions] = useState("");
  const [negativeMarksPerQuestion, setnegativeMarksPerQuestion] = useState("");

  const eventtest = (event, id, testid) => {
    if (event == "test") {
      if (testid != null) {
        return (
          <button
            className="btn btn-success"
            onClick={() => {
              history.push("/testdetails/" + testid);
            }}
          >
            Show Details
          </button>
        );
      } else {
        return (
          <>
            <button
              className="btn btn-danger"
              data-toggle="modal"
              data-target="#ModalCenter"
              onClick={() => {
                console.log(id);
                seteventid(id);
                console.log("event id set", eventid);
              }}
            >
              Add Test Details
            </button>
          </>
        );
      }
    } else if (event == "readingMaterial") {
      return (
        <button
          className="btn btn-primary text-white"
          // onClick={() => {
          //   history.push("/testdetails/" + testid);
          // }}
        >
          Upload
        </button>
      );
    } else if (event == "assignment") {
      return (
        <button
          className="btn btn-dark text-white"
          // onClick={() => {
          //   history.push("/testdetails/" + testid);
          // }}
        >
          Upload
        </button>
      );
    }
  };

  // const testadd = (id) => {
  //   alert(id);
  //   console.log(id);
  // };

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 6)
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 30), 6)
  );
  const [eventType, seteventType] = useState("");

  const timed = (lp) => {
    var utcDate = new Date(lp);

    // console.log(utcDate.toUTCString());
    return utcDate.toString().slice(0, 21);
  };

  const getalltestdetails = async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get("/api/v1/admin/test/", config);
        console.log(res.data.data.test);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/admin");
    }
  };

  const AddTestDetails = async (event) => {
    if (event) {
      event.preventDefault();
    }
    let data = {
      testName,
      numberOfQuestions,
      marksPerQuestion,
      negativeMarksPerQuestion,
    };
    console.log(data);

    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.post(
          "/api/v1/admin/test/create/" + eventid,
          data,
          config
        );
        console.log(res);
        console.log(eventid);
        swal(
          {
            title: "Test Details Added",
            text: "Successfully Added all test details",
            type: "success",
            confirmButtonColor: "#0E3B7D",
            confirmButtonText: "Ok",
            closeOnConfirm: false,
            customClass: "Custom_Cancel",
          },
          function (isConfirm) {
            if (isConfirm) {
              window.location.reload();
            } else {
              window.location.reload();
            }
          }
        );
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/admin");
    }
  };

  const AddEvent = async (event) => {
    if (event) {
      event.preventDefault();
    }

    // console.log(startDate.getTime());
    // console.log(endDate.getTime());

    // var eventStart = new Date(startDate);
    // let Sdate = JSON.stringify(eventStart);
    // Sdate = Sdate.slice(1, 11);

    // var eventEnd = new Date(endDate);
    // let Edate = JSON.stringify(eventEnd);
    // Edate = Edate.slice(1, 11);

    let data = {
      type: eventType,
      startTime: startDate.getTime(),
      endTime: endDate.getTime(),
    };
    console.log(data);

    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.post(
          "/api/v1/admin/course/event/" + props.match.params._id,
          data,
          config
        );
        console.log(res);
        swal(
          {
            title: "Event Added",
            text: "Successfully Added An Event",
            type: "success",
            confirmButtonColor: "#0E3B7D",
            confirmButtonText: "Ok",
            closeOnConfirm: false,
            customClass: "Custom_Cancel",
          },
          function (isConfirm) {
            if (isConfirm) {
              window.location.reload();
            } else {
              window.location.reload();
            }
          }
        );
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/admin");
    }
  };

  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get(
          "/api/v1/admin/course/batch/" + props.match.params._id,
          config
        );
        setbatch(res.data.data.batch);
        setevents(res.data.data.batch.events);
        console.log(res);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/admin");
    }
  }, []);

  return (
    <>
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Add Event
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={AddEvent}>
                <div class="form-group">
                  <label for="eventType">Event Type :</label>
                  <select
                    class="form-control"
                    id="quescat"
                    value={eventType}
                    onChange={(e) => seteventType(e.target.value)}
                    required
                  >
                    <option selected>Choose...</option>
                    <option value="test">test</option>
                    <option value="assignment">assignment</option>
                    <option value="liveClass">liveClass</option>
                    <option value="readingMaterial">readingMaterial</option>
                  </select>
                </div>
                <div class="form-group">
                  Start Date :{" "}
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </div>
                <div class="form-group">
                  End Date :{" "}
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary ml-3">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="ModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Test Details
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={AddTestDetails}>
                <div class="form-group">
                  <label for="testName">Test Name :</label>
                  <input
                    class="form-control"
                    id="testName"
                    value={testName}
                    onChange={(e) => settestName(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="marksPerQuestion">Marks Per Question :</label>
                  <input
                    class="form-control"
                    id="marksPerQuestion"
                    value={marksPerQuestion}
                    onChange={(e) => setmarksPerQuestion(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="numberOfQuestions">Number of Question :</label>
                  <input
                    class="form-control"
                    id="numberOfQuestions"
                    value={numberOfQuestions}
                    onChange={(e) => setnumberOfQuestions(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="negativeMarksPerQuestion">
                    Negative Marks Per Question :
                  </label>
                  <input
                    class="form-control"
                    id="negativeMarksPerQuestion"
                    value={negativeMarksPerQuestion}
                    onChange={(e) =>
                      setnegativeMarksPerQuestion(e.target.value)
                    }
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary ml-3">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <div className="container bg-dark text-white text-center mt-3 rounded py-2">
        <h3>Total No. of Students :{batch && batch.maxNumberOfStudent}</h3>
      </div>

      <div className="mt-4 text-center">
        <h3>Events</h3>
      </div>

      {/* <div className="mt-4 text-center">
        <button className="btn btn-danger" onClick={getalltestdetails}>
          All Test
        </button>
      </div> */}

      <div className="container-fluid mb-4">
        <div className="row d-flex justify-content-center">
          <div
            class="card text-center ml-0 ml-lg-4 mt-4 shadow rounded-lg border-0 px-4"
            //   style={{
            //     border: "2px solid red",
            //     borderRadius: "15px",
            //   }}
          >
            <div class="card-body mt-4 mb-4">
              <h5 class="card-title">Adding Events </h5>
              <h6 class="card-subtitle mb-2 text-muted pt-3">L2 - Program</h6>
              <button
                type="button"
                class="btn btn-danger mt-2"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Add Event
              </button>
            </div>
          </div>
          {events &&
            events.map((stp, index) => (
              <div
                class="card text-center ml-0 ml-lg-4 mt-4 shadow rounded-lg border-0"
                //   style={{
                //     border: "2px solid red",
                //     borderRadius: "15px",
                //   }}
              >
                <div class="card-body mt-4 mb-4">
                  <h5 class="card-title">Event No. : {index + 1}</h5>
                  <h5 class="card-subtitle mb-2 text-danger text-capitalize">
                    {stp.eventType}
                  </h5>
                  {/* {stp.testId} */}
                  <h6 class="card-subtitle mb-2 text-muted">L2 - Program</h6>
                  <p class="card-text">
                    <h6>Start Date : {timed(stp.startTime)}</h6>
                    <h6>End Date : {timed(stp.endTime)}</h6>
                  </p>
                  {eventtest(stp.eventType, stp._id, stp.testId)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Batches;
