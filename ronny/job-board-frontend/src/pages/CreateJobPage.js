import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { GET_JOBS } from './DashboardPage'; // ✅ make sure this path is correct
import "./index.css";

const CREATE_JOB = gql`
  mutation CreateJob($title: String!, $description: String!) {
    createJob(title: $title, description: $description) {
      title
      description
      postedBy {
        name
      }
    }
  }
`;

export default function CreateJobPage() {
  const [form, setForm] = useState({ title: '', description: '' });

  const [createJob, { loading }] = useMutation(CREATE_JOB, {
    refetchQueries: [{ query: GET_JOBS }], //  auto refresh job list
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createJob({ variables: form });
      alert('Job posted successfully!');
      setForm({ title: '', description: '' });
      console.log(res.data.createJob);
    } catch (err) {
      alert(err.message || 'Job creation failed');
    }
  };

  return (
    <div className="container">
      <h2 style={{ color: '#00f2ff', marginBottom: '20px' }}>
        Create a New Job
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Job Title */}
        <label htmlFor="title">Job Title</label>
        <input
          id="title"
          name="title"
          placeholder="e.g. Frontend Developer"
          value={form.title}
          onChange={handleChange}
          required
          className="cool-input"
        />

        {/* Job Description */}
        <label htmlFor="description" style={{ marginTop: '20px' }}>
          Job Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe responsibilities, requirements, benefits..."
          value={form.description}
          onChange={handleChange}
          rows="6"
          required
          className="cool-textarea"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
}
