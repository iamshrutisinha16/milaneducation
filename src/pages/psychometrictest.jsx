import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Testpage() {
  const navigate = useNavigate();
  const [qualificationList, setQualificationList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [testDetails, setTestDetails] = useState(null);

  const API_BASE_URL = "https://collegemilan-backend-2.onrender.com";

  // Fetch qualifications
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/qualifications`)
      .then((res) => res.json())
      .then((data) => setQualificationList(data))
      .catch((err) => console.error(err));
  }, []);

  // Set selected qualification
  useEffect(() => {
    if (selectedId) {
      const selected = qualificationList.find(
        (q) => q._id === selectedId
      );
      setTestDetails(selected || null);
    } else {
      setTestDetails(null);
    }
  }, [selectedId, qualificationList]);

  // Buy Now → Razorpay Open
  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!testDetails) {
      alert("Please select qualification");
      return;
    }

    try {
      // Step 1: Create order from backend
      const res = await fetch(`${API_BASE_URL}/api/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: testDetails.price,
        }),
      });

      const order = await res.json();

      // Step 2: Open Razorpay
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // ← Sir se milega
        amount: order.amount,
        currency: "INR",
        name: "College Milan",
        description: testDetails.title,
        order_id: order.id,

        handler: async function (response) {

          // Step 3: Verify Payment
          const verifyRes = await fetch(`${API_BASE_URL}/api/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              qualificationId: selectedId,
            }),
          });

          const data = await verifyRes.json();

          if (data.success) {
            alert("Payment Successful!");
            window.location.href = testDetails.testLink;
          } else {
            alert("Payment Verification Failed");
          }
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return (
    <div className="psychometric-test-page">
      <div className="test-banner">
        <h1>Assessment Test Choose your qualification and get instant insights!</h1>
      </div>

      <div className="test-content-wrapper">
        <h2>Select Your Qualification</h2>

        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">Select Qualification</option>
          {qualificationList.map((q) => (
            <option key={q._id} value={q._id}>
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
                ₹ {testDetails.price}
              </div>

              <p>
                Analyze your skills and get career guidance.
              </p>

              <div className="deliverables-box">
                <h4>Your Deliverables</h4>
                <ul>
                  <li>✔ Detailed Performance Report</li>
                  <li>✔ Career Recommendations</li>
                  <li>✔ Instant Result Access</li>
                  <li>✔ Personalized Analysis</li>
                </ul>

                <button onClick={handleBuyNow}>
                  Buy Now
                </button>
              
              </div>

            </div>
          </div>
        )}
      </div>
        {/* --- 4. YOUTUBE VIDEO SECTION --- */}
<section id="video" className="video-section py-5 bg-light">
  <div className="container text-center">
    
    {/* Heading */}
    <h2 
      className="mb-4 fw-bold"
      style={{ color: "#ff6600" }}
    >
      Watch Our Demo Video
    </h2>

    <div className="row justify-content-center">
      <div className="col-lg-8 col-md-10">
        <div className="video-card shadow-lg">
  <video width="100%" height="400" controls>
    <source 
      src="https://collegemilan-backend-2.onrender.com/uploads/psychnometricpagevideo.mp4" 
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</div>
      </div>
    </div>

  </div>
</section>
    </div>
  );
}

export default Testpage;