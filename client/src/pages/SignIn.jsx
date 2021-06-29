import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  let history = useHistory();

  const [emails, setEmails] = useState("");
  const [passwords, setPasswords] = useState("");

  function signIn(event) {
    if (event) {
      event.preventDefault();
    }
    let email = emails;
    let password = passwords;
    let items = { email, password };
    console.warn(items);
    axios
      .post("/api/v1/auth/login", items)
      .then((res) => {
        console.log(res);
        // console.log(res.data.data.token);
        localStorage.setItem("token", res.data.data.token);
      })
      .catch((err) => console.error(err));
    history.push("/Instdsat");
  }

  return (
    <>
      <div class="container  mt-5">
        <form className="form" onSubmit={signIn}>
          <h2>Sign In</h2>
          <p>Enter Your Details</p>
          {/* <div class="social-container">
                <a href="#" class="social">
                  <i class="fa fa-facebook"></i>
                </a>
                <a href="#" class="social">
                  <i class="fa fa-google"></i>
                </a>
                <a href="#" class="social">
                  <i class="fa fa-linkedin"></i>
                </a>
              </div>
              <span>or use your account</span> */}
          <input
            type="email"
            name="email"
            value={emails}
            placeholder="Email"
            onChange={(e) => setEmails(e.target.value)}
            className=" inp"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={passwords}
            onChange={(e) => setPasswords(e.target.value)}
            className=" inp"
            required
          />
          <a href="#">Forgot Your Password</a>

          <button className="but">Sign In</button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
