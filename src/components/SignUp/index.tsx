import React from "react";
import "./style.css";
import homeslider from "./home_slider.png";
import logo from "../../images/logo.png";

const SignUp: React.FC = () => {
  return (
    <React.Fragment>
      <section
        className="signup__slider"
        style={{ background: `url(${homeslider}) ` }}
      >
        <div className="signup__slider__row">
          <div className="signup__slider__row__main">
            <img
              className="signup__slider__row__main__logo"
              src={logo}
              alt="Red Onion Logo"
            />
            <form className="signup__slider__row__main__form">
              <input
                type="text"
                className="signup__slider__row__main__form__input"
                id="name"
                name="name"
                placeholder="Name"
              />
              <input
                type="email"
                className="signup__slider__row__main__form__input"
                id="email"
                name="email"
                placeholder="Email"
              />
              <input
                type="password"
                className="signup__slider__row__main__form__input"
                id="password"
                name="password"
                placeholder="Password"
              />
              <input
                type="password"
                className="signup__slider__row__main__form__input"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <input
                type="submit"
                className="signup__slider__row__main__form__input"
                id="submit"
                value="Sign Up"
              />
            </form>
            <p className="signup__slider__row__main__form__link">
              Already have an account? <a href="/signin">Click here...</a>
            </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default SignUp;