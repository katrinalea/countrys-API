import { useState, useEffect } from "react";
import "./style.css";

interface country {
  name: names;
  capital: string;
  flags: flag;
}
interface names {
  common: string;
}
interface flag {
  svg: string;
  png: string;
}

export default function Countries(): JSX.Element {
  const [country, setCountry] = useState<country[]>([]);
  const [searchedCountry, setSearchedCountry] = useState<string>("");
  const [visitedCountry, setVisitedCountry] = useState<string[]>([]);
  const [navigated, setNavigated] = useState<string>("all");

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const jsonBody: country[] = await response.json();
      setCountry(jsonBody);
    };
    fetchCountry();
  }, []);
  //fetching API, setting country state to render the API info, specifically the flag name and capital

  const handleVisited = (countryName: string) => {
    // visitedCountry.includes(countryName) ?
    //setVisitedCountry(visitedCountry.splice(visitedCountry.indexOf(countryName))) :
    setVisitedCountry([...visitedCountry, countryName]);
    console.log(visitedCountry);
  };
  // when a button is clicked it adds to the visted country list

  const navigateHandler = (buttonPressed: string) => {
    setNavigated(buttonPressed);
  };
  //when a button in the navigation bar is pressed, navigated is queued a string specvific to the button

  //maps all of the countries turning them into buttons
  const countries = country
    .filter((country: country) =>
      country.name.common.toLowerCase().includes(searchedCountry.toLowerCase())
    )
    .map((country) => (
      <button key="" onClick={() => handleVisited(country.name.common)}>
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
            </>
          </div>
        </>
      </button>
    ));

  //filters the countries so that only those that have been clicked and added to the visited list are renders
  const visitedCountries = country
    .filter((country: country) => visitedCountry.includes(country.name.common))
    .map((country) => (
      <button key="" onClick={() => handleVisited(country.name.common)}>
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
            </>
          </div>
        </>
      </button>
    ));

  // controls what is rendered via the navigation bar
  const renderedCountries = () => {
    if (navigated === "all") {
      return countries;
    } else if (navigated === "visited") {
      return visitedCountries;
    }
  };

  return (
    <>
      <div className="page">
        <h1 className="title"> Country information sheet</h1>

        <div className="navBar">
          <button onClick={() => navigateHandler("all")}>
            {" "}
            All Countries{" "}
          </button>
          <button onClick={() => navigateHandler("visited")}>
            {" "}
            Visited Countries{" "}
          </button>
        </div>

        <h3> Search for a country below:</h3>
        <input
          className="searchbar"
          id="searchbar"
          type="text"
          value={searchedCountry}
          onChange={(e) => setSearchedCountry(e.target.value)}
        />
        <p> Select a country to add it to your visited list</p>

        <div className="flex-container">{renderedCountries()}</div>
      </div>
    </>
  );
}
