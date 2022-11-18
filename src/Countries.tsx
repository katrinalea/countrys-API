import {useState, useEffect} from "react"
import "./style.css"

interface country {
  name: names,
  capital: string,
  flags: flag
}
interface names {
  common: string,
}
interface flag {
  svg: string,
  png: string
}

export default function Countries (): JSX.Element {

 const [country, setCountry] = useState<country[]>([])
 const[searchedCountry, setSearchedCountry] = useState<string>("")

useEffect(() => {
  const fetchCountry = async () => {
    const response = await fetch(
      "https://restcountries.com/v3.1/all"
    );
    const jsonBody: country[] = await response.json();
    // for (const item in jsonBody){
    //   setCountry([jsonBody[item]]);
    // }
    setCountry(jsonBody)

    //set the new component state using the data
    
  };
  fetchCountry(); 

}, []);

return (
  <>
  <div className="page">
  <h1 className="title"> Country information sheet</h1>

  <div className = "navBar">
  <a href = "#all"> All countries</a>
  <a href = "#favourited"> My favourite countries </a>
  </div>





  <h3> Search for a country below:</h3>
  <input  className = "searchbar"
          id="searchbar"
          type="text"
          value={searchedCountry}
          onChange={(e) => setSearchedCountry(e.target.value)}
        />
  <p> Select a country to add it to your visited list</p>




  <div className = "flex-container">
  <>
  {country && 
  
  (country
    .filter((country:country) => country.name.common.toLowerCase().includes(searchedCountry.toLowerCase()))
    .map((country) => (
  <button key = "">
  <>
  <div className = "flex-item">
  <>
  <h1 className = "countrytitle">Country Name : {country.name.common} </h1>
  <img className = "countryflag" src = {country.flags.png} alt =""  />
  <h2 className = "countrycapital"> Country Capital: {country.capital}</h2>
  </>
  </div>
  </>
  </button>
  )))}
  </>
  </div>
  </div>
  </>
  
)

}

// {name, tld, cca2, ccn3, cca3, cioc, independent, status, unMember, currencies, idd, capital, altSpellings, region, subregion, languages, translations, latlng, landlocked, borders, area, demonyms, flag, maps, population, gini, fifa, car, timezones, continents, flags, coatOfArms, startOfWeek, capitalInfo})