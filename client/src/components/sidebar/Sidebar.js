import React, { Component,  useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { LoginContext } from "../../context/LoginContext";
import "./Sidebar.css";
import defaultuser from './../sliki/user.jpg';
import moment from 'moment';


const Sidebar = (props) => {

  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [picture, setPicture] = useState();
  const data = new FormData();
  const [date, setDate] = useState(moment(new Date()));
  const today = moment();
  const [donacija, setDonacija] = useState('');

  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
  }
  
  const images = importAll(require.context('./../sliki', false, /\.(png|jpe?g|svg)$/));
  

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setName(response.data.user[0].name);
        setUser(response.data.user[0].id);
        setPicture(response.data.user[0].picture);
        console.log(response.data.user[0].id);
        Axios.post("http://localhost:3001/mydonations", { userid: response.data.user[0].id }).then(
          (response) => {
            if (response) {
              if (response.data.message) {
                setDonacija("Немате внесено донации");
              } else{
                const days = today.diff(moment(new Date(response.data[0].date)), 'days');
                console.log(days);
                if(days > 92){
                  setDonacija("Поминати се 3 месеци     од послена донација");
                } else {
                  setDonacija("Можете да донирате      повторно за " + (92 - days) + " дена");
                }
              }
            }
          }
        );
        // data.append(response.data.user[0].picture);
        // setPicture(URL.createObjectURL(response.data.user[0].picture));
      }
    });
  }, []);
  
    return (
      <div className="Dashboard">
        <nav id="sidebar">
        {picture ? (<img className="profilepic" src={images[picture].default} />) : (<img className="profilepic" src={defaultuser} />)}
        
          <div className="sidebar-header">
            <h3>{name}</h3>
            <p>{donacija.slice(0, 22)}</p>
            <p>{donacija.slice(22, )}</p>
          </div>

          <ul className="list-unstyled components">
            <li>
              <Link to="/settings">Поставки</Link>
            </li>
            <li>
              <Link to="/write">Мои Статии</Link>
            </li>
            <li>
              <Link to="/history">Мои донации</Link> 
            </li>
          </ul>
        </nav>
      </div>
    );
};

export default Sidebar;
