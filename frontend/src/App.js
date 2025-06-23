import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitFeedback from "./pages/SubmitFeedback";
import Signup from "./pages/Signup";
import AddEmployee from "./pages/AddEmployee";
import TeamOverview from "./pages/TeamOverView";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AssignManager from "./pages/AssignManager";
import ManagerRequests from "./pages/ManagerRequests";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitFeedback />} />
         <Route path="/add-employee" element={<AddEmployee />} /> 
         <Route path="/team-overview" element={<TeamOverview />} />
         <Route path="/forgot" element={<ForgotPassword />} />
         <Route path="/reset-password" element={<ResetPassword/>}/>
         <Route path="/assign-manager" element={<AssignManager />} />
         <Route path="/requests" element={<ManagerRequests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
