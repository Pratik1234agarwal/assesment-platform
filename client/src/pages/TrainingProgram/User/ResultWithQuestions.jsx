import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo1 from "../../../images/logo.png";
import axios from "axios";

const ResultWithQuestions = (props) => {
  let history = useHistory();
  const [questionResponses, setquestionResponses] = useState([]);
  const [test, settest] = useState([]);

  useEffect(async () => {
    if (localStorage.getItem("studtoken")) {
      const config = {
        headers: {
          Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
        },
      };
      try {
        const res = await axios.get(
          "/api/v1/test/result/" + props.match.params.id,
          config
        );
        console.log(res.data);
        console.log(res);

        console.log(res.data.data.questionResponses);
        setquestionResponses(res.data.data.questionResponses);
        settest(res.data.data.test);
      } catch (err) {
        // console.log(err);
        alert("Test Is Not attempted");
      }
    } else {
      history.push("/");
    }
  }, []);

  return (
    <>
      <div className="container-fluid">
        {/* For Mobile */}
        <div className="d-block d-sm-none">
          <div className="row pt-2">
            <div className="col">
              <img src={logo1} />
            </div>
            <div className="col text-right">
              <div className=" pt-2">
                <i class="fas fa-arrow-circle-left fa-2x"></i>
                <div className=" text-right pt-2"> {}</div>
                <div
                  onClick={() => {
                    history.push("/alltest");
                  }}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Back
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-none d-sm-block">
          <div className="row pt-2 container-fluid">
            <div className="col-4">
              <img src={logo1} />
            </div>
            <div className="col-4 text-center">
              <h3 className="text-capitalize pt-3 pl-5 ">
                {test && test.testName} Result <br />
              </h3>
            </div>
            <div className="col float-right">
              <div className="row pt-2">
                <div className="col text-right pt-2"> {}</div>
                <div className="col-2 text-right">
                  <i class="fas fa-arrow-circle-left fa-2x"></i>
                  {/* <i class="fas fa-home fa-2x"></i> */}
                  <div
                    onClick={() => {
                      history.push("/alltest");
                    }}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Back
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container ">
          <h3 className="text-capitalize d-block d-sm-none">
            {test && test.testName} Result <br />
          </h3>
          <h5 className="pt-3">
            Questions with correct answer and the answer you marked............
          </h5>
        </div>
        <div className="container mb-5">
          {questionResponses &&
            questionResponses.map((stp, index) => (
              <div>
                <div
                  class="card mt-4  px-3 py-4 "
                  style={{ border: "2px solid black", borderRadius: "20px" }}
                >
                  <b className="h5">
                    Q{index + 1}: <pre>{stp.text}</pre>
                  </b>
                  <div className="p-2">
                    A : {stp.A.text} <br />B : {stp.B.text} <br />C :{" "}
                    {stp.C.text} <br />D : {stp.D.text} <br />
                    <h6 className="text-success mt-3">
                      Correct Answer : {stp.answer}
                    </h6>
                    <h6 className="text-danger">
                      Your Marked Answer : {stp.answeredByUser}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ResultWithQuestions;
