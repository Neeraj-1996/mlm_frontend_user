
import React from 'react';
import './Homepage.css'
import Footer from '../Footer/Footer';
import ImageSlider from '../Slider/Slider';
// import Homepart1 from '../Homesm/Home1';
// import Homeplan from '../Homesm/Home2';
import Homepart1 from './Home1';
import Homeplan from './Home2';
import Header from '../Headerhome/Headerhome';
import './Homepage.css'

const HomePage = () => {
  
  const imageUrls = [
    'https://st2.depositphotos.com/2101611/8478/i/950/depositphotos_84785616-stock-photo-businessman-hand-pointing-on-mlm.jpg',
    'https://media.istockphoto.com/id/1202462935/photo/network-is-painted-by-hand-with-chalk-on-blackboard.jpg?s=2048x2048&w=is&k=20&c=sCL6UQzhGweD0YSQMQ4xF8SegYGS5iJCFv7Y0mPv1TE=',
    'https://media.istockphoto.com/id/657265256/photo/affiliate-marketing-business-concept.jpg?s=2048x2048&w=is&k=20&c=4ReDfNi72QPOjearrUC5yNeBWt8iB_zCi6mwWdokfgE=',
  ];
  const handleBack = () => {
    // Implement back navigation or functionality here
    console.log('Back button clicked');
  };
  return (
    <div className="home-container">
      {/* <h1>Home Page</h1> */}
      <Header name="Company Name" onBack={handleBack} />
      <ImageSlider imageUrls={imageUrls} />
     <Homepart1 />
     <Homeplan />
    <Footer />
    </div>
  );
};

export default HomePage;
