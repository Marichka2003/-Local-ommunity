import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSearchClick = async () => {
    if (searchQuery.length > 0) {
      try {
        const response = await axios.get(`https://localhost:44369/api/Search?query=${searchQuery}`);
        console.log('Search results:', response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching:', error);
      }
    } else {
      console.warn('Search query is empty');
    }
  };

  const renderSearchResults = () => {
    return (
      <div className='search-results'>
  {searchResults.appealResults.length > 0 && (
    <>
      <h2>Appeal Results:</h2>
      <ul>
        {searchResults.appealResults.map((result, index) => (
          <li key={index}>
            <Link to={`/appeal`}>{result.fullName}</Link>
          </li>
        ))}
      </ul>
    </>
  )}

  {searchResults.departmentResults.length > 0 && (
    <>
      <h2>Department Results:</h2>
      <ul>
        {searchResults.departmentResults.map((result, index) => (
          <li key={index}>
            <Link to={`/departments`}>{result.name}{result.description}</Link>
          </li>
        ))}
      </ul>
    </>
  )}

  {searchResults.financeResults.length > 0 && (
    <>
      <h2>Finance Results:</h2>
      <ul>
        {searchResults.financeResults.map((result, index) => (
          <li key={index}>{result.socialPrograms}</li>
        ))}
      </ul>
    </>
  )}

  {searchResults.appealResults.length === 0 && searchResults.departmentResults.length === 0 && searchResults.financeResults.length === 0 && (
    <p>No result</p>
  )}
</div>

    );
  };

  return (
    <div className='search-container'>
      <input
        type="text"
        placeholder="Enter your search query..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearchClick}>Search</button>
      {Object.keys(searchResults).length > 0 && renderSearchResults()}
    </div>
  );
};

export default Search;
