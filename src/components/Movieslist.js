import React, { useEffect } from "react";

function Movieslist(props) {
  useEffect(() => {
    const filteredList = props.movies.filter((movie) => {
      if (props.filterText === null) {
        return true;
      } else if (movie._name_.toLowerCase().startsWith(props.filterText)) {
        return true;
      } else return false;
    });

    if (filteredList.length === 0) {
      props.onEmpty(true);
    } else props.onEmpty(false);
  }, [props.movies, props.filterText]);

  return (
    <section>
      <ul className="styled w-100 pl-0" data-testid="moviesList">
        {props.movies
          .filter((movie) => {
            if (props.filterText === null) {
              return true;
            } else if (
              movie._name_.toLowerCase().startsWith(props.filterText)
            ) {
              return true;
            } else return false;
          })
          .sort((prev, next) => {
            return prev._duration_ < next._duration_ ? 1 : -1;
          })
          .map((movie, idx, arr) => {
            return (
              <li
                className="flex slide-up-fade-in justify-content-between"
                style={{ borderBottom: "2px solid var(--primary-color)" }}
                key={idx}
              >
                <div className="layout-column w-40">
                  {movie._name_}
                  <h3 className="my-3"></h3>
                  {movie._ratings_ + "/100"}
                  <p className="my-0"></p>
                </div>
                <div className="layout-row my-auto mr-20">
                  {movie._duration_ + "Hrs"}
                  <p className="justify-content-end"></p>
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default Movieslist;
