import React, { useState, useEffect } from "react";
import logo1 from "../../images/logo.png";
import { useHistory } from "react-router-dom";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";

const batch = [
  { Students: "50" },
  { Students: "40" },
  { Students: "30" },
  { Students: "20" },
  { Students: "20" },
  { Students: "40" },
  { Students: "30" },
  { Students: "20" },
];

const CreateBatch = () => {
  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <div>
        <h3 className="pt-3">Total Number of Students :</h3>
        <div className="container mt-4 text-center">
          <div class="card shadow-sm " style={{ width: "auto" }}>
            <div class="card-body">
              <h5 class="card-title ">Create New Batch</h5>
              <h6 class="card-subtitle mb-2 text-muted pt-3 pb-3">
                Students Left :
              </h6>
              Enter No. of Students for new Batch :
              <div className="d-flex justify-content-center mt-3">
                <input
                  type="number"
                  style={{
                    width: "68px",
                    border: "2px solid red",
                    borderRadius: "15px",
                  }}
                  class="form-control"
                  placeholder="No."
                />
              </div>
              <button className="mt-3 btn btn-primary">Create Batch</button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container mt-4">
        <div class="card text-center" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">Batch 1</h5>
            <h6 class="card-subtitle mb-2 text-muted">L2 - Program</h6>
            <p class="card-text">
              <h6>Number of Students :</h6>
            </p>
          </div>
        </div>
      </div> */}

      <div className="container-fluid mb-4">
        <div className="row d-flex justify-content-center">
          {batch.map((stp, index) => (
            <div
              class="card text-center ml-0 ml-lg-4 mt-4 shadow rounded-lg border-0"
              //   style={{
              //     border: "2px solid red",
              //     borderRadius: "15px",
              //   }}
            >
              <div class="card-body mt-4 mb-4">
                <h5 class="card-title">Batch {index + 1}</h5>
                <h6 class="card-subtitle mb-2 text-muted">L2 - Program</h6>
                <p class="card-text">
                  <h6>Number of Students :{stp.Students}</h6>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CreateBatch;
