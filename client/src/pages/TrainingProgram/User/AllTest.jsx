import React, { useState, useEffect } from "react";
import logo1 from "../../../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AllTest = () => {
  let history = useHistory();
  const [test, settest] = useState([]);

  useEffect(async () => {
    if (localStorage.getItem("studtoken")) {
      const config = {
        headers: {
          Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
        },
      };
      try {
        const res = await axios.get("/api/v1/test", config);
        settest(res.data.data.tests);
        console.log(res);
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
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <div className="container text-center mt-5">
        <h3>Daily Test / Weekly Test</h3>
      </div>

      <div className="container-fluid mb-4 mt-4">
        <div className="row d-flex justify-content-center">
          {test &&
            test.map((stp, index) => (
              <div
                class="card text-center ml-0 ml-lg-4 mt-4 shadow rounded-lg border-0"
                //   style={{
                //     border: "2px solid red",
                //     borderRadius: "15px",
                //   }}
              >
                <div class="card-body mt-4 mb-4">
                  <h5 class="card-title">Test Name : {stp.testName}</h5>
                  <h6 class="card-subtitle mb-2 text-muted pt-2">
                    L2 - Program
                  </h6>
                  {/* <p class="card-text">
                    <h6>Number of Students :{stp.maxNumberOfStudent}</h6>
                  </p> */}
                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => {
                      history.push("/testinstructions/" + stp._id);
                    }}
                  >
                    Start Test
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AllTest;
