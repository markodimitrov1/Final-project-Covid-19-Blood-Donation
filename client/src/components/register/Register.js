import React from "react";
import "./Register.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button, span } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import Axios from "axios";
import moment from 'moment';

const Register = (props) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(moment(new Date()));
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [city, setCity] = useState("");
  const [blood, setBlood] = useState("");
  const [covid, setCovid] = useState("");
  const spanpass = "Лозинката не се совпаѓа";
  const [ifspan, setIfspan] = useState(false);
  const [userexist, setUserexist] = useState(false);
  const [emailexist, setEmailexist] = useState(false);
  const spanusername = "Корисничкото име веќе постои";
  const spanemail = "Емаил адресата е претходно регистрирана";
  const [young, setYoung] = useState(false);
  const spandate = "Немате 16 години";
  const today = moment();
  // const maxyear = date.getFullYear() - 16;

  const checkusername = () => {
    Axios.post("http://localhost:3001/username", {
      username: username,
    }).then((response) => {
      console.log(response);
      if (response.data == username) {
        setUserexist(true);
        console.log("true");
      } else {
        setUserexist(false);
        console.log("false");
      }
    });
  };

  const addUser = () => {
  if(today.diff(date, 'years') > 15){
    setYoung(false);
    if (password == confirmpass) {
      setIfspan(false);
    } else {
      setIfspan(true);
    }
    Axios.post("http://localhost:3001/email", {
      email: email,
    }).then((response) => {
      if (response.data == email) {
        setEmailexist(true);
      } else {
        setEmailexist(false);
        Axios.post("http://localhost:3001/username", {
          username: username,
        }).then((response) => {
          console.log(response);
          if (response.data == username) {
            setUserexist(true);
          } else {
            setUserexist(false);
            if (!ifspan) {
              setUserexist(false);
              Axios.post("http://localhost:3001/register", {
                name: name,
                date: date,
                email: email,
                username: username,
                password: password,
                city: city,
                blood: blood,
                covid: covid,
              }).then((response) => {
                console.log("success");
                setShow2(false);
              });
            }
          }
        });
        console.log("false");
        
      }
    });
  }
  else{
    setYoung(true);
  }
  };

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => {
    setShow2(true);
    setUserexist(false);
    setUsername(false);
    setIfspan(false);
  };

  return (
    <div>
      <a
        onClick={handleShow2}
        className="registrirajse"
        style={{ cursor: "pointer" }}
      >
        регистрирај се.
      </a>

      <Modal show={show2} onHide={handleClose2} id="registracija" onSubmit={e => { e.preventDefault() }}>
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
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalFullname">
              <Form.Label column sm={5}>
                Дата на раѓање
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  required
                  type="date"
                  max={today}
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}
                />
                <div>
                    {young ? (
                      <span class="badge badge-danger">{spandate}</span>
                    ) : (
                      <></>
                    )}
                  </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={5}>
                Е-маил адреса
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <div>
                    {emailexist ? (
                      <span class="badge badge-danger">{spanemail}</span>
                    ) : (
                      <></>
                    )}
                  </div>
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
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                </InputGroup>
                <div>
                    {userexist ? (
                      <span class="badge badge-danger">{spanusername}</span>
                    ) : (
                      <></>
                    )}
                  </div>
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
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
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
                  onChange={(event) => {
                    setConfirmpass(event.target.value);
                  }}
                />
                <div>
                  {ifspan ? (
                    <span class="badge badge-danger">{spanpass}</span>
                  ) : (
                    <></>
                  )}
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalFullname">
              <Form.Label column sm={5}>
                Град
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  as="select"
                  className="mr-sm-2"
                  id="inlineFormCustomSelect"
                  custom
                  required
                  aria-required="true"
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                >
                  <option value="" selected disabled>
                    Choose..
                  </option>
                  <option value="Скопје">Скопје</option>
                  <option value="Велес">Велес</option>
                  <option value="Демир Капија">Демир Капија</option>
                  <option value="Кавадарци">Кавадарци</option>
                  <option value="Неготино">Неготино</option>
                  <option value="Свети Николе">Свети Николе</option>
                  <option value="Берово">Берово</option>
                  <option value="Виница">Виница</option>
                  <option value="Делчево">Делчево</option>
                  <option value="Кочани">Кочани</option>
                  <option value="Македонска Каменица">
                    Македонска Каменица
                  </option>
                  <option value="Пехчево">Пехчево</option>
                  <option value="Пробиштип">Пробиштип</option>
                  <option value="Штип">Штип</option>
                  <option value="Дебар">Дебар</option>
                  <option value="Кичево">Кичево</option>
                  <option value="Македонски Брод">Македонски Брод</option>
                  <option value="Охрид">Охрид</option>
                  <option value="Струга">Струга</option>
                  <option value="Богданци">Богданци</option>
                  <option value="Валандово">Валандово</option>
                  <option value="Гевгелија">Гевгелија</option>
                  <option value="Радовиш">Радовиш</option>
                  <option value="Струмица">Струмица</option>
                  <option value="Битола">Битола</option>
                  <option value="Демир Хисар">Демир Хисар</option>
                  <option value="Крушево">Крушево</option>
                  <option value="Прилеп">Прилеп</option>
                  <option value="Ресен">Ресен</option>
                  <option value="Гостивар">Гостивар</option>
                  <option value="Тетово">Тетово</option>
                  <option value="Кратово">Кратово</option>
                  <option value="Крива Паланка">Крива Паланка</option>
                  <option value="Куманово">Куманово</option>
                </Form.Control>
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
                  onChange={(event) => {
                    setBlood(event.target.value);
                  }}
                >
                  <option value="" selected disabled>
                    Choose...
                  </option>
                  <option value="O-">O-</option>
                  <option value="O+">O+</option>
                  <option value="A-">A-</option>
                  <option value="A+">A+</option>
                  <option value="B-">B-</option>
                  <option value="B+">B+</option>
                  <option value="AB-">AB-</option>
                  <option value="AB+">AB+</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={5}>
                  Имате антитела (COVID-19)?
                </Form.Label>
                <Col sm={4}>
                  <Form.Check
                    required
                    type="radio"
                    label="ДА"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    value="ДА"
                    checked={covid === "ДА"}
                    onClick={() => setCovid("ДА")}
                  />
                  <Form.Check
                    type="radio"
                    label="НЕ"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    value="НЕ"
                    checked={covid === "НЕ"}
                    onClick={() => setCovid("НЕ")}
                  />
                </Col>
              </Form.Group>
            </fieldset>

            <Form.Group as={Row}>
              <Col sm={{ span: 4, offset: 8 }}>
                <Button type = 'submit' onClick={addUser}>Регистрирај се</Button>
              </Col>
            </Form.Group>
          </Form>

          <br />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Register;
