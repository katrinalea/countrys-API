import { useState, useEffect } from "react";
import "./style.css";

interface country {
  name: names;
  capital: string;
  flags: flag;
  ccn3: number;
}
interface names {
  common: string;
}
interface flag {
  svg: string;
  png: string;
}

interface Props {
  handleChangeVisited: (country: string) => void;
  handleChangeFuture: (country: string) => void;
  visitedList: string[];
  futureList: string[];
}

// ----------------------------------------------------------------------------------------- JSX element

export default function Countries(props: Props): JSX.Element {
  const [country, setCountry] = useState<country[]>([]);
  const [searchedCountry, setSearchedCountry] = useState<string>("");
  //const [visited, setVisited] = useState<string[]>([]);
  // ----------------------------------------------------------------------------------------- fetching countries from API
  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const jsonBody: country[] = await response.json();
      setCountry(jsonBody);
    };
    fetchCountry();
  }, []);
  // ----------------------------------------------------------------------------------------- function to add countries to visited lsit

  const handleVisited = (countryName: string) => {
    props.handleChangeVisited(countryName);
  };
  // ----------------------------------------------------------------------------------------- function to add countries to future list

  const handleFuture = (countryName: string) => {
    props.handleChangeFuture(countryName);
  };

  // ----------------------------------------------------------------------------------------- search bar handle

  const searchBarHandle = (searchTerm: string, countriesArray: country[]) => {
    const searchedCountries: country[] = [];
    for (const itemCountry of countriesArray) {
      const lowerName = (
        itemCountry.name.common + itemCountry.capital
      ).toLowerCase();
      const lowerSearch = searchTerm.toLowerCase();
      if (lowerName.includes(lowerSearch)) {
        searchedCountries.push(itemCountry);
      }
    }
    return searchedCountries;
  };

  // ----------------------------------------------------------------------------------------- mapping through filtered countries
  const countries = searchBarHandle(searchedCountry, country).map(
    (country, index) => (
      <>
        <div className="flex-item">
          <>
            <h1 className="countrytitle">
              Country Name : {country.name.common}{" "}
            </h1>
            <img className="countryflag" src={country.flags.png} alt="" />
            <h2 className="countrycapital">
              {" "}
              Country Capital: {country.capital}
            </h2>

            <>
              {props.visitedList.includes(country.name.common) ? (
                <p> You have already visited this country.</p>
              ) : props.futureList.includes(country.name.common) ? (
                <></>
              ) : (
                <button
                  className="button"
                  key={index}
                  onClick={() => handleVisited(country.name.common)}
                >
                  Visited
                </button>
              )}
            </>

            {props.futureList.includes(country.name.common) ? (
              <p>This country is in your future plans.</p>
            ) : props.visitedList.includes(country.name.common) ? (
              <> </>
            ) : (
              <button
                className="button"
                key={index}
                onClick={() => handleFuture(country.name.common)}
              >
                Future
              </button>
            )}
          </>
        </div>
      </>
    )
  );

  // ----------------------------------------------------------------------------------------- final render for the element

  return (
    <>
      <div className="page">
        <h1 className="title"> Country information sheet</h1>
        <h3> Search for a country below:</h3>
        <input
          className="searchbar"
          id="searchbar"
          type="text"
          value={searchedCountry}
          onChange={(e) => setSearchedCountry(e.target.value)}
        />
        <p> Select 'Visited' to add a country to your visited list</p>
        <p> Select 'Future' to add a country to your want to visit list</p>

        <div className="flex-container">{countries}</div>
      </div>
    </>
  );
}
