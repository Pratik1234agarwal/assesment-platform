import React, { useState, useEffect } from "react";
import logo1 from "../../../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import l2prog from "../../../images/l2prog.jpg";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";
import "./AllTest.css";
import Avatar from "react-avatar";
import Faq from "react-faq-component";
import NewModule from "./NewModule";

const AllTest = () => {
  let history = useHistory();
  const [events, setevents] = useState([]);

  function SubEvent(id) {
    console.log("hey");
    return (
      <>
        <NewModule id={id} />
      </>
    );
  }

  const styles1 = {
    // bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "black",
    rowContentColor: "#182d78",
    arrowColor: "black",
    rowContentPaddingLeft: "5px",
  };

  const styles = {
    // bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "black",
    rowContentColor: "#33827f",
    arrowColor: "black",
  };

  const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true,
  };

  const [test, settest] = useState([]);
  const [username, setusername] = useState([]);

  const [subtopicname, setsubtopicname] = useState([]);
  const [subtopic, setsubtopic] = useState("");

  function userHome() {
    history.push("/userdashboard");
  }

  const badage = (index) => {
    if (index == 0) {
      return <div class="position-absolute badge badge-danger m-2">New</div>;
    }
  };

  const getExpirationDate = (jwtToken) => {
    if (!jwtToken) {
      return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split(".")[1]));

    // multiply by 1000 to convert seconds into milliseconds
    const expdatetime = new Date(jwt && jwt.exp && jwt.exp * 1000);
    const time = new Date(expdatetime).toLocaleTimeString("en", {
      timeStyle: "short",
      hour12: true,
      timeZone: "IST",
    });

    return expdatetime || null;
  };

  const isExpired = (exp) => {
    if (!exp) {
      return false;
    }

    return Date.now() > exp;
  };

  const logout = () => {
    localStorage.removeItem("studtoken");
    history.push("/");
  };

  useEffect(async () => {
    if (localStorage.getItem("studtoken")) {
      const exp = isExpired(
        getExpirationDate(localStorage.getItem("studtoken"))
      );
      console.log(exp);
      if (exp == true) {
        swal(
          {
            title: "Session Expired",
            text: "Please Login again !!",
            type: "warning",
            confirmButtonColor: "#0E3B7D",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            customClass: "Custom_Cancel",
          },
          function (isConfirm) {
            if (isConfirm) {
              logout();
            } else {
            }
          }
        );
      } else {
        profile();
        const config = {
          headers: {
            Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
          },
        };
        try {
          const res = await axios.get("/api/v1/test/subtopics", config);
          console.log(res);
          setsubtopicname(res.data.data.subtopics);
        } catch (err) {
          if (err.response && err.response.data) {
            alert(err.response.data.message);
          }
        }
      }
    } else {
      history.push("/");
    }
  }, []);

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

  const timedline = (lp) => {
    var utcDate = new Date(lp);

    console.log(utcDate.toString());
    return utcDate.toString().slice(4, 16);
  };

  function profile() {
    axios
      .get("/api/v1/auth", {
        headers: {
          Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
        },
      })
      .then((res) => {
        setusername(res.data.data.user.name);
        console.log(res);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div className="d-block d-sm-none">
        <div className="row pt-2">
          <div className="col">
            <img src={logo1} />
          </div>
          <div className="col text-right">
            <div className=" pt-2">
              <i class="text-right fas fa-user-circle fa-3x"></i>
              <div className=" text-right pt-2"> {username}</div>
              <div
                onClick={logout}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <h4 className="pt-3">Student Dashboard</h4>
        </div>
      </div>

      <div className="d-none d-sm-block">
        <div className="row pt-2 container-fluid">
          <div className="col-4">
            <img src={logo1} />
          </div>
          <div className="col-4 text-center">
            <h4 className="pt-3 pl-5">Student Dashboard</h4>
            {/* <Cameraweb /> */}
          </div>
          <div className="col float-right">
            <div className="row pt-2">
              <div className="col text-right pt-2"> {username}</div>
              <div className="col-2 text-right">
                <i class="fas fa-user-circle fa-3x"></i>
                <div
                  onClick={logout}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <div
          class="card w-100"
          style={{
            backgroundColor: "#180D5B",
            color: "white",
            border: "2px solid #180D5B",
            borderRadius: "10px",
          }}
        >
          <div class="card-body">
            <div className="row">
              <div className="col d-flex align-items-center">
                <h3>L-2 Program (Data Science & Artificial Intelligence)</h3>
              </div>
              <div className="col d-flex justify-content-end">
                <img
                  src={l2prog}
                  alt="program Image"
                  height="190px"
                  width="290px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pt-3 container"
        // data-toggle="tooltip"
        // title="Hooray!"
        // data-placement="right"
      >
        <div className="row">
          <div className="col">
            All Modules {"("}
            {subtopicname && subtopicname.length}
            {")"}
          </div>
        </div>
      </div>

      {/* <div className="container-fluid d-none d-sm-block pb-5 ">
        <div className="pt-3 container">
          All Modules {"("}
          {subtopicname && subtopicname.length}
          {")"}
        </div>
        <div className="row d-flex justify-content-center">
          {subtopicname &&
            subtopicname.map((stp, index) => (
              <>
                <div
                  class="card mt-4  shadow  w-25 m-2"
                  style={{
                    border: "2px solid white",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    history.push("/moduletest/" + stp._id);
                  }}
                >
                  <div class="position-absolute badge badge-secondary  px-2 m-2">
                    Module - {index + 1}
                  </div>
                  <div class="card-body ">
                    <br />
                    <h5
                      class="card-title bg-primary  text-white px-2 py-2"
                      style={{ border: "2px solid ", borderRadius: "20px" }}
                    >
                      {stp.name}
                    </h5>

                    <h6 class="card-text px-2 mb-3 text-danger">
                      0/{stp.events.length} Test Completed
                    </h6>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div> */}

      {/* for mobile */}

      {/* <div className="container-fluid d-block d-sm-none mb-5">
        <div className="row d-flex justify-content-center">
          {subtopicname &&
            subtopicname.map((stp, index) => (
              <div
                class="card mt-4  shadow w-100 m-2"
                style={{
                  border: "2px solid white",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  history.push("/ModulesTest/" + stp._id);
                }}
              >
                <div class="position-absolute badge badge-secondary  px-2 m-2">
                  Module - {index + 1}
                </div>
                <div class="card-body ">
                  <br />
                  <h5
                    class="card-title bg-primary  text-white px-2 py-2"
                    style={{ border: "2px solid ", borderRadius: "20px" }}
                  >
                    {stp.name}
                  </h5>

                  <h6 class="card-text px-2 mb-3 text-danger">
                    Test Added : {stp.events.length}
                  </h6>
                </div>
              </div>
            ))}
        </div>
      </div> */}

      <div className="pt-3 pb-4 mb-5 rounded bg-white container ">
        {subtopicname &&
          subtopicname.map((stp, index) => (
            <Faq
              data={{
                title: "",
                rows: [
                  {
                    title: "Module " + (index + 1) + " : " + stp.name,
                    content: (
                      <>
                        {/* {stp._id} */}
                        {SubEvent(stp._id)}
                      </>
                    ),
                  },
                ],
              }}
              styles={styles1}
              config={config}
            />
          ))}
      </div>
    </>
  );
};

export default AllTest;
