import { useState, useEffect } from "react"
function Testpage() {
  const [qualification, setQualification] = useState("");
  const [testData, setTestData] = useState(null);

  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    if (qualification) {
      fetch(`${API_BASE_URL}/api/tests/${qualification}`)
        .then((res) => res.json())
        .then((data) => setTestData(data))
        .catch((err) => console.error(err));
    }
  }, [qualification]);

  return (
    <>
      {/* Banner */}
      <div
        className="test-banner"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f")',
        }}
      >
        <h1>Let us test you through our Psychometric Test</h1>
      </div>

      {/* Main Section */}
      <div className="test-wrapper">
        <div className="test-container">
          <h2 className="test-title">
            Tap on the dropdown menu to choose your qualification
          </h2>

          {/* Dropdown */}
          <select
            className="test-dropdown"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          >
            <option value="">Select Qualification</option>
            <option value="8th">Class 6th–8th</option>
            <option value="9th">Class 9th/10th</option>
            <option value="10th">Class 11th/12th</option>
            <option value="12th">12th Passing</option>
          </select>

          {/* Test Card */}
          {testData && (
            <div className="test-card">
              <div className="premium-badge">PREMIUM</div>

              <h3 className="test-name">{testData.title}</h3>
              <p className="test-price">₹ {testData.price}</p>
            </div>
          )}

          {/* Fixed Video Section (always visible) */}
          <div className="video-section">
            <iframe
              src="https://www.youtube.com/embed/ysz5S6PUM-U"
              title="Career Test Video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default Testpage;

