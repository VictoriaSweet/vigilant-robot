import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../graphql/queries';


function Profile() {
  const { loading, error, data } = useQuery(QUERY_USER);
  if (loading) {
    return <p>Loading user data...</p>;
  }
  if (error) {
    console.error('Error fetching user data:', error);
    return <p>Error loading user data. Please try again later.</p>;
  }
  const user = data.user;
  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Add more user details as needed */}
      {/* Example navigation links */}
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/dashboard">Dashboard</Link>
      </p>
    </div>
  );
}
export default Profile;