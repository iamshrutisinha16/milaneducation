import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./home";
import Aboutus from './aboutus';
import Careermap from "./careermap";
import Contactus from "./contactus";
import Counselling from "./counseling";
import Testpage from "./pages/testpage";
import EventsPage from "./eventandupdate";

function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      {/* Page Content */}
      <div style={{ minHeight: "70vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/careermap" element={<Careermap />} />
          <Route path="/counselling" element={<Counselling/>} />
          <Route path="/contactus" element={<Contactus/>} />
           <Route path="/event&updates" element={<EventsPage/>} />
          <Route path="/psychometrictest" element={<Testpage />} />
          <Route path="/personalitytest" element={<Testpage />} />
          <Route path="/test" element={<Testpage />} />
        </Routes>
      </div>

      {/* Footer always visible */}
      <Footer />
    </Router>
  );
}

export default App;
