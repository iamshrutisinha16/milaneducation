import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";

const AdminPaymentSettings = () => {
  const [settings, setSettings] = useState({
    razorpayKeyId: "",
    razorpayKeySecret: "",
    isActive: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // 1. Page load hote hi purani keys Database se mangwao
  useEffect(() => {
    axios
      .get("https://collegemilan-backend-2.onrender.com/api/admin/payment-settings") // Apna Sahi URL daalna
      .then((res) => {
        if (res.data) {
          setSettings({
            razorpayKeyId: res.data.razorpayKeyId || "",
            razorpayKeySecret: res.data.razorpayKeySecret || "",
            isActive: res.data.isActive || false,
          });
        }
      })
      .catch((err) => console.log("Failed to fetch settings", err));
  }, []);

  // 2. Text Box handle karne ke liye
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  // 3. ON/OFF Toggle switch handle karne ke liye
  const handleToggle = (e) => {
    setSettings({ ...settings, isActive: e.target.checked });
  };

  // 4. Save Button (Database me update karne ke liye)
  const handleSave = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await axios.put("https://collegemilan-backend-2.onrender.com/api/admin/payment-settings", settings);
      setMessage({ type: "success", text: "Payment Settings Updated Successfully!" });
    } catch (error) {
      console.error(error);
      setMessage({ type: "danger", text: "Failed to update settings." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="p-4">
      <h3 className="mb-4 fw-bold">Payment Gateway Settings</h3>

      <Row>
        <Col md={8} lg={6}>
          <Card className="shadow-sm rounded-4 border-0">
            <Card.Body className="p-4">
              
              {/* Alert Message dikhane ke liye */}
              {message && (
                <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
                  {message.text}
                </Alert>
              )}

              <Form>
                {/* Status Toggle (ON/OFF) */}
                <Form.Group className="mb-4 d-flex align-items-center justify-content-between p-3 bg-light rounded">
                  <div>
                    <Form.Label className="mb-0 fw-bold">Enable Razorpay Payments</Form.Label>
                    <div className="text-muted small">
                      Turn this ON to start accepting payments on the website.
                    </div>
                  </div>
                  <Form.Check 
                    type="switch"
                    id="payment-switch"
                    checked={settings.isActive}
                    onChange={handleToggle}
                    style={{ transform: "scale(1.3)" }}
                  />
                </Form.Group>

                {/* Key ID Input */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Razorpay Key ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="razorpayKeyId"
                    value={settings.razorpayKeyId}
                    onChange={handleChange}
                    placeholder="rzp_live_xxxxxxxxx"
                  />
                </Form.Group>

                {/* Key Secret Input */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Razorpay Key Secret</Form.Label>
                  <Form.Control
                    type="password" // Password type taki secret chhupa rahe
                    name="razorpayKeySecret"
                    value={settings.razorpayKeySecret}
                    onChange={handleChange}
                    placeholder="Enter Key Secret"
                  />
                </Form.Group>

                {/* Save Button */}
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-100 fw-bold" 
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Save Settings"}
                </Button>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPaymentSettings;