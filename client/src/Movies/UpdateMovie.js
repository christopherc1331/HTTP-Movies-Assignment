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

// ===========UPDATE FORM==================

const MovieCardEditMode = props => {
  const [newMovieInfo, setNewMovieInfo] = useState({
    id: props.id,
    stars: props.stars,
    title: "",
    director: "",
    metascore: 0
  });

  const changeHandler = event => {
    setNewMovieInfo({
      ...newMovieInfo,
      [event.target.name]: event.target.value
    });
  };

  // ===============Handlers=======================//
  const [titleHandle, setTitleHandle] = useState(true);

  const toggleTitleHandler = event => {
    event.preventDefault();

    setTitleHandle(!titleHandle);
    console.log("Value from New Handler", event.target.value);
  };

  const [directorHandle, setDirectorHandle] = useState(true);

  const toggleDirectorHandle = event => {
    event.preventDefault();

    setDirectorHandle(!directorHandle);
    console.log("Value from New Handler", event.target.value);
  };

  const [metascoreHandle, setMetascoreHandle] = useState(true);

  const toggleMetascoreHandler = event => {
    event.preventDefault();

    setMetascoreHandle(!metascoreHandle);
    console.log("Value from New Handler", event.target.value);
  };
  // ===============Handlers=======================//

  console.log("props from MovieCard", props);
  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <form>
        <h2>
          {titleHandle ? (
            title
          ) : (
            <input value={newMovieInfo.title} onChange={changeHandler} />
          )}
          <input
            type="checkbox"
            value={titleHandle}
            onClick={toggleTitleHandler}
          />
        </h2>
        <div className="movie-director">
          Director:{" "}
          <em>
            {directorHandle ? (
              director
            ) : (
              <input value={newMovieInfo.director} onChange={changeHandler} />
            )}
            <input
              type="checkbox"
              value={directorHandle}
              onClick={toggleDirectorHandle}
            />
          </em>
        </div>
        <div className="movie-metascore">
          Metascore:{" "}
          <strong>
            {metascoreHandle ? (
              metascore
            ) : (
              <input value={newMovieInfo.metascore} onChange={changeHandler} />
            )}
            <input
              type="checkbox"
              value={metascoreHandle}
              onClick={toggleMetascoreHandler}
            />
          </strong>
        </div>

        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </form>
    </div>
  );
};
