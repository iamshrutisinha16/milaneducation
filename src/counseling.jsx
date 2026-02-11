import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CounsellingPage = () => {
  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      
      {/* 1. CSS STYLING (Sab kuch ek jagah) */}
      <style>{`
        .hero-banner {
          background: linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), 
                      url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1500'); /* Banner Image */
          background-size: cover;
          background-position: center;
          padding: 100px 20px;
          text-align: center;
        }

        .text-orange { color: #f16100; font-weight: 700; }
        .bg-navy { background-color: #2c2f4d; color: white; border-radius: 20px; }

        .benefits-box {
          margin-top: -80px; /* Hero ke thoda upar chadhane ke liye */
          padding: 50px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border-bottom: 10px solid #f16100;
          animation: fadeInUp 1s ease-out;
        }

        /* Simple Animation */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .book-btn {
          background-color: #f16100;
          color: white;
          padding: 12px 30px;
          border-radius: 50px;
          border: none;
          font-weight: bold;
          font-size: 1.1rem;
          margin-top: 20px;
          transition: 0.3s;
        }
        .book-btn:hover { background-color: #d45500; }

        /* Left Sidebar Tab */
        .side-signup-tab {
          position: fixed;
          left: 0;
          top: 40%;
          background: #f16100;
          color: white;
          padding: 10px 15px;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          border-radius: 0 8px 8px 0;
          font-weight: bold;
          z-index: 100;
          cursor: pointer;
        }

        /* Floating WhatsApp Icon */
        .whatsapp-icon {
          position: fixed;
          bottom: 20px;
          right: 20px;
          text-align: center;
          z-index: 100;
        }
        .wa-btn {
          background: #25d366;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 28px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        .video-container {
          max-width: 800px;
          margin: 50px auto;
          border: 10px solid #eee;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .benefits-box { margin-top: 20px; padding: 25px; }
          .side-signup-tab { display: none; }
        }
      `}</style>

      {/* 3. HERO SECTION WITH BANNER */}
      <section className="hero-banner">
        <div className="container">
          <h1 className="display-4 fw-bold text-dark">Counseling Session</h1>
          <p className="h4 text-orange">
            Book Your Counseling Session with Me & Get Rid of All Your Problems
          </p>
        </div>
      </section>

      {/* 4. NAVY BLUE BENEFITS BOX */}
      <section className="container">
        <div className="bg-navy benefits-box">
          <h2 className="text-center fw-bold mb-4">Career Counselling Benefits</h2>
          <p className="text-center mb-5" style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            Every student and advanced career seeker seeks a career mentor to help them in their careers. 
            A student can be benefited in the following ways through a personalized career counseling session.
          </p>

          <div className="row g-4 mb-4">
            <div className="col-md-6 d-flex align-items-center">
              <span className="me-3 fs-5">✔️</span>
              <span>Identifies the <span className="text-orange">Actual Personality</span> of the Student</span>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <span className="me-3 fs-5">✔️</span>
              <span>Brings Out the <span className="text-orange">Aptitude Ability</span> of the Student</span>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <span className="me-3 fs-5">✔️</span>
              <span>Get Rid of Multiple Options, Confusing the Mind</span>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <span className="me-3 fs-5">✔️</span>
              <span>Better School/College/University Selection</span>
            </div>
            <div className="col-md-12 d-flex align-items-center">
              <span className="me-3 fs-5">✔️</span>
              <span>Better Career Selection as Per the Skill Set</span>
            </div>
          </div>

          {/* Book Button */}
          <div className="text-left mt-4">
            <button className="book-btn">Book Slot Now</button>
          </div>
        </div>
      </section>

      {/* 5. VIDEO SECTION */}
      <section className="container">
        <div className="video-container">
          <div className="ratio ratio-16x9">
            {/* Replace this with your actual video link */}
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Career Counseling Video" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CounsellingPage;