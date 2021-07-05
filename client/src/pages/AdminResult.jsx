import React, { useState, useEffect } from "react";
import "./AdminResult.css";
import logo1 from "../images/logo.png";
import AdminResultData from "../Components/AdminResultData";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Tables from "./Tables";
import AdminBoxes from "./AdminBoxes";

const AdminResult = () => {
  let history = useHistory();

  const [result, setresult] = useState([]);
  const [testname, settestname] = useState("");
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
        // console.log(res);
        setresult(res.data.data.results);
        settestname(res.data.data.results[0].testName);
        // console.log(res.data.data.results);
        // console.log(result);

        // console.log(result.length);
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
          // console.log(res);
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

      <AdminBoxes />

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
