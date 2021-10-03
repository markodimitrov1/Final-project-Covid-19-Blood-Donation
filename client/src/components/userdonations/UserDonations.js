import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Component, useEffect, useState, useContext } from "react";
import { InputGroup } from "react-bootstrap";
import Axios from "axios";
import { Button, span, Table } from "react-bootstrap";
import { FaCreativeCommonsRemix } from "react-icons/fa";
import Moment from "moment";
import ReactPaginate from "react-paginate";
import "./UserDonations.css";

const UserDonations = (props) => {
  const [place, setPlace] = useState();
  const [city, setCity] = useState();
  const [volume, setVolume] = useState();
  const [userid, setUserid] = useState();
  const [date, setDate] = useState(new Date());
  const [list, setList] = useState([]);
  const [donationsExist, setDonationsExist] = useState();

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setUserid(response.data.user[0].id);
        Axios.post("http://localhost:3001/mydonations", {
          userid: response.data.user[0].id,
        }).then((response) => {
          if (response.data.message) {
            setList([]);
            setDonationsExist(false);
            console.log(userid);
          } else {
            setList(response.data);
            setDonationsExist(true);
            console.log(response.data);
          }
        });
      }
    });
  }, []);

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 7;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(list.length / usersPerPage);
  const displayDonations = list
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((card) => {
      return (
        <tr>
          <td>{card.place}</td>
          <td>{card.city}</td>
          <td>{card.volume}мл</td>
          <td>{Moment(card.date).format("DD/MM/YYYY")}</td>
        </tr>
      );
    });

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const addDonation = () => {
    Axios.post("http://localhost:3001/adddonation", {
      userid: userid,
      place: place,
      city: city,
      volume: volume,
      date: date,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="UserArticle">
      <Form id='userdonors'>
        <Form.Group as={Row} controlId="formHorizontalUsername">
          <Form.Label column sm={5}>
            Локација:
          </Form.Label>
          <Col sm={5}>
            <InputGroup className="mb-2">
              <Form.Control
                required
                id="inlineFormInputGroup"
                placeholder="Place/Hospital"
                onChange={(event) => {
                  setPlace(event.target.value);
                }}
              />
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalFullname">
          <Form.Label column sm={5}>
            Град:
          </Form.Label>
          <Col sm={5}>
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
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalUsername">
          <Form.Label column sm={5}>
            Волумен(мл):
          </Form.Label>
          <Col sm={5}>
            <InputGroup className="mb-2">
              <Form.Control
                required
                id="inlineFormInputGroup"
                placeholder="Volume in ml"
                onChange={(event) => {
                  setVolume(event.target.value);
                }}
              />
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalFullname">
          <Form.Label column sm={5}>
            Дата:
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              required
              type="date"
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 4, offset: 7 }}>
            <Button onClick={addDonation}>ВНЕСИ ДОНАЦИЈА</Button>
          </Col>
        </Form.Group>
      </Form>
      {donationsExist ? (<>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Локација</th>
              <th>Град</th>
              <th>Волумен</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>{displayDonations}</tbody>
        </Table>
        <br />
      <ReactPaginate
        previousLabel={"< Назад"}
        nextLabel={"Напред >"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      /></>
      ) : (
        <Table striped bordered hover  >
          <thead>
            <tr>
              <th>Локација</th>
              <th>Град</th>
              <th>Волумен</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" className='text-md-center'><strong>НЕМАТЕ ВНЕСЕНО ДОНАЦИИ</strong></td>
            </tr>
            </tbody>
        </Table>
      )}
      
    </div>
  );
};

export default UserDonations;
