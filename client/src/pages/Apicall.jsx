import React, { useEffect, useState } from "react";

const Apicall = () => {
  const users = [
    {
      id: 1,
      name: "ankur",
      email: "avp@gmail.com",
      age: 20,
    },
    {
      id: 2,
      name: "panth",
      email: "panth@gmail.com",
      age: 22,
    },
    {
      id: 3,
      name: "harsh",
      email: "harsh@gmail.com",
      age: 25,
    },
  ];

  const [userdata, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("api call started.");

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  //loading state
  if (loading) {
    return <h2>Lading......</h2>;
  }

  //error state

  if (error) {
    return <h2>Error {error}</h2>;
  }

  return (
    <div>
      {/* https://jsonplaceholder.typicode.com/users */}

      <h2>Users list</h2>
      <div>
        {userdata.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
      {/* <div>
        {user.map((user) => {
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.age}</p>
          </div>;
        })}
      </div> */}
    </div>
  );
};

export default Apicall;
