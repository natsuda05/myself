import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CheckInPage from "./pages/CheckInPage";
import CheckOutPage from "./pages/CheckOutPage";
import CalendarPage from "./pages/CalendarPage";
import HistoryPage from "./pages/HistoryPage";
import EmployeeManagePage from "./pages/EmployeeManagePage";
import TimeReport from "./pages/TimeReport";
//import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/checkin" element={<CheckInPage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/timereport" element={<TimeReport/>} />
        <Route path="/employeemanage" element={<EmployeeManagePage/>} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
