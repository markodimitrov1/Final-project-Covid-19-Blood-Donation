import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Component, useEffect, useState, useContext } from "react";
import { InputGroup } from "react-bootstrap";
import Axios from "axios";
import { Button, span } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "./Articles.css";
import Card from "react-bootstrap/Card";
import veles from './../sliki/veles.jpg';

const Articles = (props) => {
  const [list, setList] = useState([]);
  const [articlessExist, setArticlessExist] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 2;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(list.length / usersPerPage);
  const displayArticles = list.slice(pagesVisited, pagesVisited + usersPerPage).map(article => {
    return (<div>{(article.image) ? (<div><Card id='articlecard'>
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
    </div>) : (<div><Card id='articlecard'>
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
     )
    });

    const changePage = ({selected}) => {
      setPageNumber(selected);
    };

  useEffect(() => {
    Axios.post("http://localhost:3001/articles", {}).then((response) => {
      if (response.data.message) {
        setList([]);
        setArticlessExist(false);
      } else {
        setArticlessExist(true);
        setList(response.data);
      }
    });
  }, []);



  return (
    <div className="Articles">
      {(articlessExist) ? (<>{ displayArticles }</>) : (<>NEMA STATII</>)}
      <br/>
      <ReactPaginate previousLabel={"Назад"}
              nextLabel={"Напред"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
              />
    </div>
  );
};

export default Articles;
