import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const QRScanner = () => {
  const webcamRef = useRef(null);
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState(null);

const scanQRCode = () => {
    const webcam = webcamRef.current;
    if (!webcam) return;
  
    const imageData = webcam.getScreenshot();
    if (!imageData) return;
  
    const code = jsQR(imageData, imageData.width, imageData.height);
  
    if (code) {
      setResult(code.data);
      setScanned(true);
    }
  };
  

  useEffect(() => {
    const interval = setInterval(scanQRCode, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      {/* <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ width: '100%', height: '100%' }}
      /> */}
      <Webcam
        ref={webcamRef}
        videoConstraints={{
          facingMode: "environment" // Use the back camera if available
        }}
        screenshotFormat="image/jpeg"
        style={{ width: '100%', height: 'auto' }}
      />
      {scanned && <p>Scanned QR Code: {result}</p>}
    </div>
  );
};

export default QRScanner;
