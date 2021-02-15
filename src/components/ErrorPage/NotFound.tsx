import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
    <div className="page404">
        <div className="page404__container">
            <h3>404 Not found</h3>
            <p>The page you are looking for does not exists.</p>
        </div>
        <div>
            <Link to="/">Index page</Link>
        </div>
    </div>
);

export default NotFound;
