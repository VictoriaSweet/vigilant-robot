import React, { useState } from 'react';

const FlightsPage = () => {
    const [searchParams, setSearchParams] = useState({
        fromId: '',
        toId: '',
        departDate: '',
        pageNo: 1,
        adults: 1,
        children: 0,
        currency_code: 'AED'
    });
    const [flightResults, setFlightResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${encodeURIComponent(searchParams.fromId)}&toId=${encodeURIComponent(searchParams.toId)}&departDate=${encodeURIComponent(searchParams.departDate)}&pageNo=${searchParams.pageNo}&adults=${searchParams.adults}&children=${searchParams.children}&currency_code=${searchParams.currency_code}`;

        const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'c740526878mshc6c3d746e2f3003p19d0f3jsn8f869006c8ff',
              'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setFlightResults(result);
        } catch (error) {
            console.error(error);
            // Handle the error appropriately in your UI
        }

        setLoading(false);
    };

    return (
        <div>
            <h1>Search Flights</h1>
            <form onSubmit={handleSearch}>
                {/* Input fields for flight search parameters */}
                {/* Example: */}
                {/* <input name="fromId" onChange={handleInputChange} placeholder="From ID" /> */}
                {/* Add other input fields similarly */}
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}

            <div>
                {/* Display flight results here */}
                {/* Example: */}
                {/* {flightResults.map(flight => <div key={flight.id}>{flight.name}</div>)} */}
            </div>
        </div>
    );
};

export default FlightsPage;
