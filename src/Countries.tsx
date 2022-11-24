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
  handleChangeVisited: (list: string[]) => void;
}
let visitedList: string[] = [];
export default function Countries(props: Props): JSX.Element {
  const [country, setCountry] = useState<country[]>([]);
  const [searchedCountry, setSearchedCountry] = useState<string>("");
  //const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const jsonBody: country[] = await response.json();
      setCountry(jsonBody);
    };
    fetchCountry();
  }, []);

  const handleVisited = (countryName: string) => {
    // setVisited([...visited, countryName]);
    console.log(visitedList);
    // props.handleChangeVisited(visited);
    visitedList = [...visitedList, countryName];
    console.log(visitedList);
    props.handleChangeVisited(visitedList);
  };

  const countries = country
    .filter((country: country) =>
      country.name.common.toLowerCase().includes(searchedCountry.toLowerCase())
    )
    .map((country, index) => (
      <button key={index} onClick={() => handleVisited(country.name.common)}>
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
        <p> Select a country to add it to your visited list</p>

        <div className="flex-container">{countries}</div>
      </div>
    </>
  );
}
