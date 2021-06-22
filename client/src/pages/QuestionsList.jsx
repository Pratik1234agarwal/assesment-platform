import React, { useEffect } from "react";
import axios from "axios";

let ques = [];
const QuestionsList = () => {
  useEffect(async () => {
    const config = {
      headers: {
        Authorization: `Admin ${localStorage.getItem("Admin")}`,
      },
    };
    try {
      const res = await axios.get("/api/v1/admin/questions/list", config);
      console.log(res);
      ques = res.data.data;
      console.log(ques);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) alert(err.response.data.message);
    }
  }, []);

  const quest = async () => {
    const config = {
      headers: {
        Authorization: `Admin ${localStorage.getItem("Admin")}`,
      },
    };
    try {
      const res = await axios.get("/api/v1/admin/questions/list", config);
      console.log(res);
      ques = res.data.data;
      console.log(ques);
      return <div>hello</div>;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) alert(err.response.data.message);
    }
  };

  return (
    <>
      <div className="container">
        <h4>Welcome</h4>
        <button onClick={quest}>questions</button>
        {/* <p>{ques[0].A}</p> */}
      </div>
    </>
  );
};

export default QuestionsList;
