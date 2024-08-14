import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="home-container">
      <h1 className="welcome-title">Hello, Welcome to CareerCarve 1x1 Mock Interview Schedule</h1>
      <div className="button-group">
        <Link to={  'login'}>
          <button className="home-button">Let's Start</button>
        </Link>
      </div>
    </div>
  );
}
