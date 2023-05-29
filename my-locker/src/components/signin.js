import React, { Component,useState, useEffect  } from 'react'
import Swal2 from 'sweetalert2';
import Axios from 'axios';
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import './signin.css';
export default function SignUp() {
  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email("email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas são diferentes")
      .required("A confirmação da senha é obrigatória"),
  });

  const handleRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
      nome: values.nome,
      sobrenome: values.sobrenome,
      cpf: values.cpf
    }).then((response) => {
      alert(response.data.msg);
    });
  };
    return (
    <div className="container">
        <div class="title-form">
          <h1>Cadastro</h1>
        </div>
        <Formik
          initialValues={{}}
          onSubmit={handleRegister}
        >
          <Form className="login-form">
            <div className="form-group">
              <div className="frame-login-title">
                <label className="title-senha-form">Nome:</label>
                <Field name="nome" className="form-field" placeholder="Digite seu nome" />
              </div>
            </div>
            <div className="form-group">
              <div className="frame-login-title">
                <label className="title-senha-form">Sobrenome:</label>
                <Field name="sobrenome" className="form-field" placeholder="Digite seu sobrenome" />
              </div>
            </div>
            <div className="form-group">
              <div className="frame-login-title">
                <label className="title-senha-form">CPF:</label>
                <Field name="cpf" className="form-field" placeholder="Digite seu documento" />
              </div>
            </div>
            <div className="login-form-group">
              <div className="frame-login-title">
                <label className="title-email-form">E-mail:</label>
                <Field name="email" className="form-field" placeholder="Digite seu e-mail" />
              </div>
            </div>
            {/*Outro campo*/}
            <div className="senha">
              <div className="form-group">
                <div className="frame-login-title">
                  <label className="title-senha-form">Senha:</label>
                  <Field name="password" className="form-field" placeholder="Digite sua senha" />
                </div>
              </div>
            </div>
            <div class="btn-cadastrar">
                <button className="button" type="submit">Cadastrar</button>
              </div>
              <div className="redirect-registro">
            <div className="nav-item">
              <a href='/sign-in'>Voltar para tela de login</a>
            </div>
          </div>
          </Form>
        </Formik>
      </div>
    )
}