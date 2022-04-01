import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function TestPage() {
  const { id } = useParams();
  const [testOf, setTestOf] = useState([]);
  const navigate = useNavigate();
  const [examId, setExamId] = useState(
    JSON.parse(localStorage.getItem("ExamId")) || " "
  );
  const [button, setButton] = useState("");
  const [count, setCount] = useState(0);
  const [questions, setQuestions] = useState("");
  const handlePreviousQuestion = () => {
    setCount((prev) => prev - 1);
  };
  const handleNextQuestion = () => {
    setCount((prev) => prev + 1);
  };
  const handlecheckOpt = (ind) => {
    const checks = JSON.parse(localStorage.getItem(questions[count]._id));

    if (ind === Number(checks)) {
      return true;
    }
  };
  const setRadio = (e) => {
    localStorage.setItem(questions[count]._id, JSON.stringify(e.target.value));
  };
  const setCheckBox = () => {};
  useEffect(() => {
    axios
      .get("https://dip-kaluse.github.io/examport/portal.json")
      .then((res) => {
        const temp = res.data.tests.filter((obj, index) => obj._id === examId);
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
      setButton("checkbox");
    } else {
      setButton("radio");
    }
  });
  useEffect(() => {
    questions != "" &&
      navigate(`/TestPage/${testOf._id}/${questions[count]._id}`);
  }, [questions, count]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <h1>My Interview Portal</h1>
          <hr />
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                {testOf.length != 0 && testOf.name}
              </div>
              <div className="panel-body">
                <form>
                  <label>
                    {count + 1}.
                    {questions != "" && questions[count].questionText}
                  </label>
                  <div className="radio">
                    {questions != "" &&
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
                                value={index || 0}
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
                    {count != questions.length - 1 && (
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
