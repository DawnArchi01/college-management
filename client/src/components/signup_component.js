// import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [file, setFile] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    if (userType === "Admin" && secretKey !== "IamADMIN1") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();

      // console.log(fname, lname, email, password);
      const fd = new FormData();

      fd.append("fname", fname);
      fd.append("lname", lname);
      fd.append("email", email);
      fd.append("password", password);
      fd.append("userType", userType);

      if(userType === "User"){
        fd.append("file", file)
      }

      fetch("http://localhost:5000/register", {
        method: "POST",
        body: fd
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status === "ok") {
            alert("Registration Successful");
            navigate('/')
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={ handleSubmit }>
          <h3>Sign Up</h3>
          <div>
            Register As
            <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            />
            User
            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin
          </div>
          {userType === "Admin" ? (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          ) : null}

          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          { userType === "User"? <div className="mb-3">
            <label>Upload CV</label>
            <input
              type="file"
              className="form-control"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div> : null
          }

          <div className="d-grid">
            <button type="submit" className="btn btn-success">
              Sign Up
            </button>
          </div>
          <p className="text-right">
            Already registered. <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
