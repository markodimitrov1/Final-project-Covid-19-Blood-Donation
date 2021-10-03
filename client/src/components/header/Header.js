import React, { useEffect } from "react";
import "./Header.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useContext } from "react";
// import { useCookies } from "react-cookie";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button, span } from "react-bootstrap";
import logo from "./../sliki/logo.png";
import { FaUser, FaUserEdit } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import Eligibility from "../eligibility/Eligibility";
import { Row, Col, InputGroup } from "react-bootstrap";
import Register from "../register/Register";
import Axios from "axios";
import { NavLink, Router } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import cookie from "react-cookie";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import $ from "jquery";

const Header = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [span, setSpan] = useState("");
  const [ifspan, setIfspan] = useState(false);

  const { setIsAuth, isAut } = useContext(LoginContext);

  // const [cookies, setCookies, removeCookies] = useCookies(["user"]);

  // function Login() {
  //   return (
  //     <button className="najava">
  //       <Nav.Link className="najavanav" onClick={handleShow}>
  //         <FaUser /> Најави се
  //       </Nav.Link>
  //     </button>
  //   );
  // }

  Axios.defaults.withCredentials = true;

  const userLogout = () => {
    Axios.post("http://localhost:3001/logout", {}).then((response) => {
      //tuka proveri
    });
    window.location.reload(false);
  };

  // $(".odjava").click(function () {
  //  $.cookie("userid", "", -1);
  // })

  const userLogin = () => {
    if (username != "" && password != "") {
      Axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
      }).then((response) => {
        //tuka proveri
        console.log(response + " response");

        if (response.data.message) {
          console.log(response.data.message);
          setSpan(response.data.message);
          setIfspan(true);
        } else {
          setIsAuth(true);
          setLoginStatus(response.data[0].username);
          handleClose();
        }
      });
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setIsAuth(true);
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  // const userLogout = () => {
  //   Axios.delete("http://localhost:3001/logout", {
  //   }).then((response) => {

  //     response.session.destroy();

  //     }

  // };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [show2, setShow2] = useState(false);
  // const handleClose2 = () => setShow2(false);
  // const handleShow2 = () => setShow2(true);
  // const register = () => {
  //   setShow2(true);
  //   setShow(false);
  // };

  return (
    <div className="Header navbar">
      <Navbar className="nbar" expand="lg">
        <NavLink exact to="/">
          <img
            style={{ width: "130px", height: "65px" }}
            className="logoimg"
            src={logo}
          />
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navmenu maringleft">
            <Eligibility />
            <NavLink to="/donors" className="nvlink nvline marginleft">
              Донори
            </NavLink>
            <NavLink to="/articles" className="nvlink marginleft">
              Статии
            </NavLink>
            <div>
              {isAut ? (
                <div>
                  <NavLink to="/settings" className="nvlink marginleft">
                    <FaUserEdit /> {loginStatus}
                  </NavLink>
                  <OverlayTrigger
                     placement="bottom" overlay=
                    {<Tooltip >Одјави се</Tooltip>}>
                    <button className="najava odjava" onClick={userLogout}>
                      <GrLogout />
                    </button>
                  </OverlayTrigger>
                </div>
              ) : (
                <button className="najava marginleft">
                  <Nav.Link className="najavanav" onClick={handleShow}>
                    <FaUser /> Најави се
                  </Nav.Link>
                </button>
              )}
            </div>

            <Modal
              className="modal-najava"
              show={show}
              onHide={handleClose}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Најава</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form className="form">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    {" "}
                    Корисничко име
                  </Form.Label>
                  <Form.Control
                    required
                    placeholder="Корисничко име"
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <br />
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Лозинка
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Внесете лозинка"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />

                  <div>
                    {ifspan ? (
                      <span class="badge badge-danger">{span}</span>
                    ) : (
                      <></>
                    )}
                  </div>

                  <br />
                  <div className="modal-div">
                    <p>
                      <p>Доколку немаш профил, </p>
                      <Register />
                      {/* <a
                        onClick={register}
                        className="registrirajse"
                        style={{ cursor: "pointer" }}
                      >
                        регистрирај се.
                      </a> */}
                    </p>
                    <Button
                      type="submit"
                      className="button-najava"
                      onClick={userLogin}
                    >
                      Најави се
                    </Button>
                  </div>
                </Form>
                <br />
              </Modal.Body>
            </Modal>

            {/* <Modal show={show2} onHide={handleClose2} id='registracija'>
              <Modal.Header closeButton>
                <Modal.Title>Регистрација</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form>
                  <Form.Group as={Row} controlId="formHorizontalFullname">
                    <Form.Label column sm={5}>
                      Име и Презиме
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Full Name"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalFullname">
                    <Form.Label column sm={5}>
                      Дата на раѓање
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control required type="date" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={5}>
                      Е-маил адреса
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control required type="email" placeholder="Email" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalUsername">
                    <Form.Label column sm={5}>
                      Корисничко име
                    </Form.Label>
                    <Col sm={7}>
                      <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                          <InputGroup.Text>@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          required
                          id="inlineFormInputGroup"
                          placeholder="Username"
                        />
                      </InputGroup>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={5}>
                      Лозинка
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={5}>
                      Потврдете ја лозинката
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalFullname">
                    <Form.Label column sm={5}>
                      Град
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control required placeholder="City" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={5}>
                      Изберете крвна група
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control
                        as="select"
                        className="mr-sm-2"
                        id="inlineFormCustomSelect"
                        custom
                        required
                        aria-required="true"
                      >
                        <option value="" selected disabled>
                          Choose...
                        </option>
                        <option value="1">O-</option>
                        <option value="2">O+</option>
                        <option value="3">A-</option>
                        <option value="4">A+</option>
                        <option value="5">B-</option>
                        <option value="6">B+</option>
                        <option value="7">AB-</option>
                        <option value="8">AB+</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <fieldset>
                    <Form.Group as={Row}>
                      <Form.Label as="legend" column sm={5}>
                        Имате ли прележано COVID-19?
                      </Form.Label>
                      <Col sm={4}>
                        <Form.Check
                          required
                          type="radio"
                          label="ДА"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios1"
                        />
                        <Form.Check
                          type="radio"
                          label="НЕ"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios2"
                        />
                      </Col>
                    </Form.Group>
                  </fieldset>

                  <Form.Group as={Row}>
                    <Col sm={{ span: 4, offset: 8 }}>
                      <Button type="submit">Регистрирај се</Button>
                    </Col>
                  </Form.Group>
                </Form>

                <br />
              </Modal.Body>
            </Modal> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
