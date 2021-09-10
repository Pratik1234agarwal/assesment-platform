import React, { useState, useEffect } from "react";
import logo1 from "../../images/logo.png";
import l2prog from "../../images/l2prog.jpg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";

// const batch = [
//   { Students: "50" },
//   { Students: "40" },
//   { Students: "30" },
//   { Students: "20" },
//   { Students: "20" },
//   { Students: "40" },
//   { Students: "30" },
//   { Students: "20" },
// ];

const CreateBatch = () => {
  let history = useHistory();
  const [studno, setstudno] = useState("");
  const [batch, setbatch] = useState([]);
  const [flag, setflag] = useState(1);

  useEffect(async () => {
    setflag(0);
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get("/api/v1/admin/course/batch", config);
        setbatch(res.data.data.batches);
        console.log(res);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/admin");
    }
  }, [flag]);

  const NewBatch = async () => {
    let postData = {
      maxStudent: studno,
      // totalNumberOfStudents: studno,
    };
    console.log(postData);
    if (localStorage.getItem("Admin")) {
      // const config = {
      //   headers: {
      //     Authorization: `Admin ${localStorage.getItem("Admin")}`,
      //   },
      // };
      try {
        const resp = await axios.post("/api/v1/admin/course/batch", postData, {
          headers: {
            Authorization: `Admin ${localStorage.getItem("Admin")}`,
          },
        });
        console.log(resp.data);
        swal(
          {
            title: "Batch created Succesfully",
            text: "Successfully created new batch",
            type: "success",
            confirmButtonColor: "#0E3B7D",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            customClass: "Custom_Cancel",
          },
          function (isConfirm) {
            if (isConfirm) {
              // window.location.reload();
            } else {
              // window.location.reload();
            }
          }
        );
        setflag("");
      } catch (err) {
        console.log(err.response.data.msg);
        if (err.response && err.response.data) {
          console.log(err.response.data);
        }
      }
    } else {
      history.push("/admin");
    }
  };

  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <div className="container mt-3">
        <div
          class="card w-100"
          style={{ backgroundColor: "#180D5B", color: "white" }}
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

      <div>
        <div className="container mt-4 text-center">
          <div class="card  border-0" style={{ width: "auto" }}>
            <div className="row">
              <div className="col">
                <div class="card shadow border-0">
                  <div class="card-body">
                    <h5 class="card-title mb-4">Create New Batch</h5>
                    {/* <h6 class="card-subtitle mb-2 text-muted pt-3 pb-3">
                Students Left :
              </h6> */}
                    Enter No. of Students for new Batch :
                    <div className="d-flex justify-content-center mt-3">
                      <input
                        type="number"
                        style={{
                          width: "73px",
                          border: "2px solid red",
                          borderRadius: "15px",
                        }}
                        class="form-control"
                        placeholder="No."
                        onChange={(e) => setstudno(e.target.value)}
                      />
                    </div>
                    <button className="mt-4 btn btn-primary" onClick={NewBatch}>
                      Create Batch
                    </button>
                  </div>
                </div>
              </div>
              <div className="col">
                {batch &&
                  batch.map((stp, index) => (
                    <div
                      class="card text-center ml-0 ml-lg-4 shadow rounded-lg border-0"
                      //   style={{
                      //     border: "2px solid red",
                      //     borderRadius: "15px",
                      //   }}
                      style={{ backgroundColor: "turquoise" }}
                    >
                      <div class="card-body  ">
                        <h5 class="card-title">Batch {index + 1}</h5>
                        <h6 class="card-subtitle mt-4 text-muted">
                          L2 - Program
                        </h6>
                        <h6 className="pt-3">
                          Create Test / Add Questions
                          <br /> for Batch
                        </h6>
                        <button
                          className="btn btn-danger mt-3"
                          onClick={() => {
                            history.push("/adminmodule/" + stp._id);
                          }}
                        >
                          Add Tests
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container-fluid mb-4">
        <div className="row d-flex justify-content-center">
          {batch &&
            batch.map((stp, index) => (
              <div
                class="card text-center ml-0 ml-lg-4 mt-4 shadow rounded-lg border-0"
              >
                <div class="card-body mt-4 mb-4">
                  <h5 class="card-title">Batch {index + 1}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">L2 - Program</h6>
                  <p class="card-text">
                    <h6>Number of Students :{stp.maxNumberOfStudent}</h6>
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      history.push("/batches/" + stp._id);
                    }}
                  >
                    Check Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div> */}
    </>
  );
};

export default CreateBatch;
