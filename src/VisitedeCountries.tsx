import { useState, useEffect } from "react";
import "./style.css";

interface visitedCountry {
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

interface Props {
  //handleRender:  () => void
  visitedCountries: string[];
  handleChangeVisited: (list: string[]) => void;
}

export default function VisitedCountrys(props: Props): JSX.Element {
  const [allCountrys, setAllCountrys] = useState<visitedCountry[]>([]);
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const jsonBody: visitedCountry[] = await response.json();
      setAllCountrys(jsonBody);
    };
    fetchCountry();
  }, [visited]);

  const removeVisited = (countryName: string) => {
    setVisited(visited.filter((i) => i === countryName));
    console.log(visited);
    props.handleChangeVisited(visited);
  };


  const mappedCountrys = allCountrys
    .filter((country) => props.visitedCountries.includes(country.name.common))
    .map((country) => (
      <button key="" onClick = {() => removeVisited(country.name.common)}>
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
      <div>
        <h1 className="title"> You have visited the following countries</h1>
      </div>
      <div className="flex-container">{mappedCountrys}</div>
    </>
  );
}