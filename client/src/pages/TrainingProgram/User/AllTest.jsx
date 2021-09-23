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

  const [username, setusername] = useState([]);

  const [subtopicname, setsubtopicname] = useState([]);
  const [result, setresult] = useState([]);

  function SubEvent(events) {
    console.log("hey");
    return (
      <>
        <NewModule events={events} result={result} />
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
          const res1 = await axios.get("/api/v1/test/resultAll", config);
          console.log(res);
          console.log(res1);
          setsubtopicname(res.data.data.subtopics);
          setresult(res1.data.data.paper);
          // console.log(res1.data.data.paper);
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
              <div className=" text-right ">
                <i class="fas fa-arrow-circle-left fa-3x"></i>
                <div
                  onClick={() => {
                    history.push("/studentdashboard");
                  }}
                  className="mr-2"
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Back
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <h4 className="pt-3">Modulewise Quizes</h4>
        </div>
      </div>

      <div className="d-none d-sm-block">
        <div className="row pt-2 container-fluid">
          <div className="col-4">
            <img src={logo1} />
          </div>
          <div className="col-4 text-center">
            <h4 className="pt-3 pl-5">Modulewise Quizes</h4>
          </div>
          <div className="col float-right">
            <div className="row pt-2">
              <div className="col text-right ">
                <i class="fas fa-arrow-circle-left fa-3x"></i>
                <div
                  onClick={() => {
                    history.push("/studentdashboard");
                  }}
                  className="mr-2"
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Back
                </div>
              </div>
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

      <div className="pt-3 container">
        <div className="row">
          <div className="col">
            All Modules {"("}
            {subtopicname && subtopicname.length}
            {")"}
          </div>
        </div>
      </div>

      <div className="pt-3 pb-4 mb-5 rounded bg-white container ">
        {subtopicname &&
          subtopicname.map((stp, index) => (
            <Faq
              data={{
                title: "",
                rows: [
                  {
                    title: "Module " + (index + 1) + " : " + stp.name,
                    content: <>{SubEvent(stp.events)}</>,
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
