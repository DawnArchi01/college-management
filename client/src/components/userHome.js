import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function UserHome() {
  const [userData, setUserData] = useState("")
  const navigate = useNavigate()
  

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUserData(data.data);
      });
  }, []);

  const deleteUser = (id) => {
    if (window.confirm(`Are you sure you want to delete?`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          window.localStorage.clear()
          window.location.href = "./sign-in";
          // getAllUser();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Error deleting user. Please try again.");
        });
    }
  };
  

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <FontAwesomeIcon icon={faUserEdit} onClick={()=> navigate("/updateUser", { state: userData })} />
        <button className="btn btn-lg btn-danger" onClick={()=>deleteUser(userData._id)} style={{marginLeft: '200px'}}>Delete</button>
        <div>
          Name<h1>{userData.fname} {userData.lname}</h1>
          Email <h1>{userData.email}</h1>
          Resume <p>{userData.pdf}</p>
          <br />
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
  }
