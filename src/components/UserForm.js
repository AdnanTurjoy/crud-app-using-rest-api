import React, { useState } from "react";
import PropTypes from "prop-types";

function UserForm({ handleUserData, btnText }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const handleChange = (e) => {
    const nameFeild = e.target.name;
    const valueFeild = e.target.value;
    setUser((prevState) => {
      return { ...prevState, [nameFeild]: valueFeild };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    //console.log();
    handleUserData(user);
    setUser({
      username: "",
      email: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          id="username"
          required
          onChange={handleChange}
        />
      </div>
      <div className="field-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          id="email"
          required
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn">
        {btnText}
      </button>
    </form>
  );
}

UserForm.propTypes = {};
export default UserForm;
