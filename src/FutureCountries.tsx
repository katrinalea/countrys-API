import { useState, useEffect } from "react";
import "./style.css";
interface Props {
  futureCountries: string[];
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
  const [futureCountries, setFutureCountries] = useState<futureCountry[]>([]);

  // ----------------------------------------------------------------------------------------- fetching countries
  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const jsonBody: futureCountry[] = await response.json();
      setFutureCountries(jsonBody);
    };
    fetchCountry();
  }, []);

  // ----------------------------------------------------------------------------------------- mapping through future countries
  const mappedCountries = futureCountries
    .filter((country) => props.futureCountries.includes(country.name.common))
    .map((country, index) => (
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
    ));

  return (
    <>
      <h1 className="title"> Future travel plans</h1>
      <p className="flex-container">{mappedCountries}</p>
    </>
  );
}
