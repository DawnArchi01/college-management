import React, { useEffect, useState } from "react";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export default function AdminHome({ userData }) {
  // setting state
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [remarks, setRemarks] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  }, []);

  // logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  const showPdf = (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`, "_blank", "norefferer");
  };

  const handleApprove = (userId) => {
    setRemarks((prevRemarks) => ({ ...prevRemarks, [userId]: "approved" }));
  };

  const handleReject = (userId) => {
    setRemarks((prevRemarks) => ({ ...prevRemarks, [userId]: "rejected" }));
  };

  return (
    <div className="auth-wrapper" style={{ height: "auto" }}>
      <div className="auth-inner" style={{ width: "auto" }}>
        <h3>Welcome Admin</h3>
        <Form>
          <InputGroup className="my-3">
            <Form.Control
              placeholder="Search"
              showsearch
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </InputGroup>
        </Form>
        <table style={{ width: 500 }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Resume</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((user) => {
                return search === ""
                  ? user
                  : user.fname.toLowerCase().includes(search);
              })
              .map((user) => {
                const userId = user._id;
                const userRemark = remarks[userId] || null;

                return (
                  <tr key={userId}>
                    <td>{user.fname}</td>
                    <td>{user.lname}</td>
                    <td>{user.email}</td>
                    <td>{user.userType}</td>
                    <td>
                      {user.userType === "User" ? (
                        <FontAwesomeIcon
                          icon={faFile}
                          onClick={() => showPdf(user.pdf)}
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      {user.userType === "User"
                        ? !userRemark && (
                            <div className="btn-group">
                              <button
                                className="btn btn-success"
                                onClick={() => handleApprove(userId)}
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-warning"
                                onClick={() => handleReject(userId)}
                              >
                                Reject
                              </button>
                            </div>
                          )
                        : "Not a user"}

                      {userRemark && (
                        <div>
                          <h2>
                            {userRemark === "approved" ? (
                              <p
                                style={{
                                  color: "green",
                                  fontSize: "20px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                Approved!
                              </p>
                            ) : (
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "20px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                Rejected
                              </p>
                            )}
                          </h2>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <button
          onClick={logOut}
          className="btn btn-primary"
          style={{ margin: "10px" }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
