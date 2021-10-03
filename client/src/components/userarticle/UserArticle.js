import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Component, useEffect, useState, useContext } from "react";
import { InputGroup } from "react-bootstrap";
import Axios from "axios";
import { Button, span } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ReactPaginate from "react-paginate";
import "./UserArticle.css";
import veles from './../sliki/veles.jpg';

const UserArticle = (props) => {
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [picture, setPicture] = useState();
  const [pictureurl, setPictureurl] = useState();
  const [userId, setUserId] = useState();
  const [avtor, setAvtor] = useState();
  const [list, setList] = useState([]);
  const [articlesExist, setArticlesExist] = useState();

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 2;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(list.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const displayArticles = list
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((article) => {
      return (<div>{(article.image) ? (<div><Card id='userarticlecard'>
        <Card.Header as="h5">{article.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
          <img id="articlepic" src={veles}/>  
            <p> {article.text} </p>
            <footer className="blockquote-footer">
              Автор <cite title="Source Title">{article.author}</cite>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
      <br/>
      </div>) : (<div><Card id='userarticlecard'>
        <Card.Header as="h5">{article.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p> {article.text} </p>
            <footer className="blockquote-footer">
              Автор <cite title="Source Title">{article.author}</cite>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
      <br/>
      </div>)}</div>
       
      );
    });

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setUserId(response.data.user[0].id);
        setAvtor(response.data.user[0].username);
        Axios.post("http://localhost:3001/myarticles", {
          userid: response.data.user[0].id,
        }).then((response) => {
          if (response.data.message) {
            setList([]);
            setArticlesExist(false);
          } else {
            setList(response.data);
            setArticlesExist(true);
            console.log(list);
          }
        });
      }
    });
  }, []);

  let onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPicture(event.target.file[0]);
      setPictureurl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const addArticle = () => {
    console.log(text);
    if (picture) {
      Axios.post("http://localhost:3001/addarticle", {
        userid: userId,
        picture: picture,
        title: title,
        text: text,
        author: avtor,
      }).then((response) => {
        console.log(response);
      });
    } else {
      Axios.post("http://localhost:3001/addarticle", {
        userid: userId,
        picture: null,
        title: title,
        text: text,
        author: avtor,
      }).then((response) => {
        console.log(response);
      });
    }
  };


  return (
    <div className="UserArticle">
      <Form id="userarticles">
        <Form.Group as={Row} controlId="formHorizontalFullname">
          <Form.Label column sm={5}>
            Насловна слика
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              type="file"
              onChange={onImageChange}
              accept="image/*"
            />
            <img src={pictureurl} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalUsername">
          <Form.Label column sm={5}>
            Наслов на статија
          </Form.Label>
          <Col sm={5}>
            <InputGroup className="mb-2">
              <Form.Control
                required
                id="inlineFormInputGroup"
                placeholder="Title"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={5}>
            Текст на статијата
          </Form.Label>
          <Col sm={5}>
            <textarea
            cols='80'
            rows='10'
              required
              maxlength="5000"
              type="text"
              placeholder="Text"
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 4, offset: 7 }}>
            <Button onClick={addArticle}>Додади статија</Button>
          </Col>
        </Form.Group>
      </Form>
        {(articlesExist) ? (<>{displayArticles}<br/>
      <ReactPaginate
        previousLabel={"Назад"}
        nextLabel={"Напред"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      /></>) : (<Card>
        <Card.Header as="h5" className='text-md-center'>НЕМАТЕ НАПИШАНО СВОИ СТАТИИ</Card.Header>

      </Card>)}
        
    </div>
  );
};

export default UserArticle;
