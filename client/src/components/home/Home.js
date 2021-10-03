import React from "react";
import './Home.css';
import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.css";
import cr1 from './../sliki/cr1.jpg';
import cr2 from './../sliki/cr2.jpg';
import cr3 from './../sliki/cr3.jpg';
 
const Home = (props) => {
  return (
    <div className='Home'>
      <Carousel interval={3000} className='cr'>
        <Carousel.Item>
          <img
            className="crimg "
            src={cr1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="crimg"
            src={cr2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="crimg"
            src={cr3}
            alt="Third slide"
          />

        </Carousel.Item>
      </Carousel>
      </div>
  );
};

export default Home;
