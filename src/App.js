import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
  Navigate,
} from "react-router-dom";
import HomePage from "./Component/HomePage";
import TestPage from "./Component/TestPage";
import ResultPage from "./Component/ResultPage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />

          <Route path="/" element={<HomePage />} />
          <Route path={`/TestPage/:id/:id`} element={<TestPage />} />
          {/* <Route path={"/TestPage"} element={<TestPage />} /> */}
          <Route path={"/ResultPage"} element={<ResultPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
