import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResultPage() {
  const { id } = useParams();
  const [testOf, setTestOf] = useState([]);
  const [count, setCount] = useState(0);
  const [currectOption, setCurrectOption] = useState([]);
  const history = useNavigate();
  const goHome = () => {
    history("/");
    testOf.questions.map((obj, index) => {
      localStorage.removeItem(obj._id);
    });
  };

  useEffect(() => {
    axios
      .get("https://dip-kaluse.github.io/examport/portal.json")
      .then((res) => {
        const temp = res.data.tests.filter((obj, index) => obj._id === id);
        setTestOf(temp[0]);
        let count2 = 0;
        temp[0].questions.map((obj, index) => {
          const checks = JSON.parse(localStorage.getItem(obj._id));
          String(checks) == String(obj.correctOptionIndex) && count2++;
        });
       
        setCount(count2);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(testOf);
  return (
    <div>
      {" "}
      <div className="container">
        <div className="row">
          <h1>My Interview Portal</h1>
          <hr />
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                {" "}
                {testOf.length !== 0 && testOf.name} - Result
              </div>
              <div className="panel-body">
                <center>
                  <h2 className="">
                    Total no of Questions:{" "}
                    {testOf.length !== 0 && testOf.questions.length}
                  </h2>
                  <h3 className="text-success">
                    Correct Answers: {count || 0}
                    <span className="text-danger">
                      {" "}
                      <br></br>Wrong Answers:
                      {testOf.length !== 0 && testOf.questions.length - count}
                    </span>
                  </h3>

                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      goHome();
                    }}
                  >
                    Home
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
