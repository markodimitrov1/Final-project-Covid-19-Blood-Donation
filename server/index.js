const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const { request } = require("express");
const saltRounds = 10;

// <token>
// const jwt = require("jsonwebtoken");
// </token>

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded());

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 2,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "database",
});

app.post("/register", (req, res) => {
  const name = req.body.name;
  const date = req.body.date;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const city = req.body.city;
  const blood = req.body.blood;
  const covid = req.body.covid;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }else{
    db.query(
      "INSERT INTO users (name, date, email, username, password, city, blood, covid) VALUES (?,?,?,?,?,?,?,?)",
      [name, date, email, username, hash, city, blood, covid],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );}
  });
});

// <token>
// const verifyJWT = (req, res, next) => {
//   const token = req.headers["x-access-token"];

//   if (!token) {
//     res.send("We need a token, please give it to us next time!");
//   } else {
//     jwt.verify(toke, "jwtSecret", (err, decoded) => {
//       if (err) {
//         res.json({ atuh: false, message: "U failed to authenticate" });
//       } else {
//         req.userId = decoded.id;
//         next();
//       }
//     });
//   }
// };

// app.get("/isUserAuth", verifyJWT, (req, res) => {
//   res.send("U are authenticated Congrats!");
// });

// </token>

app.post("/logout", (req, res) => {
  if (req.session.user) {
    res.cookie = {
      expires: new Date(1),
    };

    req.session.destroy();
    res.send({ loggedIn: false });
    console.log("proverka");
  }
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          console.log(response + " response");
          if (response) {


            req.session.user = result;
            res.send(result);
            console.log("LogedIn");
            console.log(req.session.user);
          } else {
            res.send({ message: "Погрешна лозинка!" });
            console.log("Wrong password");
          }
        });
      } else {
        res.send({ message: "Корисникот не постои!" });
        console.log("User doesn't exist!");
      }
    }
  );
});

app.post("/username", (req, res) => {
  const username = req.body.username;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      }

      if (result.length > 0) {
        // req.session.user = result;
        //res.send({message: "User exists"})
        res.send(result[0].username);
        console.log(result[0].username + " User exist");
      } else {
        res.send("Username free");
        console.log(result + " Username free");
      }
    }
  );
});

app.post("/email", (req, res) => {
  const email = req.body.email;

  db.query("SELECT * FROM users WHERE email = ?;", email, (err, result) => {
    if (err) {
      res.send({ err: err });
      console.log("Error");
    }

    if (result.length > 0) {
      // req.session.user = result;
      //res.send({message: "User exists"})
      res.send(result[0].email);
      console.log(result[0].email + " User exist");
    } else {
      res.send("Email free");
      console.log(result + " Email free");
    }
  });
});

app.post("/donors", (req, res) => {
  console.log("Donori");
  const type = req.body.type;
  const city = req.body.city;
  const covid = req.body.covid;
  if (type == city && city == covid) {
    db.query("SELECT * FROM users;", (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      }

      if (result.length > 0) {
        // req.session.user = result;
        //res.send({message: "User exists"})
        res.send(result);
      } else {
        res.send({ message: "No donors" });
        console.log(result + " No donors");
      }
    });
  }
  else if (type == city) {
    db.query("SELECT * FROM users WHERE covid = ?;", covid, (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      }

      if (result.length > 0) {
        // req.session.user = result;
        //res.send({message: "User exists"})
        res.send(result);
      } else {
        res.send({ message: "No donors" });
        console.log(result + " No donors");
      }
    });
  } 
  else if (type == covid) {
    db.query("SELECT * FROM users WHERE city = ?;", city, (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      }

      if (result.length > 0) {
        // req.session.user = result;
        //res.send({message: "User exists"})
        res.send(result);
      } else {
        res.send({ message: "No donors" });
        console.log(result + " No donors");
      }
    });
  }
  else if (city == covid) {
    db.query("SELECT * FROM users WHERE blood = ?", type, (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      }

      if (result.length > 0) {
        // req.session.user = result;
        //res.send({message: "User exists"})
        res.send(result);
      } else {
        res.send({ message: "No donors" });
        console.log(result + " No donors");
      }
    });
  }else if (type == "Сите") {
    db.query("SELECT * FROM users WHERE city = ? AND covid = ?;", [city, covid], (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      }

      if (result.length > 0) {
        // req.session.user = result;
        //res.send({message: "User exists"})
        res.send(result);
      } else {
        res.send({ message: "No donors" });
        console.log(result + " No donors");
      }
    });
  } else if (city == "Сите") {
    db.query("SELECT * FROM users WHERE blood = ? AND covid = ?;", [type, covid], (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      }

      if (result.length > 0) {
        // req.session.user = result;
        //res.send({message: "User exists"})
        res.send(result);
      } else {
        res.send({ message: "No donors" });
        console.log(result + " No donors");
      }
    });
  }
  else if (covid == "Сите") {
    db.query("SELECT * FROM users WHERE blood = ? AND city = ?;", [type, city], (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      }

      if (result.length > 0) {
        // req.session.user = result;
        //res.send({message: "User exists"})
        res.send(result);
      } else {
        res.send({ message: "No donors" });
        console.log(result + " No donors");
      }
    });
  } else {
    db.query(
      "SELECT * FROM users WHERE blood = ? AND city = ? AND covid = ?;",
      [type, city, covid],
      (err, result) => {
        if (err) {
          res.send({ err: err });
          console.log("Error");
        }

        if (result.length > 0) {
          // req.session.user = result;
          //res.send({message: "User exists"})
          res.send(result);
        } else {
          res.send({ message: "No donors" });
          console.log(result + " No donors");
        }
      }
    );
  }
});

