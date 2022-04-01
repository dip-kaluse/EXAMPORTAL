import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function HomePage() {
  const [posts, setPost] = useState([]);
  const sendId = (srNo) => {
    localStorage.setItem("ExamId", JSON.stringify(srNo));
  };
  useEffect(() => {
    axios
      .get("https://dip-kaluse.github.io/examport/portal.json")
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        <div className="container">
          <div className="row">
            <h1>My Interview Portal</h1>
            <hr />
            <div className="col-md-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Test</th>
                    <th>No of Questions</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.status !== undefined &&
                    posts.tests.map((opt, index) => {
                      console.log(opt.questions[0]._id);
                      return (
                        <tr key={opt.questions[index]._id}>
                          <td>{opt.name}</td>
                          <td>{opt.questions.length}</td>
                          <td>
                            <Link
                              to={`/TestPage/${opt._id}/${opt.questions[0]._id}`}
                            >
                              <button
                                className="btn btn-warning"
                                onClick={() => {
                                  sendId(opt._id);
                                }}
                              >
                                Start Test
                              </button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
