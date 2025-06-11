import React from 'react'

// MovieCard component displays a single movie's details
// Props:
//   movie: object containing movie details (title, vote_average, poster_path, release_date, original_language)
const MovieCard = ({ movie }) => {
  if (!movie) return null;
  return (
    <div className="movie-card">
      {/* Movie poster image */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="mt-4">
        {/* Movie title */}
        <h3>{movie.title}</h3>

        {/* Movie language and year */}
        <div className="content">
          <span className="lang">{movie.original_language}</span>
          <span className="year">{movie.release_date?.split('-')[0]}</span>
        </div>

        {/* Movie rating */}
        <div className="rating">
          <img src="/star.svg" alt="star" />
          <p>{movie.vote_average}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard