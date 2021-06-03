import React, { useState, useRef } from "react";
import axios from "axios";

const Question = ({ question, onAnswer }) => {
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
      <div className="question-text">{question && question.questionText}</div>
      {question && (
        <div className="question-options">
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
            {question.A}
          </label>
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
            {question.B}
          </label>
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
            {question.C}
          </label>
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
            {question.D}
          </label>
        </div>
      )}
    </div>
  );
};

export default Question;
