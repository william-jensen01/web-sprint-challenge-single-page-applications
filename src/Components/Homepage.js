import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <div>
            <h1>Welcome to Lambda Pizzeria!</h1>
            <Link to="/pizza"><h2>Order Now</h2></Link>
        </div>
    )
};

export default Homepage;