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
    if (!visitedCountries.includes(country)) {
      setVisitedCountries([...visitedCountries, country]);
    } else {
      setVisitedCountries(
        visitedCountries.filter(
          (place) =>
            place !== visitedCountries[visitedCountries.indexOf(country)]
        )
      );
    }
  };

  const changedFuture = (country: string) => {
    if (!futureCountries.includes(country)) {
      setFutureCountries([...futureCountries, country]);
    } else {
      setFutureCountries(
        futureCountries.filter(
          (place) => place !== futureCountries[futureCountries.indexOf(country)]
        )
      );
    }
  };

  const handleRender = (state: string) => {
    setNavigated(state);
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
        <FutureCountries
          futureCountries={futureCountries}
          handleChangeFuture={changedFuture}
          handleChangeVisited={changedVisited}
        />
      )}
    </>
  );
}
