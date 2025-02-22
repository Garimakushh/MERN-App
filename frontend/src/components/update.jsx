import React, { useState } from "react";
import { useEffect} from "react";

import { useParams,useNavigate  } from "react-router-dom";
//fn to call single data

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();

  const [error, setError] = useState("");
  const { id } = useParams();

  const navigate= useNavigate();

  const getSingleuser = async () => {
    const response = await fetch(`http://localhost:4000/${id}`);

    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error | "Failed to fetch user data");
    }
    if (response.ok) {
      setError("");
      console.log("updated user", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };
  useEffect(() => {
    getSingleuser();
  }, []);


  //update single user to backend
  const handleUpdate= async (e)=>{
    
      e.preventDefault();
      const updatedUser = {name,email,age};
      const response = await fetch(`http://localhost:4000/${id}`,{
          method:"PATCH",
          body:JSON.stringify(updatedUser),
          headers:{
              "Content-Type":"application/json",
          },
      });
  
      const result = await response.json();
      
      if(!response.ok){
          console.log(result.error);
          setError(result.error);
      }
      if(response.ok){
          console.log(result);
          //empty everything
         setError("");
          navigate("/all");
  
      }
     }
  


  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}

      <h2 className="text-center">Edit the data</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
