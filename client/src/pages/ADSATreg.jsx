import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import logo1 from "../images/logo.png";
import ADSATable from "./ADSATable";
import exportFromJSON from "export-from-json";

const ADSATreg = () => {
  const fileName = "A-DSAT Registration";
  const exportType = "xls";

  const ExportToExcel = () => {
    exportFromJSON({ data, fileName, exportType });
  };

  let history = useHistory();
  const [no, setno] = useState([]);
  const [data, setData] = useState([]);

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
        const res = await axios.get("/api/v1/admin/registrationStats", config);
        console.log(res.data.data.numberOfUserRegistered);
        setno(res.data.data.numberOfUserRegistered);
        setData(res.data.data.users);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) alert(err.response.data.message);
      }
    } else {
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

      <div className="container text-center pt-4">
        <h3 className="pt-2 mb-4">A-DSAT Registrations</h3>
        <div className="mb-4">
          <h6>Total No. of Registrations :{" " + no}</h6>
        </div>
        <div className="Container mb-4">
          <header className="App-header" style={{ textAlign: "center" }}>
            <button
              type="button"
              class="btn btn-danger"
              onClick={ExportToExcel}
            >
              Export To Excel
            </button>
          </header>
        </div>
        <ADSATable />
      </div>

      <div className="container text-center mt-5 mb-5">
        <button className="btn btn-danger" onClick={adminHome}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default ADSATreg;