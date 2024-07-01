import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ to, icon, children, onClick, className }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    
    const baseClasses = "text-sm font-semibold text-white px-3 py-2 rounded-md flex items-center transition duration-300";
    const hoverClasses = "hover:bg-purple-700 hover:text-white";
    const activeClasses = isActive ? "bg-purple-600 text-purple-800" : "";
    const finalClasses = `${baseClasses} ${hoverClasses} ${activeClasses} ${className}`;

    return (
        <Link to={to} onClick={onClick} className={finalClasses}>
            <FontAwesomeIcon icon={icon} className="h-5 w-5 mr-2" />
            {children}
        </Link>
    );
};

export default NavItem;
