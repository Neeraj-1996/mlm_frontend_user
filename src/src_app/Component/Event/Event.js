import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VIPEvents.css';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import baseUrlAdmin from '../Url/Url';

const VIPEvents = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [eventsData, setEventsData] = useState({ all: [], inProgress: [], notStarted: [], ended: [] });
  const handleBackClick = () => navigate(-1);

  useEffect(() => { axios.get(baseUrlAdmin+'getEventRecords')
    .then((response) => {
      const eventData = response.data.data;
      const categorizedEvents = {
        all: eventData,
        inProgress: eventData.filter(event => new Date(event.startDate) <= new Date() && new Date(event.endDate) > new Date()), // Events currently in progress
        notStarted: eventData.filter(event => new Date(event.startDate) > new Date()), // Events that have not started yet
        ended: eventData.filter(event => new Date(event.endDate) < new Date()) // Events that have ended
      };
      setEventsData(categorizedEvents);
    })
    .catch((error) => {
      console.error('Error fetching events:', error);
    });
  }, []);

  return (
    <div className="vip-events">
      <Header name="Events" onBack={handleBackClick} />

      <div className="header1">
        <div
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </div>
        {/* <div
          className={`tab ${activeTab === 'inProgress' ? 'active' : ''}`}
          onClick={() => setActiveTab('inProgress')}
        >
          In Progress
        </div> */}
        <div
          className={`tab ${activeTab === 'notStarted' ? 'active' : ''}`}
          onClick={() => setActiveTab('notStarted')}
        >
          Not Started
        </div>
        <div
          className={`tab ${activeTab === 'ended' ? 'active' : ''}`}
          onClick={() => setActiveTab('ended')}
        >
          Ended
        </div>
      </div>

      <div className="events-content">
        {eventsData[activeTab].map((event) => (
          <div key={event._id} className="event-card">
            <img src={event.eventImg} alt={`Event ${event.title}`} className="event-image" />
            <div className="event-detail">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Start Date: {new Date(event.startDate).toLocaleString()}</p>
              <p>End Date: {new Date(event.endDate).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VIPEvents;

// import React, { useState } from 'react';
// import './VIPEvents.css';
// import Header from '../Header/Header';
// import { useNavigate } from 'react-router-dom';

// const eventsData = {
//   all: [
//     { id: 1, status: 'All', image: 'https://via.placeholder.com/300', detail: 'Event detail for image 1' },
//     { id: 2, status: 'All', image: 'https://via.placeholder.com/300', detail: 'Event detail for image 2' },
//     { id: 3, status: 'All', image: 'https://via.placeholder.com/300', detail: 'Event detail for image 3' },
//   ],
//   inProgress: [
//     { id: 4, status: 'In Progress', image: 'https://via.placeholder.com/300', detail: 'Event detail for image 4' },
//     { id: 5, status: 'In Progress', image: 'https://via.placeholder.com/300', detail: 'Event detail for image 5' },
//   ],
//   notStarted: [
//     { id: 6, status: 'Not Started', image: 'https://via.placeholder.com/300', detail: 'Event detail for image 6' },
//   ],
//   ended: [
//     { id: 7, status: 'Ended', image: 'https://via.placeholder.com/300', detail: 'Event detail for image 7' },
//   ],
// };

// const VIPEvents = () => {
//   const navigate = useNavigate();
//   const handleBackClick = () => {
//     navigate(-1); // Navigates back to the previous page
//   };
//   const [activeTab, setActiveTab] = useState('all');

//   return (
//     <div className="vip-events">
//        <Header name="Events" onBack={handleBackClick} />

//       <div className="header1">
//         <div
//           className={`tab ${activeTab === 'all' ? 'active' : ''}`}
//           onClick={() => setActiveTab('all')}
//         >
//           All
//         </div>
//         <div
//           className={`tab ${activeTab === 'inProgress' ? 'active' : ''}`}
//           onClick={() => setActiveTab('inProgress')}
//         >
//           In Progress
//         </div>
//         <div
//           className={`tab ${activeTab === 'notStarted' ? 'active' : ''}`}
//           onClick={() => setActiveTab('notStarted')}
//         >
//           Not Started
//         </div>
//         <div
//           className={`tab ${activeTab === 'ended' ? 'active' : ''}`}
//           onClick={() => setActiveTab('ended')}
//         >
//           Ended
//         </div>
//       </div>

//       <div className="events-content">
//         {eventsData[activeTab].map((event) => (
//           <div key={event.id} className="event-card">
//             <img src={event.image} alt={`Event ${event.id}`} className="event-image" />
//             <div className="event-detail">{event.detail}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VIPEvents;
