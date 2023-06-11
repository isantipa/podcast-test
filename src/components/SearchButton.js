import React from 'react';
import '../styles/SearchButton.css';

function SearchButton({ onSearch }) {
    const handleInputChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <div className="search">
            <input 
                type="text"
                placeholder="Filter podcast..."
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchButton;