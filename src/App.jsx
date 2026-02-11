import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./home";
import Aboutus from './aboutus';
import Careermap from "./careermap";
import Counselling from "./counseling";

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
        </Routes>
      </div>

      {/* Footer always visible */}
      <Footer />
    </Router>
  );
}

export default App;
