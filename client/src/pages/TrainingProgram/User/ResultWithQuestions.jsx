import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
      <div className="container mt-3">
        <h3 className="text-capitalize">
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
                <b>
                  Q{index + 1}: {stp.text}
                </b>
                <div className="p-2">
                  A : {stp.A.text} <br />B : {stp.B.text} <br />C : {stp.C.text}{" "}
                  <br />D : {stp.D.text} <br />
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
    </>
  );
};

export default ResultWithQuestions;
