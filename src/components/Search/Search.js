import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const Search= ({ onSearchClick }) => {
  return (
    <button onClick={onSearchClick}>
      Пошук
    </button>
  );
};

export default Search;
