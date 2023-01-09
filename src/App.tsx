import { useState } from "react";
import Countries from "./Countries";
import VisitedCountries from "./VisitedCountries";
import FutureCountries from "./FutureCountries";
import "./style.css";

export default function App(): JSX.Element {
  const [navigated, setNavigated] = useState<string>("all");
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [futureCountries, setFutureCountries] = useState<string[]>([]);

  const changedVisited = (country: string) => {
    console.log("entered change visited");
    if (!visitedCountries.includes(country)) {
      setVisitedCountries([...visitedCountries, country]);
    } else {
      setVisitedCountries(
        visitedCountries.splice(visitedCountries.indexOf(country) + 1)
      );
    }
  };
  const handleRender = (state: string) => {
    setNavigated(state);
  };
  const changedFuture = (country: string) => {
    setFutureCountries([...futureCountries, country]);
  };

  return (
    <>
      <div className="navBar">
        <button className="navigate-button" onClick={() => handleRender("all")}>
          {" "}
          All Countries{" "}
        </button>
        <button
          className="navigate-button"
          onClick={() => handleRender("visited")}
        >
          {" "}
          Visited Countries{" "}
        </button>
        <button
          className="navigate-button"
          onClick={() => handleRender("future")}
        >
          {" "}
          Want to visit{" "}
        </button>
      </div>
      {navigated === "all" && (
        <Countries
          handleChangeVisited={changedVisited}
          handleChangeFuture={changedFuture}
          visitedList={visitedCountries}
          futureList={futureCountries}
        />
      )}{" "}
      {navigated === "visited" && (
        <VisitedCountries
          visitedCountries={visitedCountries}
          handleChangeVisited={changedVisited}
        />
      )}{" "}
      {navigated === "future" && (
        <FutureCountries futureCountries={futureCountries} />
      )}
    </>
  );
}
