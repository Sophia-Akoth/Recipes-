import React, { useEffect, useState } from 'react';
import Recipes from './recipe';
import './App.css';
const App = () => {

  const APP_ID = '01d7ed45';
  const APP_KEY = 'a84953945d12a3a1aa6d5a224193db2c';
  const [recipes, setRecipes] = useState([]);
  const[search, setSearch]=useState("");
  const[query, setQuery]=useState("chicken")

  // useEffect(() => {
  //   getRecipes();
  // }, [query]);

  // const getRecipes = async () => {
  //   const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
  //   );
  //   const data = response.json();
  //   setRecipes(data.hits);
  //   // console.log(data.hits)

  // };
  useEffect(() => {
    fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/vnd.github.cloak-preview"
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        setRecipes(response.hits);
        console.log(response.hits)
        
      })
      .catch(error => console.log(error));
  }, [query]);
  // //console.log(search)

  const updateSearch = e =>{
    setSearch(e.target.value);
  };
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search)
    setSearch('');
  }
  return (
    <div className="App">
      <h2>Welcome to the Recipe World</h2>
      <form onSubmit={getSearch}className='search-form'>
        <input className='search-bar' type="text" value={search} 
         onChange={updateSearch}></input>
        <button className='search-button' type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes && recipes.map(recipe => (
        <Recipes 
        key ={recipe.recipe.label}

        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}
export default App

