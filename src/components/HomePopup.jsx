import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const Homepopup = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setShowModal(false);

  const handleBookNow = () => {
    setShowModal(false);
    navigate("/counselling");
  };

  if (!showModal) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        {/* Close */}
        <button className="popup-close" onClick={handleClose}>
          <X size={18} />
        </button>

        {/* Main Content */}
        <div className="popup-main">
          {/* Left */}
          <div className="popup-left">
            <img
              src="/assets/logo.png"
              alt="College Milan"
              className="popup-logo"
            />

            <h2 className="popup-heading">
              CONFUSED <span>ABOUT YOUR</span>
            </h2>

            <ul className="popup-list">
              <li>Subjects</li>
              <li>Course</li>
              <li>Admission</li>
              <li>Career</li>
            </ul>

            <div className="popup-solution">
              <span className="bubble">I am the</span>
              <span className="solution-text">Solution</span>
            </div>
          </div>

          {/* Right */}
          <div className="popup-right">
            <img src="/assets/update4.jpeg"/>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="popup-footer">
          <p>Book Your Slot to meet me Online/Offline</p>
          <button onClick={handleBookNow}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default Homepopup;
