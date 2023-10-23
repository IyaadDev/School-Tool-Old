import React from "react";
import "../css/login.css";
import "../bootstrap.min.css";

const Login = () => {
  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form action="">
            <h2>Login</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input type="email" required />
              <label htmlFor="">Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input type="password" required />
              <label htmlFor="">Password</label>
            </div>
            <button>Log in</button>
            <div className="register">
              <p>
                Don't have a account <a href="#">Sign up now!</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
