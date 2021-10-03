import React from "react";
import "./Footer.css";
import { Row, Col, Container } from "react-bootstrap";
import feit from './../sliki/feit.jpg';
import ukim from './../sliki/ukim.jfif';

const Footer = (props) => {
  return (
    <div className="footer">
      <Row >
      <Col md={4}  className='ftukim' >
      <img src={ukim} style={{height:'80px'}}></img>
      </Col>

      <Col md={4}>
        
      </Col>
      <Col className='ftfeit' md={4} >
        <img src={feit} style={{height:'80px'}}></img>
      </Col>
      </Row>
    </div>
  );
};

export default Footer;