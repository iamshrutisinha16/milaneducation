import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Testpage() {
  const navigate = useNavigate();
  const [qualificationList, setQualificationList] = useState([]);
  const [qualification, setQualification] = useState("");
  const [testDetails, setTestDetails] = useState(null);

 const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";

useEffect(() => {
  fetch(`${API_BASE_URL}/api/qualifications`)
    .then((res) => res.json())
    .then((data) => setQualificationList(data))
    .catch((err) => console.error("Error fetching list:", err));
}, []);

  // Fetch test details based on qualification
  useEffect(() => {
    if (qualification) {
      fetch(
        `${API_BASE_URL}/api/tests/${encodeURIComponent(qualification)}`
      )
        .then((res) => res.json())
        .then((data) => setTestDetails(data))
        .catch((err) => {
          console.error("Error fetching details:", err);
          setTestDetails(null);
        });
    } else {
      setTestDetails(null);
    }
  }, [qualification]);

  const handleBuyNow = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login"); 
  } else {
    navigate("/checkout");
  }
};

  return (
    <div className="psychometric-test-page">
      {/* Banner Section */}
      <div className="test-banner">
        <h1>Let us test you through our Psychometric Test</h1>
      </div>

      <div className="test-content-wrapper">
        <h2>Tap on the dropdown menu to choose your qualification</h2>

        {/* Dropdown */}
        <select style={{ width: "200px" }}

          className="test-dropdown"
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        >
          <option value="">Select Qualification</option>
          {qualificationList.map((q) => (
            <option key={q._id} value={q.name}>
              {q.name}
            </option>
          ))}
        </select>

        {/* Card or Video */}
        {testDetails && testDetails.title ? (
          <div className="test-card-container">
            <div className="card-main">
              <div className="regular-tag">REGULAR</div>

              <h3 className="assessment-title">
                {testDetails.title}
              </h3>

              <div className="price-tag">
                <span className="current-price">
                  ₹ {testDetails.price}
                </span>
                <span className="old-price">
                  ₹ {testDetails.oldPrice}
                </span>
              </div>

              <div className="deliverables-box">
                <h4>Your Deliverables</h4>
                <ul>
                  {Array.isArray(testDetails.deliverables) &&
                    testDetails.deliverables.map((item, index) => (
                      <li key={index}>
                        <span className="tick-icon">✔</span> {item}
                      </li>
                    ))}
                </ul>
                
              <button className="buy-now-btn" onClick={handleBuyNow}>
             Buy Now
           </button>

              </div>
            </div>
          </div>
        ) : (
          <div className="video-placeholder">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Introduction Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

export default Testpage;
