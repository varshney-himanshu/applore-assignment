import React, { useEffect, useState } from "react";
import firebase from "../firebase";

import { setUserInLocalStorage, isPhoneValid } from "../Utils/utils";

function Login({ logIn }) {
  const [phone, setPhone] = useState("");

  //   const

  function handleOnPhonechange(e) {
    setPhone(e.target.value);
  }

  function handleClick() {
    if (!isPhoneValid(phone)) {
      alert("invalid phone");
      return;
    }

    const number = "+91" + phone;
    let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then(function (e) {
        let code = prompt("enter the otp", "");
        if (code == null) return;
        e.confirm(code).then(function (result) {
          setUserInLocalStorage(result.user);
          logIn();
        });
      })
      .catch((error) => {
        console.log(Error);
      });
  }

  return (
    <div className="login">
      <div className="login-form">
        <h2>Applore Assignment</h2>
        <input
          value={phone}
          onChange={handleOnPhonechange}
          placeholder={"Enter Your phone"}
        ></input>

        <button onClick={handleClick}>Login</button>
        <div id="recaptcha"></div>
      </div>
    </div>
  );
}

export default Login;
