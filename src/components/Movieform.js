import React, { useState } from "react";

function Movieform(props) {
  const [movieName, setMovieName] = useState("");
  const [ratings, setRatings] = useState("");
  const [duration, setDuration] = useState("");

  const [timeErr, setTimeErr] = useState(false);

  const movieNameChangeHandler = (event) => {
    const newName = event.target.value;
    setMovieName(newName);
  };
  const ratingChangeHandler = (event) => {
    const newRating = event.target.value;
    setRatings(newRating);
  };
  const durationChangeHandler = (event) => {
    const newDuration = event.target.value;
    setDuration(newDuration);
    setTimeErr(false);
  };

  const addMovieHandler = () => {
    if (
      movieName.trim() === "" ||
      ratings.trim() === "" ||
      duration.trim() === ""
    ) {
      alert("Please fill out all fields and try again");
    } else if (+ratings < 0 || +ratings > 100) {
      alert("Ratings must be between 1 and 100");
    } else if (
      !(duration.endsWith("h") || duration.endsWith("m")) ||
      duration.length < 2
    ) {
      alert("Please specify the time in hours or minutes (e.g. 2.5h or 150m)");
      setTimeErr(true);
    } else {
      let dur;
      if (duration.endsWith("m")) {
        const dur_slice = +duration.slice(0, duration.length - 1);
        dur = (dur_slice / 60).toFixed(1);
      } else dur = +duration.slice(0, duration.length - 1);

      props.onAdd((oldMovies) => [
        ...oldMovies,
        { _name_: movieName, _ratings_: ratings, _duration_: dur },
      ]);
      // console.log({
      //   _name_: movieName,
      //   _ratings_: ratings,
      //   _duration_: dur,
      // });
    }
  };

  return (
    <section>
      <div className="card pa-30">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="layout-column mb-15">
            <label htmlFor="name" className="mb-3">
              Movie Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Movie Name"
              data-testid="nameInput"
              value={movieName}
              onChange={movieNameChangeHandler}
            />
          </div>
          <div className="layout-column mb-15">
            <label htmlFor="ratings" className="mb-3">
              Ratings
            </label>
            <input
              type="number"
              min={0}
              max={100}
              id="ratings"
              placeholder="Enter Rating on a scale of 1 to 100"
              data-testid="ratingsInput"
              value={ratings}
              onChange={ratingChangeHandler}
            />
          </div>
          <div className="layout-column mb-30">
            <label htmlFor="duration" className="mb-3">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              placeholder="Enter duration in hours or minutes"
              data-testid="durationInput"
              value={duration}
              onChange={durationChangeHandler}
            />
          </div>
          {timeErr ? (
            <div className="alert error mb-30" data-testid="alert">
              Please specify time in hours or minutes (e.g. 2.5h or 150m)
            </div>
          ) : null}
          <div className="layout-row justify-content-end">
            <button
              type="submit"
              className="mx-0"
              data-testid="addButton"
              onClick={(event) => {
                event.preventDefault();
                addMovieHandler();
              }}
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Movieform;
