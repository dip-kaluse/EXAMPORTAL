import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./TestPage.css";
let temo = [];
function TestPage() {
  const { id, examid } = useParams();
  const [testOf, setTestOf] = useState([]);
  const navigate = useNavigate();
  const [button, setButton] = useState("");
  const [count, setCount] = useState(0);
  const [count3, setCount3] = useState(0);
  const [questions, setQuestions] = useState([]);
  const handlePreviousQuestion = () => {
    setCount((prev) => prev - 1);
  };
  const handleNextQuestion = () => {
    setCount((prev) => prev + 1);
  };
  const handleFinished = () => {
    localStorage.setItem("testFinish", JSON.stringify(1));
  };
  const handlecheckOpt = (ind) => {
    const checks = JSON.parse(localStorage.getItem(questions[count]._id));

    if (button == "checkbox") {
      if (checks != null && checks.includes(ind)) {
        return true;
      }
    }
    if (checks != null && ind === Number(checks)) {
      return true;
    }
  };
  const setRadio = (e) => {
    localStorage.setItem(questions[count]._id, JSON.stringify(e.target.value));
    setCount3((prev) => prev + 1);
  };
  const setCheckBox = (e) => {
    if (e.target.checked) {
      let temp = [];
      temp.push(Number(e.target.value));
      temo = [...temo, ...temp];
    } else {
      let temp2;
      temo != null &&
        temo.includes(Number(e.target.value)) &&
        (temp2 = temo.filter((obj) => obj !== Number(e.target.value)));
      temo = temp2;
    }
    localStorage.setItem(questions[count]._id, JSON.stringify(temo.sort()));

    setCount3((prev) => prev + 1);
  };
  useEffect(() => {
    const testFinish = JSON.parse(localStorage.getItem("testFinish"));
    if (testFinish == 1) {
      navigate(`/`);
    }
    axios
      .get("https://dip-kaluse.github.io/examport/portal.json")
      .then((res) => {
        const temp = res.data.tests.filter((obj, index) => obj._id === examid);
        setTestOf(temp[0]);
    
        const ind = temp[0].questions.filter((obj, index) => {
          if (obj._id === id) {
            setCount(index);
            return index;
          }
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    let temp = testOf;
    setQuestions(testOf.length != 0 && temp.questions);
    if (questions != "" && questions[count].type === "Multiple-Response") {
      const checks = JSON.parse(localStorage.getItem(questions[count]._id));
      setButton("checkbox");

      if ((checks != null && checks.length) == 0) {
        console.log("first");
        localStorage.removeItem(questions[count]._id);
      } else if (checks != null) {
        temo = checks;
      }
    } else {
      setButton("radio");
    }
  });
  useEffect(() => {
      temo = [];
    questions.length > 0 &&
      navigate(`/TestPage/${testOf._id}/${questions[count]._id}`);
  }, [questions, count, count3]);
  // console.log(examid);
  return (
    <div>
      <div className="container">
        <div className="row">
          <h1>My Interview Portal</h1>
          <hr />
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                {testOf.length !== 0 && testOf.name}
              </div>
              <div className="panel-body">
                <form>
                  <label>
                    {count + 1}.
                    {questions != "" && questions[count].questionText}
                  </label>
                  <div className="radio">
                    {questions.length > 0 &&
                      questions[count].options.map((opt, index) => {
                        const callFunction =
                          button === "checkbox" ? setCheckBox : setRadio;
                        return (
                          <div className="radio" key={opt}>
                            <label>
                              <input
                                checked={handlecheckOpt(index)}
                                type={button}
                                name={"option"}
                                value={index}
                                id={opt}
                                onChange={callFunction}
                              />
                              {opt}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                </form>
              </div>
              <div className="panel-footer">
                {questions != "" && (
                  <Link
                    to={
                      questions != "" &&
                      `/TestPage/${testOf._id}/${questions[count]._id}`
                    }
                  >
                    {count !== questions.length - 1 && (
                      <button
                        className="pull-right btn btn-success"
                        onClick={() => {
                          handleNextQuestion();
                        }}
                      >
                        Next
                      </button>
                    )}
                  </Link>
                )}
                {questions != "" && (
                  <Link to={`/TestPage/${testOf._id}/${questions[count]._id}`}>
                    {count != 0 && (
                      <button
                        className=" btn btn-success"
                        onClick={() => {
                          handlePreviousQuestion();
                        }}
                      >
                        previous
                      </button>
                    )}
                  </Link>
                )}
                {questions != "" && (
                  <Link to={`/ResultPage/${testOf._id}`}>
                    {count + 1 >= questions.length && (
                      <button
                        className=" pull-right btn btn-danger"
                        onClick={() => {
                          handleFinished();
                        }}
                      >
                        Finish
                      </button>
                    )}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
