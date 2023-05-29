const express = require('express');
const app = express();
const routes = require('./routes');
const mysql = require("mysql");
const cors = require("cors");
const saltRounds = 10;

const db = mysql.createPool({
host:"localhost",
user: "root",
password: "chgz@2008",
database: "myLocker"
});

app.use(express.json());
app.use(cors());

app.use(routes);

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", [email, password], (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
          if (result) {
            res.send({ msg: "Login bem sucedido !" });
          } else {
            res.send({ msg: "Login Incorreto" });
          }
      } else {
        res.send({ msg: "Usuário não registrado!" });
      }
    });
  });

  app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const cpf = req.body.cpf;
    db.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", [email,password], (err, result) => {
      if (result.length == 0) {
          db.query(
            "INSERT INTO usuarios (email, password) VALUE (?,?)",
            [email, password],
            (error, response) => {
              if (err) {
                res.send(err);
              }
           db.query("SELECT idUsuario FROM usuarios WHERE email = ? AND password = ?", [email, password], (error, response) => {
            if (err) {
              res.send(err);
            }
            const idUsuario = response[0].idUsuario;
           db.query(
            "INSERT INTO usuarioDados (nome, sobrenome, cpf, idUsuario) VALUE (?,?,?,?)",
            [nome, sobrenome, cpf, idUsuario],
            (error, response) => {
              if (err) {
                res.send(err);
              }
              res.send({ msg: "Usuário cadastrado com sucesso" });
            }
          );
            }
          );
            }
          );
      } else {
        res.send({ msg: "Email já cadastrado" });
      }
    });
  });

app.listen(3001, () => {
    console.log("porta 3000...");
  
});