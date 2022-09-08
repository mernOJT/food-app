import React from "react";
import "./style.css";
import homeslider from "./home_slider.png";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseDatabase } from "../../database/firebaseConfig";
import { collection } from "firebase/firestore";
import {
  getFirestore,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  Firestore,
} from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { Email } from "@material-ui/icons";

type AddUserDataType = {
  id?: string;
  name: string;
  contact: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

const newUser: AddUserDataType = {
  id: "",
  name: "",
  contact: "",
  email: "",
  password: "",
  isAdmin: false,
};

type LoginDataType = {
  email: string;
  password: string;
  // isAdmin: boolean;
};

const loginUser: LoginDataType = {
  email: "",
  password: "",
  // isAdmin: false,
};

type ErrorTypeLogin = {
  [key: string]: string;
};

const loginError: ErrorTypeLogin = {
  email: "",
  password: "",
};

const SignIn: React.FC = () => {
  let navigate = useNavigate();
  const [loginInfo, setLoginInfo] = React.useState<LoginDataType>(loginUser);
  const [error, setError] = React.useState<ErrorTypeLogin>(loginError);
  const [user, setUser] = React.useState<AddUserDataType>(newUser);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const isValid = () => {
    let hasError = false;
    const copyErrors: ErrorTypeLogin = { ...error };
    const validationFields = ["email", "password"];
    for (let key in copyErrors) {
      if (
        validationFields.includes(key) &&
        loginInfo[key as keyof typeof loginInfo] === ""
      ) {
        copyErrors[key] = "Required*";
        hasError = true;
      }
    }
    setError(copyErrors);
    return hasError;
  };

  const handleLogin = async () => {
    if (isValid()) {
      return;
    }
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
      );
      console.log(user);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    const db = getFirestore();
    const docRef = doc(firebaseDatabase, "user");
    const citiesRef = collection(firebaseDatabase, "user");
    // Create a query against the collection.
    const q = query(citiesRef, where("email", "==", loginInfo.email));

    console.log(q);
    const docSnap = await getDoc(docRef);
    docSnap.data();
    try {
      const docSnap = await getDoc(docRef);
      const results = docSnap.data();

      let obj: AddUserDataType = {
        id: results?.id,
        name: results?.name,
        contact: results?.contact,
        email: results?.email,
        password: results?.password,
        isAdmin: results?.isAdmin,
      };
      setUser(obj);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  console.log(user);

  const handleGoogleSignIn = () => {
    // signInWithGoogle(location, history);
  };

  return (
    <React.Fragment>
      <section
        className="signIn__slider"
        style={{ background: `url(${homeslider}) ` }}
      >
        <div className="signIn__slider__row">
          <div className="signIn__slider__row__main">
            <img
              className="signIn__slider__row__main__logo"
              src={logo}
              alt="Red Onion Logo"
            />
            <form className="signIn__slider__row__main__form">
              <input
                type="email"
                className="signIn__slider__row__main__form__input"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <span className="signIn__slider__row__main__form__error">
                {error.name}
              </span>
              <input
                type="password"
                className="signIn__slider__row__main__form__input"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <span className="signIn__slider__row__main__form__error">
                {error.name}
              </span>
              <button
                type="submit"
                className="signIn__slider__row__main__form__input"
                id="submit"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                Sign in
              </button>
            </form>
            <p>------------ or ------------</p>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <p className="signIn__slider__row__main__form__link">
              Don't have an account?
              <Link to="/signup"> Click here...</Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};

export default SignIn;
