import React, { useEffect, useState } from "react";
import "./Admin1.css";
import logo1 from "../images/logo.png";
import user from "../images/icons/user.png";
import group from "../images/icons/group.png";
import university from "../images/icons/university.png";
import check from "../images/icons/check.png";
import AdminData from "../Components/AdminData";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Admin1 = () => {
  let history = useHistory();

  const [result, setresult] = useState([]);
  const [testname, settestname] = useState("");
  const [activeusers, setactiveusers] = useState(0);
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
        console.log(res);
        console.log(res1);
        console.log(res1.data.data.activeUser);
        setactiveusers(res1.data.data.activeUser);
        settestname(res.data.data.results[0].testName);
        setresult(res.data.data.results);
        console.log(res.data.data.results);
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
                  <h5>{result.length}</h5>
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
                  <h5>{result.length}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 pt-4">
        <div className="row  pt-2">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Test</th>
                <th scope="col">Total Students</th>
              </tr>
            </thead>
            <AdminData resultlen={result.length} testname="A-DSAT" />
          </table>

          {/* <div className="col">
            <h6>Test</h6>
          </div>
          <div className="col text-right">
            <h6>Total Students</h6>
          </div> */}
        </div>
      </div>

      <div className="container text-center mt-5 mb-5">
        <button className="btn btn-danger" onClick={adminHome}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default Admin1;
