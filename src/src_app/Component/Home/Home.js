import React, { useState, useEffect } from 'react';
import './Homepage.css'
import Footer from '../Footer/Footer';
import ImageSlider from '../Slider/Slider';
// import Homepart1 from '../Homesm/Home1';
// import Homeplan from '../Homesm/Home2';
import axios from 'axios';
import Homepart1 from './Home1';
import Homeplan from './Home2';
import Header from '../Headerhome/Headerhome';
import baseUrlapp from '../Url/Urlapp';
import baseUrlAdmin from '../Url/Url';
import './Homepage.css'

const HomePage = () => {
  


  const [imageUrls1, setImageUrls] = useState([]);

  // This function fetches slider images from the API
  const handleGetSliderImg = async () => {
    try {

      const response = await axios.get(baseUrlAdmin+'getSliderImg');
      if (response.data.statusCode === 200) {
        const images = response.data.data.map(item => item.sliderImg);
        console.log("images",images);
        setImageUrls(images);
      } else {
        console.error('API call was not successful:', response.data.message);
      }
    } catch (error) {
      console.error('API call error:', error);

    }
  };

  useEffect(() => {
    handleGetSliderImg();
  }, []);
  console.log("imgae",imageUrls1)

  const handleBack = () => {
    // Implement back navigation or functionality here
    console.log('Back button clicked');
  };
  return (
    <div className="home-container">
      {/* <h1>Home Page</h1> */}
      <Header name="Company Name" onBack={handleBack} />
      <ImageSlider imageUrls={imageUrls1} />
     <Homepart1 />
     <Homeplan />
    <Footer />
    </div>
  );
};

export default HomePage;



  // const imageUrls = [
  //   'https://st2.depositphotos.com/2101611/8478/i/950/depositphotos_84785616-stock-photo-businessman-hand-pointing-on-mlm.jpg',
  //   'https://media.istockphoto.com/id/1202462935/photo/network-is-painted-by-hand-with-chalk-on-blackboard.jpg?s=2048x2048&w=is&k=20&c=sCL6UQzhGweD0YSQMQ4xF8SegYGS5iJCFv7Y0mPv1TE=',
  //   'https://media.istockphoto.com/id/657265256/photo/affiliate-marketing-business-concept.jpg?s=2048x2048&w=is&k=20&c=4ReDfNi72QPOjearrUC5yNeBWt8iB_zCi6mwWdokfgE=',
  // ];