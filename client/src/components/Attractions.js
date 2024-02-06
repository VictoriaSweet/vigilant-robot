// Import everything needed for the Attraction webpage
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Two methods of fetching data from the Booking Com API: one involving axios, and the other without axios 
// If anyone is more experienced with using axios and wants to use axios for data fetching, go ahead. 
// import axios from 'axios';

// This will be the Attractions component handling gathering and displaying information about attractions (location, name, etc)
const Attractions = () => {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    // Fetch data using fetch API
    fetchAttractions();

    // Fetch data using Axios
    /* 
    axios.get('/api/attractions')
      .then(response => {
       setAttractions(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    */
  }, [])

  // I'm using fetch API to fetch attraction data from the API at the moment since I'm not very experienced with axios.
  const fetchAttractions = async () => {
    try {
      const response = await fetch('/api/attractions');
      const data = await response.json();
      setAttractions(data);
    } catch (error) {
      console.error(error);
    }
  };

  // This will be what is displayed on the Attraction webpage's client side!
  return (
    <div>
      <h1>Attractions</h1>
      <h2>Welcome to the Attractions page!</h2>
      {attractions.map(attraction => (
        <div key={attraction.id}>
          <h3>{attraction.name}</h3>
          <p>{attraction.description}</p>
        </div>
      ))}
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default Attractions;