import React from 'react';
import Homepart1 from './Home1';
import Homeplan from './Home2';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

function HomePage() {
  return (
    <div>
    
   
      <div style={{height:'180px',marginTop:'70px'}}>
      <AwesomeSlider  style={{height:'166px' }} organicArrows={true} bullets={false}>
    <div > <img src={require("../../asset/images/slider/1n.jpeg")} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" , }} /></div>
    <div > <img src={require("../../asset/images/slider/2n.jpeg")} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" , }}/></div>
    <div > <img src={require("../../asset/images/slider/3n.jpeg")}  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" , }}/></div>
    <div > <img src={require("../../asset/images/slider/4n.jpeg")}  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" , }}/></div>
    <div > <img src={require("../../asset/images/slider/5n.jpeg")}  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" , }}/></div>
    <div > <img src={require("../../asset/images/slider/6n.jpeg")}  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" , }} /></div>
    <div > <img src={require("../../asset/images/slider/7n.jpeg")}  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" , }}/></div>
    <div > <img src={require("../../asset/images/slider/8n.jpeg")}  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" , }}/></div>
    <div > <img src={require("../../asset/images/slider/9n.jpeg")}  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" , }} /></div>
    <div > <img src={require("../../asset/images/slider/10n.jpeg")}  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" , }}/></div>

  </AwesomeSlider>
  </div>

      <div>
        <Homepart1 />
      </div>
      

      <div>
        <Homeplan />
      </div>
    </div>
  );
}

export default HomePage;

