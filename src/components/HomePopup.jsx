import {useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import {X} from 'lucide-react';

const Homepopup = ()=>{
   const [showModal, setShowModal] = useState(false);
   const navigate = useNavigate();

   useEffect(()=> {
    const hasSeenPopup = sessionStorage.getItem('hasseenPopup');
    // if (!hasSeenPopup) {
      setTimeout(() => {
        setShowModal(true);
        // sessionStorage.setItem('hasSeenPopup', 'true'); 
      }, 500);

 }, []);

 const handleClose =() => {
      setShowModal(false);
 };

 const handleBookNow = () => {
    setShowModal(false);
    navigate("/counselling");
 };

 if(!showModal) return null;
 return(
    <div className="popup-overlay">
      <div className="popup-container animate-pop">
        {/* Close Button */}
        <button className="close-btn" onClick={handleClose}>
          <X size={24} color="#fff" />
        </button>

        <div className="popup-body">
          {/* Left Side: Content */}
          <div className="popup-content">
              <img src="https://your-logo-url.png" alt="College Milan"className="popup-logo"/>
            
            <h2 className="main-heading">
              CONFUSED <span className="light-text">ABOUT YOUR</span>
            </h2>
            
            <div className="problem-list">
              <ul>
                <li>↘ SUBJECTS</li>
                <li>↘ COURSE</li>
                <li>↘ ADMISSION</li>
                <li>↘ CAREER</li>
              </ul>
              <div className="big-question-mark">?</div>
            </div>

            <div className="solution-tag">
              <span className="dark-bubble">I am the</span>
              <span className="orange-text"> Solution</span>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="popup-image-section">
            <div className="orange-blob"></div>
            <img src="https://your-image-url.png" alt="Expert Counselor"className="person-img"/>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="popup-footer">
          <p>Book Your Slot to meet me Online/Offline</p>
          <button className="book-now-btn" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
 );
};

export default Homepopup;