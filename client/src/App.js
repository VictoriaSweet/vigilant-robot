import React from 'react';
import './App.css'; // Ensure the correct path to App.css
const DreamVacationPlanner = () => {
  return (
    <div>
      <header>
        <h1>Dream Vacation Planner</h1>
      </header>
      <section className="login-signup">
        <h2>Login or Signup</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="#">Signup</a></p>
      </section>
      {/* Include the rest of the sections as needed */}
      <footer>
        &copy; 2024 Dream Vacation Planner
      </footer>
    </div>
  );
};
export default DreamVacationPlanner;