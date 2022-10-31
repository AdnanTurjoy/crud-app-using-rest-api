import React, { useEffect, useState } from "react";

import "./App.css";
import UserForm from "./components/UserForm";
const URL = "https://adnan-user-rest-api.herokuapp.com/users";
function App() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState({
    username: "",
    email: "",
  });
  const [updateFlag, setUpdateFlag] = useState(false);
  const [seletctedId, setSelectedId] = useState("");

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

  // Delete method
  const handleDelete = (id) => {
    // setUsers(users.filter((user) => user.id !== id));     This is only for local API not for REST API
    fetch(URL + `/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not delete");
        } else {
          getUser(); // again fetch total user
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  // UPDATE Method (PUT)
  const handleUpdate = (id) => {
    setSelectedId(id);
    setUpdateFlag(true);
    const filterUser = users.filter((user) => user.id === id);
    setSelectedUser(filterUser[0]);
    //console.log(selectedUser);
  };
  const handleUpdateData = (user) => {
    //const { id } = user;

    fetch(URL + `/${seletctedId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed to update");
        }
        getUser();
        setUpdateFlag(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  //console.log(users);
  // GET method
  useEffect(() => {
    getUser();
  }, []);

  // CREATE METHOD (POST)
  const addUser = (user) => {
    // console.log(user);
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 201) {
          getUser();
        } else {
          throw new Error("could not create new user");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div className="App">
      <h1>User Management APP</h1>
      {isLoading && <p>Loading...</p>}
      {error && { error }}
      {updateFlag ? (
        <UserForm
          btnText="Update User"
          handleUpdateUser={selectedUser}
          handleUserData={handleUpdateData}
        />
      ) : (
        <UserForm btnText="Add User" handleUserData={addUser} />
      )}
      <section>
        {users &&
          users.map((user) => {
            const { id, username, email } = user;
            return (
              <article className="card" key={id}>
                <p>{username}</p>
                <p>{email}</p>
                <button className="btn" onClick={() => handleUpdate(id)}>
                  Edit
                </button>
                <button className="btn" onClick={() => handleDelete(id)}>
                  Delete
                </button>
              </article>
            );
          })}
      </section>
    </div>
  );
}

export default App;
