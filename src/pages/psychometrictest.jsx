import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Testpage() {
  const navigate = useNavigate();
  const [qualificationList, setQualificationList] = useState([]);
  const [qualification, setQualification] = useState("");
  const [testDetails, setTestDetails] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";

  // Fetch qualifications
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/qualifications`)
      .then((res) => res.json())
      .then((data) => setQualificationList(data))
      .catch((err) => console.error("Error fetching list:", err));
  }, []);

  // Set selected qualification
  useEffect(() => {
    if (qualification) {
      const selected = qualificationList.find(
        (q) => q.name === qualification
      );
      setTestDetails(selected || null);
      setShowPayment(false);
    } else {
      setTestDetails(null);
    }
  }, [qualification, qualificationList]);

  // Buy Now Click
  const handleBuyNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      setShowPayment(true);
    }
  };

  // Payment Done → Redirect to Test
  const handlePaymentDone = () => {
    if (testDetails?.testLink) {
      window.location.href = testDetails.testLink;
    } else {
      alert("Test link not found!");
    }
  };

  return (
    <div className="psychometric-test-page">
      <div className="test-banner">
        <h1>Let us test you through our Assessment Test</h1>
      </div>

      <div className="test-content-wrapper">
        <h2>Select Your Qualification</h2>

        <select
          style={{ width: "220px" }}
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

        {testDetails && (
          <div className="test-card-container">
            <div className="card-main">

              <div className="regular-tag">REGULAR</div>

              <h3>{testDetails.title}</h3>

              <div className="price-tag">
                <span>₹ {testDetails.price}</span>
                {testDetails.oldPrice && (
                  <span style={{ textDecoration: "line-through", marginLeft: "10px", color: "gray" }}>
                    ₹ {testDetails.oldPrice}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p style={{ marginTop: "10px" }}>
                Analyze your skills and get career guidance.
              </p>

              <div className="deliverables-box">
                <h4>Your Deliverables</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>✔ Detailed Performance Report</li>
                  <li>✔ Career Recommendations</li>
                  <li>✔ Instant Result Access</li>
                  <li>✔ Personalized Analysis</li>
                </ul>

                {!showPayment && (
                  <button
                    onClick={handleBuyNow}
                    style={{
                      marginTop: "15px",
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    Buy Now
                  </button>
                )}
              </div>

              {/* Payment Section */}
              {showPayment && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    textAlign: "center"
                  }}
                >
                  <h3>Complete Your Payment</h3>

                  <img
                    src="/qr-code.png"  // replace with your actual QR image path
                    alt="QR Code"
                    width="200"
                    style={{ margin: "15px 0" }}
                  />

                  <p><strong>UPI ID:</strong> owner@upi</p>
                  <p><strong>Name:</strong> Owner Name</p>

                  <button
                    onClick={handlePaymentDone}
                    style={{
                      marginTop: "15px",
                      padding: "10px 20px",
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    I Have Completed Payment
                  </button>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Testpage;