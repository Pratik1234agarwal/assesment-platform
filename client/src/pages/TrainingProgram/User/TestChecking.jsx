import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";

const TestChecking = (stp) => {
  let history = useHistory();

  const [testgiven, settestgiven] = useState(0);
  console.log("testid");

  async function testc(id) {
    if (localStorage.getItem("studtoken")) {
      const config = {
        headers: {
          Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
        },
      };
      try {
        const res = await axios.get("/api/v1/test/result/" + id, config);
        console.log(res.data);
        console.log(res);
        settestgiven(1);
      } catch (err) {
        // console.log(err);
        // alert("Test Is Not attempted");
        // return false;
      }
    } else {
      history.push("/");
    }
  }

  function los(stp) {
    if (!stp.testId) {
      return <>Test Not Available</>;
    } else {
      console.log(stp.testId);
      // testc(stp.testId);
      // if (testgiven == 0) {
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
                history.push("/testinstructions/" + stp.testId);
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
      // } else {
      //   return (
      //     <button
      //       className="btn btn-danger mt-3 ml-3"
      //       onClick={() => {
      //         if (!stp.testId) {
      //         } else {
      //           history.push("/testresult/" + stp.testId._id);
      //         }
      //       }}
      //     >
      //       View Result
      //     </button>
      //   );
      // }
    }
  }
  console.log("testid");

  return <>{los(stp)}</>;
};

export default TestChecking;
