import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Login.css';
import { BASE_URL } from '../../../shared/utils/api';

async function loginUser(credentials) {
  return fetch(`${BASE_URL}/authentication/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login({ setToken }) {
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      firstname,
      lastname,
      email,
      password
    });
    setToken(token);
  }

  return (
    <div className="login-wrapper">
     <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>First Name</p>
          <input type="text" onChange={e => setFirstName(e.target.value)} />
        </label>
        <label>
          <p>Last Name</p>
          <input type="text" onChange={e => setLastName(e.target.value)} />
        </label>

      <label>
        <p>email</p>
          <input type="email" onChange={e => setEmail(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}



