import React, { Component,useState, useEffect  } from 'react'
import Swal2 from 'sweetalert2';
import Axios from 'axios';
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import './login.css';
export default function Login() {  

  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
    .string()
    .email("email inválido"),
    password: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
  });


  return (
    <div className="container">
      <div class="title-form">
        <h1>Login</h1>
      </div>
      
      <Formik
        initialValues={{}}
        onSubmit={handleLogin}
        validationSchema={validationsLogin}
      >

        <Form className="login-form">
          <div className="login-form-group">
            <div className="frame-login-title">
              <label className="title-email-form">E-mail:</label>
              <Field name="email" className="form-field" placeholder="Digite seu e-mail" />
            </div>
            

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>
          {/*Outro campo*/}
          <div className="form-group">
            <div className="frame-login-title">
              <label className="title-senha-form">Senha:</label>
              <Field name="password" className="form-field" placeholder="Digite sua senha" />
            </div>
            
            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>
          
          <div class="btn-login">
            <button  className="button" type="submit">Login</button>
          </div>

          <div className="redirect-registro">
            <div className="nav-item">
              <a href='/sign-up'>Cadastre-se</a>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )

}