import { useState, useEffect } from "react";
import "./style.css";
interface Props {
  futureCountries: string[];
  handleChangeFuture: (country: string) => void;
  handleChangeVisited: (country: string) => void;
}

interface futureCountry {
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

// ----------------------------------------------------------------------------------------- JSX element
export default function FutureCountries(props: Props): JSX.Element {
  const [allCountries, setAllCountries] = useState<futureCountry[]>([]);

  console.log(props.futureCountries);
  // ----------------------------------------------------------------------------------------- fetching countries
  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const jsonBody: futureCountry[] = await response.json();
      setAllCountries(jsonBody);
    };
    fetchCountry();
  }, []);

  // ----------------------------------------------------------------------------------------- mapping through future countries
  const mappedCountries = allCountries
    .filter((country) => props.futureCountries.includes(country.name.common))
    .map((country, index) => (
      <li key={index}>
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
              <button
                className="button"
                onClick={() => {
                  props.handleChangeVisited(country.name.common);
                  props.handleChangeFuture(country.name.common);
                }}
              >
                Have now visited
              </button>
            </>
          </div>
        </>
      </li>
    ));

  return (
    <>
      <h1 className="title"> Future travel plans</h1>
      <div className="flex-container">{mappedCountries}</div>
    </>
  );
}
