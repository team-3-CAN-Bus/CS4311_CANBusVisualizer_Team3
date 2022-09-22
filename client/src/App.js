import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import Create from "./components/create";
import ProjectList from "./components/projectList";
import LandingPage from "./pages/LandingPage";
import DisplayerPage from "./pages/DisplayerPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/create" element={<Create />} />
        <Route path="/displayer" element={<DisplayerPage />} />
      </Routes>
    </div>
  );
};

export default App;