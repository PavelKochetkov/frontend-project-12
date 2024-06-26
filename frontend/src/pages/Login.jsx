import React from 'react';
import LoginForm from '../Components/LoginForm';

const Login = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src="" className="rounded-circle" alt="Войти" />
            </div>
            <LoginForm />
          </div>
          <div className="card-footer">
            <div className="text-center">
              <span>Нет аккаунта?</span>
              <a href="/login">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
