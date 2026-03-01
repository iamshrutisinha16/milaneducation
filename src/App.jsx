import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepopup from "./components/HomePopup";

import Home from "./home";
import Aboutus from "./aboutus";
import Careermap from "./careermap";
import Contactus from "./contactus";
import Counselling from "./counseling";
import Placement from "./placement";
import Testpage from "./pages/psychometrictest";
import Personallytest from "./pages/personallytest";
import LearningTypes from "./pages/learningtypes";
import Login from "./Login";
import Register from "./register";
import EventsPage from "./eventandupdate";
import Dashboard from "./pages/dashboard";

/* ADMIN IMPORTS */
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/Dashboard";
import Users from "./admin/Users";
import Enquiries from "./admin/Enquiries";
import ProtectAdmin from "./admin/ProtectAdmin";
import Courses from './admin/Courses';
import AdminQualifications from './admin/AdminQualifications';
import AdminUniversities from './admin/AdminUniversities';
import Settings from './admin/Settings';
import AdminEvent from './admin/AdminEvent';

function LayoutWrapper() {
  const location = useLocation();

  const isUserDashboard = location.pathname === "/dashboard";

  // Hide Navbar/Footer on all admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="App">
      
      {/* Hide popup/navbar/footer for admin + user dashboard */}
      {!isUserDashboard && !isAdminRoute && <Homepopup />}
      {!isUserDashboard && !isAdminRoute && <Navbar />}

      <div style={{ minHeight: isUserDashboard || isAdminRoute ? "100vh" : "70vh" }}>
        <Routes>
          
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/careermap" element={<Careermap />} />
          <Route path="/counselling" element={<Counselling />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/event&updates" element={<EventsPage />} />
          <Route path="/placements" element={<Placement />} />
          <Route path="/assessmenttest" element={<Testpage />} />
          <Route path="/personalitytest" element={<Personallytest />} />
          <Route path="/test" element={<Testpage />} />
          <Route path="/:mode" element={<LearningTypes />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ===== ADMIN LOGIN ===== */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ===== ADMIN PROTECTED ROUTES ===== */}
          <Route
            path="/admin"
            element={
              <ProtectAdmin>
                <AdminLayout />
              </ProtectAdmin>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="universities" element={< AdminUniversities />} />
            <Route path="qualifications" element={<AdminQualifications/>} />
            <Route path="courses" element={<Courses />} />
            <Route path="settings" element={<Settings />} />
            <Route path="events" element={<AdminEvent />} />
          </Route>

        </Routes>
      </div>

      {!isUserDashboard && !isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;