import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";
const App = () => {
  const appId = "82e1ee8d";
  const appKey = "3690cc7c9b0283e571f3650453ec23dd";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [cuisineType, setCuisineType] = useState("");

  const cuisineTypes = [
    "American",
    "Asian",
    "British",
    "Caribbean",
    "Central Europe",
    "Chinese",
    "Eastern Europe",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "South American",
    "South East Asian",
  ];

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(buildQuery());
    const data = await response.json();
    setRecipes(data.hits);
    setSearch("");
    setCuisineType("");
  };

  const buildQuery = () => {
    let url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    if (cuisineType != "") {
      url += `&cuisineType=${cuisineType}`;
    }
    return url;
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  const getCuisineType = (e) => {
    setCuisineType(e.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <form className="search-form" onSubmit={getSearch}>
          <select
            className="search-select"
            value={cuisineType}
            onChange={getCuisineType}
          >
            <option value="">All</option>
            {cuisineTypes.map((type) => (
              <option>{type}</option>
            ))}
          </select>
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        <div className="recipes">
          {recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.label + recipe.recipe.source}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredientLines}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
