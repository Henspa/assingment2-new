import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import uuid from 'react-uuid';


const URL = 'https://thecocktaildb.com/api/json/v1/1/random.php';
const SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function App() {
  const [strDrink, setStrDrink] = useState('');
  const [strGlass, setStrGlass] = useState('');
  const [strInstructions, setStrInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  //const [measures, setMeasures] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      console.log(response.data.drinks[0]);
      const drink = response.data.drinks[0];
      setStrDrink(drink.strDrink);
      setStrGlass(drink.strGlass);
      setStrInstructions(drink.strInstructions);

      const ingredientsArr = [];
        for (let i = 1; i < 16; i++) {
          if (drink['strIngredient' + i]) {
            ingredientsArr.push(drink['strIngredient' + i] + drink['strMeasure' + i]);
          }
        }

      setIngredients(ingredientsArr);

      /*const measuresArr = [];
      for (let i = 1; i < 16; i++) {
        measuresArr.push(drink['strMeasure' + i]);
      }

      setMeasures(measuresArr);*/
    }).catch(error => {
      alert(error);
    });
  }, [])
 
  function handleSubmit(e) {
    e.preventDefault();
    getData(SEARCH_URL + search); 
  }

  async function getData(URL) {
    axios.get(URL)
    .then((response) => {
      //console.log(response.data.drinks[0]);

      if (response.data.drinks != null) {
        const drink = response.data.drinks[0];
        setStrDrink(drink.strDrink);
        setStrGlass(drink.strGlass);
        setStrInstructions(drink.strInstructions);
      
        const ingredientsArr = [];
        for (let i = 1; i < 16; i++) {
          if (drink['strIngredient' + i]) {
            ingredientsArr.push(drink['strIngredient' + i] + drink['strMeasure' + i]);
          }
        }
      
        setIngredients(ingredientsArr);

        /*const measuresArr = [];
        for (let i = 1; i < 16; i++) {
          measuresArr.push(drink['strMeasure' + i]);
        }

        setMeasures(measuresArr);*/
    }}).catch(error => {
      alert(error);
    });
  }

      
    
  

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div style={{margin: "50px"}}>
        <h1>Cocktail of the day</h1>
          <label></label>
            <input type="search" value={search}
              onChange={e => setSearch(e.target.value)}></input>
          <button>Search</button>
          
        <h2>{strDrink}</h2>
        <h3>Glass</h3>
        <p>{strGlass}</p>
        <h3>Instructions</h3>
        <p>{strInstructions}</p>
        <ul>
          {ingredients.map(ingredient => (
             <li>{ingredient}</li>
          ))}
        </ul>  
        
      </div>
    </form>  
    </>
  );
}

export default App;
