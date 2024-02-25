import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { Page, Document } from 'react-pdf'

function UpdateUser() {
  const location = useLocation();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("")
  const [file, setFile] = useState(null)


  useEffect(() => {
    console.log(location)
    setId(location.state._id);
    setFname(location.state.fname);
    setLname(location.state.lname);
    setEmail(location.state.email);
    setFile(location.state.pdf)
  }, []);
  
  // const [file, setFile] = useState(null)
 
  

  const updateData = (e) => {

    const fd = new FormData()
    fd.append("id", id)
    fd.append("fname", fname)
    fd.append("lname", lname)
    fd.append("file", file)
    e.preventDefault()
    fetch("http://localhost:5000/updateUser", {
      method: "POST",
      
      body: fd
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.data)
        
        window.location.href="/userHome"
      });
  };


  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={updateData}>
        First Name
        <br />
        <input
          placeholder="First Name"
          className="form-control"
          defaultValue={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <br />
        Last Name
        <br />
        <input
          placeholder="Last Name"
          className="form-control"
          defaultValue={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <br />
        Email
        <br />
        <input
          placeholder="email"
          className="form-control"
          defaultValue={email}
          disabled
        />
        <br />
        Update CV
        <input
              type="file"
              className="form-control"
              accept="application/pdf"
              defaultValue={file}
              onChange={(e) => setFile(e.target.files[0])}
            />
        <button type="submit" className='btn btn-secondary' style={{marginTop: '10px'}}>Update Details</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
