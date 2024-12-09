import React, { useState } from 'react';
import WorldFlag from 'react-world-flags';
import './Flag.css'; // Ensure your CSS is imported correctly

const CustomDropdownHome = ({ countries, selectedCountry, onSelectCountry }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (country) => {
    onSelectCountry(country);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown1">
      <div className="custom-dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <WorldFlag code={selectedCountry.code} style={{ width: '30px', height: '20px', marginRight: '10px' }} />
        {/* <span>{selectedCountry.nativeName}</span> */}
      </div>

      {isOpen && (
        <div className="custom-dropdown-list1">
          {countries.map((country, index) => (
            <div
              key={country.code}
              className={`custom-dropdown-item ${index % 2 === 0 ? 'first-in-row' : ''}`}
              onClick={() => handleSelect(country)}
            >
              <WorldFlag code={country.code} style={{ width: '20px', height: '15px', marginRight: '10px' }} />
              {country.nativeName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdownHome;
