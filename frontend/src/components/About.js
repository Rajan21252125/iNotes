import React from 'react';

const AboutUs = () => {
  return (
    <div className="container">
      <h1 className="text-center mb-5">About Us</h1>
      <div className="row">
        <div className="col-md-6">
          <img className="img-fluid bg-light" src="images/download.jpeg" alt="Team" />
        </div>
        <div className="col-md-6">
          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver exceptional solutions that meet our customers' needs and exceed their expectations. We strive to create innovative and reliable products that make a positive impact in their lives.
          </p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <h2>Our Vision</h2>
          <p>
            We envision a future where technology empowers individuals and businesses to achieve their full potential. Our vision is to be a leading provider of cutting-edge solutions that drive growth and success for our clients.
          </p>
        </div>
        <div className="col-md-6">
          <img className="img-fluid" src="image2.jpg" alt="Vision" />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <img className="img-fluid" src="image3.jpg" alt="Values" />
        </div>
        <div className="col-md-6">
          <h2>Our Values</h2>
          <ul>
            <li>Customer Satisfaction: We prioritize customer satisfaction and strive to exceed their expectations.</li>
            <li>Innovation: We foster a culture of innovation, constantly seeking new and improved solutions.</li>
            <li>Integrity: We conduct business with integrity, honesty, and transparency.</li>
            <li>Collaboration: We believe in the power of collaboration and teamwork to achieve success.</li>
            <li>Continuous Learning: We encourage continuous learning and growth for our team members.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
