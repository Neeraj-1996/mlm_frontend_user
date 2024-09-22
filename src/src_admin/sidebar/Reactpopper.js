import React from 'react';
import { usePopper } from 'react-popper';

const Reactpropper = () => {
  // Create a state for the tooltip visibility
  const [isVisible, setIsVisible] = React.useState(false);

  // Refs for the tooltip and the trigger element
  const referenceRef = React.useRef(null);
  const popperRef = React.useRef(null);

  // Configure the Popper.js options
  const options = {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10], // Adjust the offset as needed
        },
      },
    ],
  };

  // Create Popper.js instance
  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    options
  );

  return (
    <div>
      <button
        ref={referenceRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        Hover over me
      </button>
      {isVisible && (
        <div
          ref={popperRef}
          style={{ ...styles.popper, background: 'lightgray', padding: '5px' }}
          {...attributes.popper}
        >
          This is a Neeraj 
        </div>
      )}
    </div>
  );
};

export default Reactpropper;
