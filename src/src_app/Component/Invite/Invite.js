import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import './InviteScreen.css'; // Importing CSS for custom styles
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
const InviteScreen = () => {
  const navigate = useNavigate();
  // const ShareId = localStorage.getItem("sharedId");
  const inviteCode = localStorage.getItem("sharedId");  // Your dynamic invite code
  // const inviteLink = `https://vortexvantures.com/SignUpPage/${inviteCode}`;  
  const inviteLink = `https://vortexvantures.com/SignUpPage?shareId=${inviteCode}`;
  const [copiedText, setCopiedText] = useState('');
  const qrCodeRef = useRef(null);


  // Function to copy text (handles both Chrome and Safari)
  const handleCopy = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // For Chrome and modern browsers
      navigator.clipboard.writeText(text).then(() => {
        setCopiedText(text);
        setTimeout(() => setCopiedText(''), 2000); // Reset after 2 seconds
      });
    } else {
      // Safari fallback using a temporary text area
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed'; // Avoids scrolling to the bottom of the page
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedText(text);
        setTimeout(() => setCopiedText(''), 2000);
      } catch (err) {
        console.error('Copy command failed:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  // Function to save QR code
  const handleSaveQR = () => {
    const svg = qrCodeRef.current.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = pngFile;
        link.download = `invite-qr-${inviteCode}.png`;
        link.click();
      };

      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };
  return (
    <div className="invite-screen">
       <Header name="Invite" onBack={handleBackClick} />
      {/* SVG Background */}
      <div className="background-svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="background-svg"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,320L1440,128L1440,320L0,320Z"
          />
        </svg>
      </div>

      {/* QR Code Card Section */}
      <div className="cardInvite">
      <div className="qr-card">
        <div ref={qrCodeRef} className="qr-section">
          <QRCode value={inviteLink} size={150} />
        </div>

        {/* Save QR Button */}
        <button onClick={handleSaveQR} className="save-button">
          Save QR Code
        </button>
      </div>

      {/* Invite Code Section */}
      <div className="invite-details">
        <p className="invite-code">Your Invite Code: {inviteCode}</p>
        <button onClick={() => handleCopy(inviteCode)}>
          {copiedText === inviteCode ? 'Copied!' : 'Copy Invite Code'}
        </button>

        {/* Invite Link Section */}
        <p className="invite-link">Invite Link: {inviteLink}</p>
        <button onClick={() => handleCopy(inviteLink)}>
          {copiedText === inviteLink ? 'Copied!' : 'Copy Invite Link'}
        </button>
      </div>
      </div>

    </div>
  );
};

export default InviteScreen;
