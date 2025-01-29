import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Header from "./pages/header/header.jsx";
import NoMatch from "./pages/noMatch/NoMatch.jsx";
import PostUser from "./pages/Employee/PostUser.jsx";
import UpdateUser from "./pages/Employee/UpdateUser.jsx";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <div className="routes-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employee" element={<PostUser />} />
            <Route path="/employee/:id" element={<UpdateUser />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
