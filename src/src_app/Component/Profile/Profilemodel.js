import React from "react";
// import './Modal.css'; // Create a CSS file for modal styling

const ImageModal = ({ isOpen, onClose, images, onImageSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">Close</button>
        <div className="image-gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Profile ${index + 1}`}
              onClick={() => onImageSelect(image)}
              className="modal-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
