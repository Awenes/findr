import React, { useState, useEffect } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // Initial search term
  const [searchResults, setSearchResults] = useState(null); // State for search results
  const [error, setError] = useState(null); // State for errors

  const apiKey = 'd7ae0ff6c0msh58fbee1e43cd5d9p137f64jsn3286c4b95aaf'; // Replace with your actual API key
  const baseUrl = 'https://filepursuit.p.rapidapi.com/';

  const fetchData = async () => {
    const url = `${baseUrl}?q=${searchTerm}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'filepursuit.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchResults(data);
      console.log(data);
    } catch (error) {
      setError(error);
    }
  };

  // useEffect(() => {
  //   fetchData(); // Fetch data on initial render
  // }, []); // Empty dependency array ensures fetch only happens once

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="container">
        <p>
          Get direct download links to fles from accross the internet.
        </p>
        <section className="search">
          <input className='find' type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search for files" />
          <button onClick={fetchData}>Search</button>
        </section>
        <section className="found">
        {error ? (
        <p>Error: {error.message}</p>
      ) : searchResults?.files_found?.length > 0 ? (
        <ul>
          {searchResults.files_found.map((file) => (
            <li key={file.file_id}>
              {file.file_name} - <a href={file.file_link}> Download</a> - {file.file_size}
            </li>
          ))}
        </ul>
      ) : searchResults?.files?.length === 0 ? (
        <p>No files found.</p>
      ) : (
        <p>Searching...</p>
      )}
        </section>

      </div>
      
    </div>
  );
}

export default App;
