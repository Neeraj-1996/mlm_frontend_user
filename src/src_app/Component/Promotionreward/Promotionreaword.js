import React from 'react';
import './CompanyProfile.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const Promotion = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };
  return (
    <div className="company-profile">
      {/* <h1>Company Profile</h1> */}
      <Header name="Company Profile" onBack={handleBackClick} />

      {/* Card for Tiers */}
      <div className="card tier-section">
        <h2>Commission Structure</h2>
        <div className="tier-card">
          <div className="tier-header">
            <h3>Level 1</h3>
            <p>First Tier Commission - 16%</p>
          </div>
          <p className="tier-description">
            Earn 16% commission on direct sales. This tier rewards you the most for bringing in new customers.
          </p>
        </div>

        <div className="tier-card">
          <div className="tier-header">
            <h3>Level 2</h3>
            <p>Second Tier Commission - 8%</p>
          </div>
          <p className="tier-description">
            Earn 8% commission on sales made by your direct recruits. Your success helps build their success.
          </p>
        </div>

        <div className="tier-card">
          <div className="tier-header">
            <h3>Level 3</h3>
            <p>Third Tier Commission - 4%</p>
          </div>
          <p className="tier-description">
            Earn 4% commission on sales from the next level. Watch your network grow while you continue to earn.
          </p>
        </div>

        <div className="tier-card">
          <div className="tier-header">
            <h3>Level 4</h3>
            <p>Fourth Tier Commission - 2%</p>
          </div>
          <p className="tier-description">
            Earn 2% commission on sales from deeper within your network. Even distant connections contribute to your income.
          </p>
        </div>

        <div className="tier-card">
          <div className="tier-header">
            <h3>Level 5</h3>
            <p>Fifth Tier Commission - 1%</p>
          </div>
          <p className="tier-description">
            Earn 1% commission on the final tier. This is a residual income for sustained success over time.
          </p>
        </div>
      </div>

      {/* Card for Why Choose Section */}
      <div className="card why-choose-section">
        <h2>Why Choose Our Commission Structure?</h2>
        <p>
          Our commission structure is designed to incentivize both individual effort and team success. With rewards spanning across five tiers, you not only benefit from your own sales but also from the efforts of your recruits and their recruits. This multi-level approach ensures that as your network grows, so does your earning potential. The higher percentages at the top tiers reflect the importance of direct sales, while the residual earnings from deeper levels provide long-term income stability. By choosing our structure, you're opting for a sustainable and scalable income source that rewards both immediate effort and ongoing growth within your network.
        </p>
      </div>
    </div>
  );
};

export default Promotion;
