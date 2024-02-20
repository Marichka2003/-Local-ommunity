import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { t } = useTranslation();

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
            <h2>{t('Appeal Results')}:</h2>
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
      <h2>{t('Department Results')}:</h2>
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
      <h2>{t('Finance Results')}:</h2>
      <ul>
        {searchResults.financeResults.map((result, index) => (
          <li key={index}>{result.socialPrograms}</li>
        ))}
      </ul>
    </>
  )}
  {searchResults.newsResults.length > 0 && (
    <>
        <h2>{t('News Results')}:</h2>
        <ul>
          {searchResults.newsResults.map((result, index) => (
            <li key={index}>
              <Link to={`/allNews`}>{result.name}</Link>
            </li>
          ))}
        </ul>
    </>
  )}

  {searchResults.mapResults.length > 0 && (
    <>
        <h2>{t('Map Results')}:</h2>
        <ul>
            {searchResults.mapResults.map((result, index) => (
                <li key={index}>
                    <Link to={`/settlements`}>{result.name}</Link>
                </li>
            ))}
        </ul>
    </>
)}

    {searchResults.infrastructureResults.length > 0 && (
      <>
        <h2>{t('Infrastructure Results')}:</h2>
        <ul>
          {searchResults.infrastructureResults.map((result, index) => (
            <li key={index}>
              <Link to={`/infrastructure`}>{result.name}</Link>
            </li>
          ))}
        </ul>
      </>
    )}

        {searchResults.appealResults.length === 0 && searchResults.departmentResults.length === 0
          && searchResults.financeResults.length === 0 && searchResults.newsResults.length === 0
          && searchResults.infrastructureResults.length === 0 && searchResults.mapResults.length === 0 && (
            <p>{t('No result')}</p>
          )}
      </div>
    );
  };

  return (
    <div className='search-container'>
      <input
        type="text"
        placeholder={t('Enter your search query...')}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearchClick}>{t('Search')}</button>
      {Object.keys(searchResults).length > 0 && renderSearchResults()}
    </div>
  );
};

export default Search;
