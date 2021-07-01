import React, { useState, useEffect } from "react";
import "./Instdsat.css";
import { useHistory } from "react-router-dom";
import logo1 from "../images/logo.png";
import VideoRecorder from "react-video-recorder";

const Instdsat = () => {
  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // history.push("/Instdsat");
    } else {
      history.push("/signin");
    }
  });
  function check() {
    if (localStorage.getItem("token")) {
      history.push("/sidepanel");
    } else {
      history.push("/");
    }
  }

  function enter() {
    if (navigator.mozGetUserMedia) {
      navigator.myGetMedia = navigator.mozGetUserMedia;
      navigator.myGetMedia({ video: true }, connect, error);
    } else {
      alert("NO");
    }

    function connect(stream) {
      var video = document.getElementById("my_video");
      video.src = window.URL ? window.URL.createObjectURL(stream) : stream;
      video.play();

      var canvas = document.getElementById("c");
    }

    function error(e) {
      console.log(e);
    }
  }

  return (
    <div>
      {/* <VideoRecorder /> */}
      {/* <div className="container-fluid admn text-center">
        <div className="row  pt-2 ml-3 pb-2 ">
          <img src={logo1} />
          <span>Online Test</span>
        </div>
      </div> */}

      <div className="container-fluid"></div>

      <div className="container-fluid jass text-white text-center">
        <h2 className="pt-5">Online Test - A-DSAT</h2>
        <h5 className="pt-3">
          The A-DSAT online test assesses candidates knowledge
        </h5>
        <button
          type="button"
          class="btn btn-dark mt-3 text-dark "
          style={{
            background: "#FFFFFF",
            boxShadow: "0px 20px 35px rgba(14, 59, 125, 0.2)",
            borderRadius: "10px",
          }}
          onClick={check}
        >
          GET STARTED
        </button>
      </div>

      <div className="container-fluid">
        <h3
          className="text-center pt-3"
          style={{
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "35px",
          }}
        >
          ABOUT A-DSAT ONLINE TEST
        </h3>
        <div className="container">
          {/* <h6 style={{ fontSize: "18px" }}> */}
          <h6 className="text-center pt-3" style={{ fontSize: "18px" }}>
            Data Science Aptitude Test (A-DSAT) is the standard evaluation
            process to select the right candidate for learning Data Science. The
            A-DSAT is based on Sternberg Theory of intelligence and aims to
            evaluate "Analytical Intelligence of the candidate". Analytical
            Intelligence is the kind of intelligence which helps one to decipher
            complex scenarios and draw patterns out of it.
          </h6>
        </div>
      </div>

      <div className="container text-center">
        <h3
          className=" pt-4"
          style={{
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "35px",
          }}
        >
          A-DSAT ONLINE TEST INCLUDES
        </h3>
        <p className="pt-3" style={{ fontSize: "18px" }}>
          <b>Data Interpretation</b>
        </p>

        <p style={{ fontSize: "18px" }}>
          <b>Statistics and Probability</b>
        </p>

        <p style={{ fontSize: "18px" }}>
          <b>Integrated Reasoning</b>
        </p>

        <p style={{ fontSize: "18px" }}>
          <b>Business Understanding</b>
        </p>

        <p style={{ fontSize: "18px" }}>
          <b>Quantitative Aptitude</b>
        </p>
      </div>

      <div className="container text-center">
        <h3
          className="text-center pt-3"
          style={{
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "40px",
          }}
        >
          GENERAL INSTRUCTION FOR A-DSAT
        </h3>
        <p className="pt-3" style={{ fontSize: "18px" }}>
          <b>Negative Marking :</b> For Incorrect Answer : -1 Mark
        </p>
        <p style={{ fontSize: "18px" }}>
          <b>Passing Criteria :</b> 60 Marks
        </p>
        <p style={{ fontSize: "18px" }}>
          <b>Time Limit :</b> 30 Minutes
        </p>
        <p style={{ fontSize: "18px" }}>
          <b>Platform :</b> IKIGAI LAB
          {/* IIT Ropar Online Quiz platform */}
        </p>
      </div>
    </div>
  );
};

export default Instdsat;
