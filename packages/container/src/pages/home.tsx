import React from 'react';
import { Link } from 'react-router-dom';
import LoginWidget from '../shared/components/Login';

const Home: React.FC = () => {
    return (
        <>
            This is my Home
            <div>
                <li>
                    <Link to="/flight">Flight</Link>
                </li>
                <li>
                    <Link to="/bus">Bus</Link>
                </li>
                <li>
                    <Link to="/helpcenter">Helpcente</Link>
                </li>
                <li>
                    <Link to="/train">Train</Link>
                </li>
                <li>
                    <Link to="/payment">Payment</Link>
                </li>
                <LoginWidget />
            </div>
        </>
    )
}

export default Home;