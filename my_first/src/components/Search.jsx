import React from 'react'

// Search component for movie search input
// Props:
//   searchTerm: current value of the search input
//   setSearchTerm: function to update the search input
const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        {/* Search icon */}
        <img src="search.svg" alt="search" />
        {/* Input for searching movies */}
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}
export default Search