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
      <form>
        <strong>Edit Movie</strong>
        <input type="checkbox" />
      </form>

      {Object.keys(movie).length > 0 ? <MovieCard movie={movie} /> : <></>}
    </>
  );
};

export default UpdateMovie;
