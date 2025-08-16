import React from 'react';
import { gql, useQuery } from '@apollo/client';


export const GET_JOBS = gql`
  query {
    getJobs {
      _id
      title
      description
      postedBy {
        name
        role
      }
    }
  }
`;

export default function DashboardPage() {
  const { data, loading, error } = useQuery(GET_JOBS);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h2 style={{ color: '#00f2ff', marginBottom: '20px' }}>Job Listings</h2>

      {data.getJobs.length === 0 ? (
        <p style={{ color: '#ccc' }}>No jobs posted yet.</p>
      ) : (
        <div>
          {data.getJobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p style={{ fontSize: '14px', color: '#aaa' }}>
                <strong>Posted by:</strong> {job.postedBy.name} ({job.postedBy.role})
              </p>

              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
