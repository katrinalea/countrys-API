import { useState } from "react";
import Countries from "./Countries";
import VisitedCountrys from "./VisitedeCountries";
import "./style.css"

export default function App(): JSX.Element {
  const [navigated, setNavigated] = useState<string>("all");
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);

  const changedVisited = (list: string[]) => {
    setVisitedCountries(list);
  };
  const handleRender = (state: string) => {
    setNavigated(state);
  };

  return (
    <>
      <div className="navBar">
        <button className = "navigate-button" onClick={() => handleRender("all")}> All Countries </button>
        <button className = "navigate-button" onClick={() => handleRender("visited")}>
          {" "}
          Visited Countries{" "}
        </button>
      </div>
      {navigated === "all" ? (
        <Countries handleChangeVisited={changedVisited} />
      ) : (
        <VisitedCountrys
          visitedCountries={visitedCountries}
          handleChangeVisited={changedVisited}
        />
      )}
    </>
  );
}
