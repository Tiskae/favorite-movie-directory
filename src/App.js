import React, { useState, useEffect } from "react";
import "./App.css";
import "h8k-components";

import { Movieform, Movieslist, Search } from "./components";

const title = "Favorite Movie Directory";

function App() {
  const [movies, setMovies] = useState([]);
  const [filterText, setFilterText] = useState(null);

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [emptySearchList, setEmptySearchList] = useState(false);

  useEffect(() => {
    setIsFirstLoad(false);
  }, [movies, filterText]);
  useEffect(() => {
    setIsFirstLoad(true);
  });

  return (
    <div>
      <h8k-navbar header={title} />
      <div className="layout-row justify-content-center mt-100">
        <div className="w-30 mr-75">
          <Movieform onAdd={setMovies} />
        </div>
        <div className="layout-column w-30">
          <Search onSearch={setFilterText} />
          <Movieslist
            movies={movies}
            filterText={filterText}
            onEmpty={setEmptySearchList}
          />
          {!isFirstLoad || emptySearchList ? (
            <div data-testid="noResult">
              <h3 className="text-center">No Results Found</h3>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
