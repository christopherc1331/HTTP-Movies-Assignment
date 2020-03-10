import React, { useEffect, useState } from "react";
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

  return (
    <>
      {Object.keys(movie).length > 0 ? (
        <MovieCardEditMode history={props.history} movie={movie} />
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
    id: props.movie.id,
    stars: props.movie.stars,
    title: props.movie.title,
    director: props.movie.director,
    metascore: props.movie.metascore
  });

  const changeHandler = event => {
    console.log(event.target.name, " : ", event.target.value);
    setNewMovieInfo({
      ...newMovieInfo,
      [event.target.name]: event.target.value
    });
  };

  // ===============ToggleHandlers=======================//
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
  // ===============ToggleHandlers=======================//

  // ===============SubmitHandlers=======================//

  console.log("Props from UpdateMovie.js", props);

  const SubmitForm = event => {
    console.log("Props from Submit", props);

    event.preventDefault();
    console.log("New Movie", newMovieInfo);
    axios
      .put(`http://localhost:5000/api/movies/${props.movie.id}`, newMovieInfo)
      .then(res => {
        console.log("Response from put", res);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  const { title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <form onSubmit={SubmitForm}>
        <h2>
          {titleHandle ? (
            title
          ) : (
            <input
              name="title"
              value={newMovieInfo.title}
              onChange={changeHandler}
            />
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
              <input
                name="director"
                value={newMovieInfo.director}
                onChange={changeHandler}
              />
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
              <input
                name="metascore"
                value={newMovieInfo.metascore}
                onChange={changeHandler}
              />
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
        <button hidden />
      </form>
    </div>
  );
};
