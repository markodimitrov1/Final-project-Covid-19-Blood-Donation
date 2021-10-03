import React from "react";
import "./Eligibility.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";

const Eligibility = (props) => {
  let i = 0;
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => {
    i = 0;
    setShow3(false);
    setShow4(true);
  };
  const handleShow3 = () => setShow3(true);

  const [show4, setShow4] = useState(true);

  function change() {
    var array = [
      "Дали си над 70 години ?",
      "Дали сте се тетовирале во последните 4 месеци ?",
      "Дали сте бремени или сте се породиле во последните 6 недели ?",
      "Дали имате срцеви заболувања ?",
      "Дали нивото на железо ви е ниско ?",
      "Дали некогаш сте користеле дрога ?",
      "Подобни сте за донирање на крв !"
    ];
    var par = document.getElementById("par");
    if (i == 6) {
        par.setAttribute("data-content", array[i]);
      i = 0;
      setShow4(false);
    } else {
      par.setAttribute("data-content", array[i]);
      i = i + 1;
    }
  }

  function changeyes() {
    var par = document.getElementById("par");
    par.setAttribute("data-content", "Не сте подобни за донирање на крв!");
    setShow4(false);
  }

  return (
    <div className="Eligibility">
      <Nav.Link className="nvlink maginleft" onClick={handleShow3}>
        Подобност
      </Nav.Link>
      <Modal show={show3} onHide={handleClose3} className="mdl">
        <Modal.Header closeButton>
          <Modal.Title>Дали си подобен за донирање крв?</Modal.Title>
        </Modal.Header>

        <Modal.Body >
          <Container>
            <Row>
              <h2 id="par" data-content="Дали си под 16 години ?"></h2>
            </Row>
            <br/>
            <Row className="kopcinja">
              { show4 ? <><button show={show4} className="btn btn-danger btyes" onClick={changeyes}>
                 <h4>ДА</h4>
                </button>
              <button className="btn btn-danger btno" onClick={change}>
                <h4>НЕ</h4>    
              </button> </>: null}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Eligibility;
