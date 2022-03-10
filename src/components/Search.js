import React, { useState } from "react";

function Search(props) {
  const searchTextChangeHandler = (event) => {
    const newSearchText = event.target.value.toLowerCase();
    if (newSearchText.length > 1) {
      props.onSearch(newSearchText);
    } else props.onSearch(null);
  };

  return (
    <section className="layout-row justify-content-center mb-40">
      <input
        type="text"
        placeholder="Search for movie by name"
        className="w-75 py-2"
        data-testid="search"
        onChange={searchTextChangeHandler}
      />
    </section>
  );
}

export default Search;
