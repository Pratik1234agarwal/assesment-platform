import React, { useState, useRef } from "react";
import axios from "axios";

const Question = ({ question, onAnswer }) => {
  let height = "140px",
    width = "180px";
  const a = useRef(null);
  const b = useRef(null);
  const c = useRef(null);
  const d = useRef(null);
  React.useEffect(() => {
    if (
      a.current !== null &&
      b.current !== null &&
      c.current !== null &&
      d.current !== null
    ) {
      a.current.checked = false;
      b.current.checked = false;
      c.current.checked = false;
      d.current.checked = false;
      if (question.answer === "A") {
        a.current.checked = true;
      } else if (question.answer === "B") {
        b.current.checked = true;
      } else if (question.answer === "C") {
        c.current.checked = true;
      } else if (question.answer === "D") {
        d.current.checked = true;
      }
    }
  }, [question]);
  const onChange = async (e) => {
    try {
      const res = await axios.post(
        "api/v1/dsat/answer",
        {
          questionId: question.questionId,
          answer: e.target.value,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      onAnswer(e.target.value);
      // e.target.checked = false;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data) alert(err.response.data.message);
    }
  };

  return (
    <div className="question-wrapper">
      <div className="row">
        <div className="col">
          <div className="question-text">
            {question && question.questionText}
          </div>
        </div>
        <div className="col">
          {question && (
            <div>
              {question.questionImage && (
                <img
                  src={question.questionImage}
                  height={height}
                  width={width}
                  className="ml-3"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {question && (
        <div className="question-options">
          <div className="row">
            <div className="col">
              <br />
              <input
                onChange={onChange}
                type="radio"
                id="A"
                ref={a}
                name="option"
                value="A"
              />
              <label for="A" className="ml-3">
                {question.A.text}
              </label>
              <br />
              {question.A.imageUrl != "" && (
                <img
                  src={question.A.imageUrl}
                  height={height}
                  width={width}
                  className="ml-3"
                />
              )}
            </div>
            <div className="col">
              <br />
              <input
                onChange={onChange}
                type="radio"
                id="B"
                ref={b}
                name="option"
                value="B"
              />
              <label for="B" className="ml-3">
                {question.B.text}
              </label>
              <br />
              {question.B.imageUrl != "" && (
                <img
                  src={question.B.imageUrl}
                  height={height}
                  width={width}
                  className="ml-3"
                />
              )}
            </div>
          </div>

          <div className="row">
            <div className="col">
              <br />

              <input
                onChange={onChange}
                type="radio"
                id="C"
                ref={c}
                name="option"
                value="C"
              />
              <label for="C" className="ml-3">
                {question.C.text}
              </label>
              <br />
              {question.C.imageUrl != "" && (
                <img
                  src={question.C.imageUrl}
                  height={height}
                  width={width}
                  className="ml-3"
                />
              )}
            </div>
            <div className="col">
              <br />

              <input
                onChange={onChange}
                type="radio"
                id="D"
                ref={d}
                name="option"
                value="D"
              />
              <label for="D" className="ml-3">
                {question.D.text}
              </label>
              <br />
              {question.D.imageUrl != "" && (
                <img
                  src={question.D.imageUrl}
                  height={height}
                  width={width}
                  className="ml-3"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
