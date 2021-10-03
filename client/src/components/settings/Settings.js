import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Component, useEffect, useState, useContext } from "react";
import { InputGroup } from "react-bootstrap";
import Axios from "axios";
import { Button, span } from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';
import "./Settings.css";

const Settings = (props) => {
  const [username, setUsername] = useState("");
  const [currentusername, setCurrentusername] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [currentemail, setCurrentemail] = useState("");
  const [currentcovid, setCurrentcovid] = useState("");
  const [covid, setCovid] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState();
  const [pictureurl, setPictureurl] = useState();
  const [userexist, setUserexist] = useState(false);
  const [shortpass, setShortpass] = useState(false);
  const spanpass = "Лозинката треба да биде подолга од 8 знаци";
  const spanusername = "Корисничкото име веќе постои";
  const [emailexist, setEmailexist] = useState(false);
  const spanemail = "Емаил адресата е претходно регистрирана";
  

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setUserId(response.data.user[0].id);
              setCurrentemail(response.data.user[0].email);
              setCurrentusername(response.data.user[0].username);
              setCurrentcovid(response.data.user[0].covid);
      }
    });
  }, []);

 

  let onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPicture(event.target.files[0]);
      setPictureurl(URL.createObjectURL(event.target.files[0]));
      console.log(picture);
    }
  };

  const AddPicture = () => {
    if (picture) {
      Axios.post("http://localhost:3001/picture", {
        id: userId,
        picture: pictureurl,
      }).then((response) => {
        console.log(response);
      });
    }
  };

  const NewPassword = () => {
    if (password.length > 8) {
      Axios.post("http://localhost:3001/newpass", {
        id: userId,
        password: password,
      }).then((response) => {
        console.log(response);
      });
    } else {
      setShortpass(true);
    }
  };

  const UpdateEmail = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/email", {
      email: email,
    }).then((response) => {
      if (response.data == email) {
        setEmailexist(true);
      } else {
        setEmailexist(false);
        Axios.post("http://localhost:3001/updateemail", {
          id: userId,
          email: email,
        }).then((response) => {
          console.log(response);
          setCurrentemail(email);
        });
      }
    });
  };

  const NewUsername = () => {
    setCurrentusername(username);
    Axios.post("http://localhost:3001/username", {
      username: username,
    }).then((response) => {
      if (response.data == username) {
        setUserexist(true);
      } else {
        setUserexist(false);
        Axios.post("http://localhost:3001/newusername", {
          id: userId,
          username: username,
        }).then((response) => {
          console.log(response);
          setCurrentusername(username);
        });
      }
    });
  };

  const UpdateCovid = () => {
    setCurrentcovid(covid);
    if (currentcovid != covid) {
      Axios.post("http://localhost:3001/updatecovid", {
        id: userId,
        covid: covid,
      }).then((response) => {
        console.log(response);
        if (response.data.err) {
          console.log(response);
        } else {
          setCurrentcovid(covid);
        }
      });
    }
  };

  return (
    <div className="Settings">
      <Form id='settingsform'>
        <Form.Group as={Row}>
          <Form.Label column sm={5}>
            Промени профилна слика
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              type="file"
              onChange={onImageChange}
              accept="image/*"
            />
            <img src={pictureurl} />
          </Col>
          <Col sm={2}>
            <Button onClick={AddPicture}>Промени</Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalUsername">
          <Form.Label column sm={5}>
            Ново Корисничко име
          </Form.Label>
          <Col sm={5}>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                id="inlineFormInputGroup"
                placeholder={currentusername}
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
          <Col sm={2}>
            <Button onClick={NewUsername}>Промени</Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={5}>
            Е-маил адреса
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              required
              type="email"
              placeholder={currentemail}
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
          <Col sm={2}>
            <Button type="submit" onClick={UpdateEmail}>
              Промени
            </Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={5}>
            Нова Лозинка
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              type="password"
              placeholder="new password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div>
              {shortpass ? (
                <span class="badge badge-danger">{spanpass}</span>
              ) : (
                <></>
              )}
            </div>
          </Col>
          <Col sm={2}>
            <Button onClick={NewPassword}>Промени</Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={5}>
            Прележавте КОВИД-19?
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              as="select"
              className="mr-sm-2"
              id="inlineFormCustomSelect"
              onChange={(event) => {
                setCovid(event.target.value);
              }}
            >
              <option value={currentcovid} selected disabled>
                    {currentcovid}
                  </option>
                  <option value="НЕ">НЕ</option>
                  <option value="ДА">ДА</option>

              {/* {currentcovid == "ДА" ? (
                <>
                  <option value={currentcovid} selected>
                    {currentcovid}
                  </option>
                  <option value="НЕ">НЕ</option>
                </>
              ) : (
                <>
                  <option value={currentcovid} selected>
                    {currentcovid}
                  </option>
                  <option value="ДА">ДА</option>
                </>
              )} */}
            </Form.Control>
          </Col>
          <Col sm={2}>
            <Button onClick={UpdateCovid}>Промени</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Settings;
