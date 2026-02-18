import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepopup from "./components/HomePopup";
import Home from "./home";
import Aboutus from './aboutus';
import Careermap from "./careermap";
import Contactus from "./contactus";
import Counselling from "./counseling";
import Testpage from "./pages/psychometrictest";
import Personallytest from './pages/personallytest';
import LearningTypes from "./pages/learningtypes";
import Login from "./Login";
import Register from './register';
import EventsPage from "./eventandupdate";
import Dashboard from "./pages/dashboard";

// Humne ek alag component banaya hai taaki useLocation() ka use kar sakein
function LayoutWrapper() {
  const location = useLocation();
  
  // Check karein ki current page dashboard toh nahi hai
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div className="App">
      {/* Agar dashboard nahi hai, tabhi Popup aur Navbar dikhao */}
      {!isDashboard && <Homepopup />}
      {!isDashboard && <Navbar />}

      {/* Page Content */}
      <div style={{ minHeight: isDashboard ? "100vh" : "70vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/careermap" element={<Careermap />} />
          <Route path="/counselling" element={<Counselling/>} />
          <Route path="/contactus" element={<Contactus/>} />
          <Route path="/event&updates" element={<EventsPage/>} />
          <Route path="/psychometrictest" element={<Testpage />} />
          <Route path="/personalitytest" element={<Personallytest />} />
          <Route path="/test" element={<Testpage />} />
          <Route path="/online" element={<LearningTypes />} />
          <Route path="/offline" element={<LearningTypes />} />
          <Route path="/distance" element={<LearningTypes />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

      {/* Agar dashboard nahi hai, tabhi Footer dikhao */}
      {!isDashboard && <Footer />}
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