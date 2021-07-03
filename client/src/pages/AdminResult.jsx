import React, { useState, useEffect } from "react";
import "./AdminResult.css";
import logo1 from "../images/logo.png";
import user from "../images/icons/user.png";
import group from "../images/icons/group.png";
import university from "../images/icons/university.png";
import check from "../images/icons/check.png";
import AdminResultData from "../Components/AdminResultData";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Tables from "./Tables";

const AdminResult = () => {
  let history = useHistory();
  const [no, setno] = useState([]);

  const [result, setresult] = useState([]);
  const [testname, settestname] = useState("");
  const [activeusers, setactiveusers] = useState(0);
  const [testsubmittedcount, settestsubmittedcount] = useState(0);
  function adminHome() {
    history.push("/adminroutes");
  }
  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get(
          "/api/v1/admin/result/dsat/generateResult",
          config
        );
        const res1 = await axios.get(
          "/api/v1/admin/registrationStats/active",
          config
        );
        const res2 = await axios.get("/api/v1/admin/registrationStats", config);
        console.log(res);
        setresult(res.data.data.results);
        settestname(res.data.data.results[0].testName);
        console.log(res1.data.data.activeUser);
        setactiveusers(res1.data.data.activeUser);
        settestsubmittedcount(res1.data.data.testSubmitted);
        setno(res2.data.data.numberOfUserRegistered);
        // console.log(res.data.data.results);
        console.log(result);

        console.log(result.length);
      } catch (err) {
        console.log(err);
        // console.log(err.response.data.msg);
        if (err.response && err.response.data) alert(err.response.data.message);
      }
      // alert("Signin Complete");
      // history.push("/addingquestions");
    } else {
      history.push("/admin");
    }
  }, []);

  const Sendmail = () => {
    // alert("Result Mail send to students");
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      axios
        .get("/api/v1/admin/result/sendMail", config)
        .then(function (res) {
          console.log(res);
          alert("Reault Mail have been sent to the students");
          console.log("Result Mail send to students");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="container-fluid admn">
        <div className="row ml-3 ">
          <Link to="/adminroutes">
            <img src={logo1} />
          </Link>
        </div>
      </div>

      <div className="container-fluid mt-4">
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

      <div className="container text-center pt-4">
        <h3 className="pt-2">Students Result</h3>
        <div className="text-center mt-3 mb-4">
          <button className="btn btn-danger" onClick={Sendmail}>
            Send Mail To All
          </button>
        </div>
        {/* <div className="row mt-4 ">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Student Name</th>
                <th scope="col">Test Name</th>
                <th scope="col">Email</th>
                <th scope="col">Marks</th>
                <th scope="col">Total Questions</th>
                <th scope="col">Correct</th>
                <th scope="col">InCorrect</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <AdminResultData result={result} />
          </table>
        </div> */}
        {/* <div className="row mt-4">
          <div className="col-2"></div>
          <div className="col"> */}
        <Tables />
        {/* </div>
          <div className="row-2"></div>
        </div> */}
      </div>

      <div className="container text-center mt-5 mb-5">
        <button className="btn btn-danger" onClick={adminHome}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default AdminResult;
