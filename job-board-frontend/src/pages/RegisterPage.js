import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const REGISTER_USER = gql`
  mutation Register($name: String!, $email: String!, $password: String!, $role: String) {
    register(name: $name, email: $email, password: $password, role: $role)
  }
`;

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'candidate' });
  const [register] = useMutation(REGISTER_USER);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ variables: form });
      alert(res.data.register);
      alert("register successfully")
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" onChange={handleChange}>
        <option value="candidate">Candidate</option>
        <option value="recruiter">Recruiter</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
