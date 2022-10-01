import React, { useEffect, useState } from "react";

import "./App.css";
const URL = "https://rest-api-without-db.herokuapp.com/users/";
function App() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const getUser = () => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers(data.users);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log(users);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="App">
      <h1>User Management APP</h1>
      {isLoading && <p>Loading...</p>}
      {error && { error }}
      <section>
        {users &&
          users.map((user) => {
            const { id, username, email } = user;
            return (
              <article className="card" key={id}>
                <p>{username}</p>
                <p>{email}</p>
                <button className="btn">Edit</button>
                <button className="btn">Delete</button>
              </article>
            );
          })}
      </section>
    </div>
  );
}

export default App;
