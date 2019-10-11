import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard.js";
import axios from "axios";

const UpdateMovie = props => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const id = props.match.params.id;

    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
        console.log("movie from axios call", res.data);
      })
      .catch(err => console.log(err.response));
  }, []);

  console.log("Props from UpdateMovie.js", props);

  console.log("Movie in UpdateMovie.js", movie);
  console.log("Movie in UpdateMovie.js", Object.keys(movie).length);

  return (
    <>
      {Object.keys(movie).length > 0 ? (
        <MovieCardEditMode movie={movie} />
      ) : (
        <></>
      )}
    </>
  );
};

export default UpdateMovie;

const MovieCardEditMode = props => {
  const [titleToggle, setTitleCheck] = useState(false);
  const [directorToggle, setDirectorToggle] = useState(false);
  const [metaScoreToggle, setMetaScoreToggle] = useState(false);

  const [newMovieInfo, setNewMovieInfo] = useState({
    id: props.id,
    stars: props.stars,
    title: "",
    director: "",
    metascore: 0
  });

  const toggleHandler = event => {
    event.preventDefault();
  };

  console.log("props from MovieCard", props);
  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <h2>
        {title}
        <input name="titleToggle" value={titleToggle} type="checkbox" />
      </h2>
      <div className="movie-director">
        Director:{" "}
        <em>
          {director}
          <input name="directorToggle" value={directorToggle} type="checkbox" />
        </em>
      </div>
      <div className="movie-metascore">
        Metascore:{" "}
        <strong>
          {metascore}
          <input
            name="metaScoreToggle"
            value={metaScoreToggle}
            type="checkbox"
          />
        </strong>
      </div>

      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </div>
  );
};
