import React from 'react';
import './Companydetail.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
const CompanyDetail = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div className="company-detail">
       <Header name="Company Detail" onBack={handleBackClick} />
       <div className='card'>
      <h1>Vatex Vanture: </h1>
      <h2> A Professional Employment</h2>
      <h2>Platform for Boosting</h2>
      <h2>E-Commerce Sales</h2>
      <div className="detail-card">
        <h2>Platform Overview</h2>
        <p>
          Vatex Vanture is designed to enhance e-commerce sales through a specialized employment platform. We connect businesses with top talent, providing a robust platform that streamlines recruitment and boosts product visibility. Our goal is to empower companies to maximize their online sales potential with a professional and efficient approach.
        </p>
      </div>

      <div className="detail-card">
        <h2>Services Offered</h2>
        <ul>
          <li>
            <h3>Global Buyer Recruitment</h3>
            <p>
              We assist businesses in finding and recruiting global buyers, expanding their reach into new markets and increasing their sales opportunities.
            </p>
          </li>
          <li>
            <h3>Boosting Product Sales</h3>
            <p>
              Our platform helps in boosting product sales by enhancing product visibility and targeting the right audience with tailored marketing strategies.
            </p>
          </li>
          <li>
            <h3>Increasing Product Sales</h3>
            <p>
              We provide solutions to increase product sales through effective strategies, optimizing sales channels, and leveraging data-driven insights to improve performance.
            </p>
          </li>
        </ul>
      </div>

      <div className="detail-card">
        <h2>Why Choose Vatex Vanture?</h2>
        <ul>
          <li>
            <h3>Professional Team</h3>
            <p>
              Our team consists of industry experts who bring years of experience and expertise to ensure the success of your e-commerce initiatives.
            </p>
          </li>
          <li>
            <h3>Efficient and Transparent</h3>
            <p>
              We pride ourselves on our efficient and transparent processes, providing clear communication and reliable results to our clients.
            </p>
          </li>
          <li>
            <h3>Security Assurance</h3>
            <p>
              Security is a top priority for us. We implement robust measures to protect your data and ensure that your business transactions are secure.
            </p>
          </li>
        </ul>
      </div>

      <div className="detail-card">
        <h2>Conclusion</h2>
        <p>
          Choosing Vatex Vanture means partnering with a leading platform dedicated to enhancing e-commerce sales through expert services, innovative solutions, and a commitment to excellence. We are here to support your growth and drive success in the digital marketplace.
        </p>
      </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
