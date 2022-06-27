import React, { useState, useEffect } from "react";
import AdminSidePanel from "../Components/AdminSidePanel";
import logo1 from "../images/logo.png";
import { useHistory } from "react-router-dom";
import axios from "axios";

const QuestionAdd = (props) => {
  let history = useHistory();
  const testId = props.match.params.id;
  console.log("test id",testId);
  const [data,setData] = useState({});
  const [option1Img, setoption1Img] = useState("");

  function Onsubmit(event) {
    // var imagefile = document.querySelector("#imag");
    // console.log(formData);
    // console.log(imagefile);
    if (event) {
      event.preventDefault();
    }
    
    
    // console.log(item);
    
    axios
      .post(`/excel/uploadfile/${testId}`,data,{
        headers: {
          Authorization: `Admin ${localStorage.getItem(
            "Admin"
          )}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log(res);
        alert("Question added");
      })
      .catch((err) => {
        console.log(err.response.data);
        console.error(err);
      });

    // alert("Signin Complete");
    // history.push("/addingquestions");
  }

  useEffect(() => {
    if (localStorage.getItem("Admin")) {
      // history.push("/Instdsat");
    } else {
      history.push("/admin");
    }
  });
  function adminHome() {
    history.push("/adminroutes");
  }

  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>


      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col border border-dark rounded ml-2 mr-2 pt-3 mb-3">
            <form>

              <div class="row mt-5 pl-2">
                
                <div class="col">
                <label for="op1">ID: </label>
                  <input
                    type="text"
                    class="form-control"
                    id="op1"
                    placeholder=""
                    value={testId}
                    required
                  />
                </div>
                <div class="col">
                  <label for="file">
                    Add Excel File
                  </label>
                  <input
                    type="file"
                    class="form-control-file"
                    id="file"
                    name="file"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);
                      console.log("form",formData);
                      setData(formData);
                      
                    }}
                  />
                </div>
              </div>

              

              
              

              

              <div className="text-center mt-5 mb-5">
                <button
                  type="submit"
                  class="btn text-white"
                  style={{ backgroundColor: "#0E3B7D" }}
                  onClick={Onsubmit}
                >
                  Submit Question
                </button>
              </div>
            </form>
          </div>
          {/* <div className="col">
            <AdminSidePanel cnt={count} />
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

export default QuestionAdd;
