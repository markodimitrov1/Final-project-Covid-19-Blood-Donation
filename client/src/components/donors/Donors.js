import React from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Axios from "axios";
import { Component, useEffect, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { Button, span } from "react-bootstrap";
import { LoginContext } from "../../context/LoginContext";
import ReactPaginate from "react-paginate";
import "./Donors.css";
import defaultuser from './../sliki/user.jpg';
import cr3 from './../sliki/unnamed.jpg'; 

const Donors = (props) => {
  const [type, setType] = useState("Сите");
  const [city, setCity] = useState("Сите");
  const [covid, setCovid] = useState("Сите");
  const [list, setList] = useState([]);
  const [userExist, setUserExist] = useState();

  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
  }
  
  const images = importAll(require.context('./../sliki', false, /\.(png|jpe?g|svg)$/));


  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 12;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(list.length / usersPerPage);
const displayUsers = list.slice(pagesVisited, pagesVisited + usersPerPage).map(user => {
  return (
    <Col sm={6}  lg={3}>
              <Card bg="danger" className='karticka'>
                {user.picture ? (<Card.Img variant="top" className="userpic" src={images[user.picture].default} />) : (<Card.Img variant="top" className="userpic" src={defaultuser} />)}
                <Card.Body>
                  <Card.Title><b>{user.username}</b></Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem ><b>Крвна група: {user.blood}</b></ListGroupItem>
                  <ListGroupItem><b>Град: {user.city}</b></ListGroupItem>
                  <ListGroupItem>
                    <b>Антитела (КОВИД-19): {user.covid}</b>
                  </ListGroupItem>
                  <ListGroupItem><b>Емаил адреса: {user.email}</b></ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
  )
});

const changePage = ({selected}) => {
  setPageNumber(selected);
};

  useEffect(() => {
    searchDonors();
  }, []);

  const searchDonors = () => {
    Axios.post("http://localhost:3001/donors", {
      type: type,
      city: city,
      covid: covid,
    }).then((response) => {
      if (response.data.message) {
        setList([]);
        setUserExist(false);
      } else {
        setUserExist(true);
        setList(response.data);
        console.log(response.data);
      }
      console.log(list);
    });
  };


  const search = () => {
    return (
      <div className="Donors">
        <Form className="formclass">
          <Form.Group className="rowclass" as={Row}>
            <Form.Label column md={2}>
              Изберете крвна група:
            </Form.Label>
            <Col className='colclass' md={1}>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <option value="Сите" selected>
                  Сите
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
            <Form.Label column md={2}>
              Изберете Град:
            </Form.Label>
            <Col md={2} className='colclass'>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              >
                <option value="Сите" selected>
                  Сите
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
                <option value="Македонска Каменица">Македонска Каменица</option>
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
            <Form.Label column md={2}>
              Антитела (КОВИД-19):
            </Form.Label>
            <Col md={1} className='colclass'>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={(event) => {
                  setCovid(event.target.value);
                }}
              >
                <option value="Сите" selected>
                  Сите
                </option>
                <option value="ДА">ДА</option>
                <option value="НЕ">НЕ</option>
              </Form.Control>
            </Col>
            <Col md={2}>
              <Button variant="danger" onClick={searchDonors}>Барај</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
      
    );
  };
  return (
    <div>
      {search()}
      <br/>
      <CardGroup>{(userExist) ? (<>
              {displayUsers}
              </>
      ) : (
        <Card>
        <Card.Header as="h5" className='text-md-center'>НЕ СЕ ПРОНАЈДЕНИ ДОНОРИ</Card.Header>
      </Card>
      )}</CardGroup><br/>
      {(userExist) ? (<><ReactPaginate previousLabel={"Назад"}
              nextLabel={"Напред"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
              /></>):(<></>)}
              
    </div>
  );
};

export default Donors;
