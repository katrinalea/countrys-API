import { useState, useEffect } from "react";
import "./style.css";

interface visitedCountry {
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
  //handleRender:  () => void
  visitedCountries: string[];
  handleChangeVisited: (country: string) => void;
}
// ----------------------------------------------------------------------------------------- JSX element
export default function VisitedCountries(props: Props): JSX.Element {
  const [allCountries, setAllCountries] = useState<visitedCountry[]>([]);

  console.log(props.visitedCountries);

  // ----------------------------------------------------------------------------------------- fetching countries
  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const jsonBody: visitedCountry[] = await response.json();
      setAllCountries(jsonBody);
    };
    fetchCountry();
  }, []);

  // ----------------------------------------------------------------------------------------- mapped countries
  const mappedCountries = allCountries
    .filter((country) => props.visitedCountries.includes(country.name.common))
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
            </>
            <button
              className="button"
              onClick={() => props.handleChangeVisited(country.name.common)}
            >
              Not visited
            </button>
          </div>
        </>
      </li>
    ));

  return (
    <>
      <div>
        <h1 className="title"> You have visited the following countries</h1>
      </div>
      <div className="flex-container">{mappedCountries}</div>
    </>
  );
}
