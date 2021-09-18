import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";

const TestChecking = (props) => {
  let history = useHistory();

  const [testgiven, settestgiven] = useState(0);
  console.log("testid");
  console.log(props.result);

  useEffect(() => {
    console.log("In useffect of checking", props.result);
    {
      props.result &&
        props.result.map((reslt, index) => (
          <div>
            {reslt._id}
            <p>{reslt.marks}</p>
            {pos(reslt.test)}
          </div>
        ));
    }
    function pos(res) {
      if (!props.stp.testId) {
      } else {
        console.log(res);
        if (props.stp.testId._id === res) {
          settestgiven(1);
        } else {
        }
      }
    }
  });

  function los(stp) {
    if (!stp.testId) {
      return <>Test Not Available</>;
    } else {
      console.log(stp.testId);
      if (testgiven == 0) {
        return (
          <button
            className="btn btn-info mt-3"
            onClick={() => {
              if (
                new Date(stp.startTime) <= Date.now() &&
                new Date(stp.endTime) >= Date.now()
              ) {
                console.log(new Date(stp.startTime));
                console.log(Date.now());
                if (!stp.testId) {
                } else {
                  history.push("/testinstructions/" + stp.testId._id);
                }
              } else {
                console.log("not available");
                console.log(new Date(stp.startTime).getTime());
                console.log(new Date(stp.startTime) <= Date.now());
                console.log(new Date(stp.endTime) >= Date.now());
                swal(
                  {
                    title: "Test is not available",
                    text: "Give test on mentioned date & time only",
                    type: "error",
                    confirmButtonColor: "#0E3B7D",
                    confirmButtonText: "Ok",
                    closeOnConfirm: TextTrackCue,
                    customClass: "Custom_Cancel",
                  },
                  function (isConfirm) {
                    if (isConfirm) {
                    } else {
                    }
                  }
                );
              }
            }}
          >
            Start Test
          </button>
        );
      } else {
        return (
          <i class="fas fa-check-circle fa-2x" style={{ color: "green" }}></i>
          // <button
          //   className="btn btn-danger mt-3 ml-3"
          //   onClick={() => {
          //     if (!stp.testId) {
          //     } else {
          //       history.push("/testresult/" + stp.testId._id);
          //     }
          //   }}
          // >
          //   View Result
          // </button>
        );
      }
    }
  }
  console.log("testid");

  return <>{los(props.stp)}</>;
};

export default TestChecking;
