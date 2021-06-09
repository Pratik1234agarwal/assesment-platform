import React, { useState, useEffect } from "react";
import "./Loginout.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

const Loginout = () => {
  const alerts = useAlert();
  let history = useHistory();
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     history.push("/Instdsat");
  //   }
  // }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [university, setUniversity] = useState("");

  const [emails, setEmails] = useState("");
  const [passwords, setPasswords] = useState("");
  const [branch, setBranch] = useState("");

  function signUp(event) {
    if (event) {
      event.preventDefault();
    }
    let item = { name, email, phone, category, university, password, branch };
    console.warn(item);
    axios
      .post("/api/v1/auth/signup", item)
      .then((res) => {
        console.log(res);
        // localStorage.setItem("token", res.data.data.token);
        // window.location.reload();
        // alert("Signup Complete");
        setTimeout(function () {
          window.location.replace("https://www.iitrpr.ac.in/aiupskilling");
        }, 3000);
        // window.location.href = "https://www.iitrpr.ac.in/aiupskilling";
      })
      .catch((err) => console.error(err));
    // alert("Signup Complete");
    alerts.show("Successfully register!");
    // alerts.show("Signup Complete!");
    // window.location.reload();
  }

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
      <div className="body1">
        <h3>A-DSAT Registration</h3>
        <div class="containers" id="containers">
          <div class="form-container sign-up-container">
            <form className="form" onSubmit={signUp}>
              <h2>Create Account</h2>
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
              <span>or use your email for registration</span> */}
              {/* <input type="text" name="name" placeholder="Name" /> */}
              <input
                type="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="mt-3 inp"
                required
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className=" inp"
                required
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className=" inp"
                required
              />
              <input
                type="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone No."
                className=" inp"
                required
              />
              <input
                type="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category:(Student/Professional)"
                className=" inp"
                required
              />
              <input
                type="university"
                name="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="University Name"
                className=" inp"
                required
              />
              <input
                type="university"
                name="branch"
                onChange={(e) => setBranch(e.target.value)}
                value={branch}
                placeholder="Year Of Branch"
                className=" inp"
                // required
              />
              <button className="but mt-2">SignUp</button>
            </form>
          </div>
          <div class="form-container sign-in-container">
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
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h2>Hello Students!</h2>
                <p>Create an account to connected with us</p>
                <button class="ghost but" id="signIn">
                  Sign Up
                </button>
              </div>
              <div class="overlay-panel overlay-right">
                <h2>Hello, Students!</h2>
                <p>Welcome to A-DSAT! Wish you best of luck</p>
                {/* <button class="ghost but" id="signUp">
                  Sign In
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginout;