app.post("/picture", (req, res) => {
  const id = req.body.id;
  const picture = req.body.picture
  db.query(
    "UPDATE users SET picture = ? WHERE id = ?;",
    [picture, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      } else {
        res.send("Uspesno prikacena slika");
        console.log("Uspesno prikacena slika")
      }
    }
  );
});

app.post("/updateemail", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  db.query(
    "UPDATE users SET email = ? WHERE id = ?;",
    [email, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      } else {
        res.send("Uspesno smeneta email adresa");
      }
    }
  );
});

app.post("/newusername", (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  db.query(
    "UPDATE users SET username = ? WHERE id = ?;",
    [username, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      } else {
        res.send("Uspesno smeneto korisnicko ime");
      }
    }
  );
});

app.post("/newpass", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }else{
    db.query(
      "UPDATE users SET password = ? WHERE id = ?;",
      [hash, id],
      (err, result) => {
        if (err) {
          res.send({ err: err });
          console.log("Error");
        } else {
          res.send("Uspesno smeneta lozinka");
        }
      }
    );}
  });
});

app.post("/updatecovid", (req, res) => {
  const id = req.body.id;
  const covid = req.body.covid;
    db.query(
      "UPDATE users SET covid = ? WHERE id = ?;",
      [covid, id],
      (err, result) => {
        if (err) {
          res.send({ err: err });
          console.log("Error");
        } else {
          res.send("Uspesno smenet covid");
        }
      }
    );
  });

app.post("/getuser", (req, res) => {
  const id = req.body.id;
  db.query("SELECT * FROM users WHERE id = ?;", id, (err, result) => {
    if (err) {
      res.send({ err: err });
      console.log("Error");
    } else {
      res.send(result[0]);
      console.log("USERRRR:" + result[0]);
    }
  });
});

app.post("/addarticle", (req, res) => {
  const userid = req.body.userid;
  const image = req.body.picture;
  const title = req.body.title;
  const text = req.body.text;
  console.log(text);
  const author = req.body.author;
  db.query(
    "INSERT INTO articles (title, text, image, authorid, author) VALUES (?,?,?,?,?)",
    [title, text, image, userid, author],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      } else {
        res.send("success");
        console.log("Vnesena Statija");
      }
    }
  );
});

app.post("/articles", (req, res) => {
  console.log("Statii");
  db.query("SELECT * FROM articles ORDER BY id DESC;", (err, result) => {
    if (err) {
      res.send({ err: err });
      console.log("Error");
    } else {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "No articles" });
        console.log(result + " No articles");
      }
    }
  });
});

app.post("/myarticles", (req, res) => {
  const userid = req.body.userid;
  console.log("Moi Statii");
  db.query(
    "SELECT * FROM articles WHERE authorid = ? ORDER BY id DESC;",
    [userid],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "No articles" });
          console.log(result + " No articles");
        }
      }
    }
  );
});

app.post("/adddonation", (req, res) => {
  const userid = req.body.userid;
  const place = req.body.place;
  const city = req.body.city;
  const volume = req.body.volume;
  const date = req.body.date;
  db.query(
    "INSERT INTO donations (iduser, place, city, volume, date) VALUES (?,?,?,?,?)",
    [userid, place, city, volume, date],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      } else {
        res.send("success");
        console.log("Vnesena Donacija");
      }
    }
  );
});

app.post("/mydonations", (req, res) => {
  const userid = req.body.userid;
  console.log("Donacii na " + userid);
  db.query(
    "SELECT * FROM donations WHERE iduser = ? ORDER BY date DESC;",
    [userid],
    (err, result) => {
      if (err) {
        res.send({ err: err });
        console.log("Error");
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "No donations" });
          console.log(result + " No donations");
        }
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running server");
});
