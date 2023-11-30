import React, { useRef, useState } from "react";
import "./quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_arr = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock) {
      return;
    }

    if (question.ans === ans) {
      e.target.classList.add("correct");
      setScore(score + 1);
    } else {
      e.target.classList.add("wrong");

      option_arr[question.ans - 1].current.classList.add("correct");
    }

    setLock(true);
  };

  const next = () => {
    if (lock === false) {
      return;
    }

    if (index === data.length - 1) {
      setResult(true);
      return;
    }

    setIndex(++index);
    setQuestion(data[index]);
    setLock(false);

    option_arr.map((opt) => {
      opt.current.classList.remove("wrong");
      opt.current.classList.remove("correct");
      return null;
    });
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);

    option_arr.map((opt) => {
        opt.current.classList.remove("wrong");
        opt.current.classList.remove("correct");
        return null;
    });
  }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {result && <>
        <h2>
            Your Score {score} out of {data.length}.
        </h2>
        <button onClick={() => {
            reset();
        }}>
            Reset
        </button>
      </>}
      {!result && (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>

          <ul>
            <li
              onClick={(e) => {
                checkAns(e, 1);
              }}
              ref={Option1}
            >
              {question.option1}
            </li>
            <li
              onClick={(e) => {
                checkAns(e, 2);
              }}
              ref={Option2}
            >
              {question.option2}
            </li>
            <li
              onClick={(e) => {
                checkAns(e, 3);
              }}
              ref={Option3}
            >
              {question.option3}
            </li>
            <li
              onClick={(e) => {
                checkAns(e, 4);
              }}
              ref={Option4}
            >
              {question.option4}
            </li>
          </ul>

          <button
            onClick={() => {
              next();
            }}
          >
            Next
          </button>

          <div className="index">
            {index + 1} of {data.length} quistions
          </div>
        </>
      )}

      
    </div>
  );
};

export default Quiz;
