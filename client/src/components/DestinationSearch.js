import React, { useState } from 'react';

// DestinationSearch component
const DestinationSearch = () => {
    return (
        <div>
            <header>
                <h1>Destination Search</h1>
            </header>
            <main className='container'>
                <form className='border p-2' id= 'city-search-form'>
                    <h2>Search for City</h2>
                    <input id='city' type='text' autofocus='true' className='form-input'>
                    <button className='btn btn-primary' type='submit'>Search</button>
                    </input>
                </form>
            </main>
        </div>
    )
};
export default DestinationSearch;