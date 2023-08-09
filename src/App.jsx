import { useEffect, useState } from "react";
import "./App.css";
import AnimalLine from "./AnimalLine";

function App() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchType = async () => {
      if (type === "") return setAnimals([]);
      setLoading(true);
      const res = await fetch("http://localhost:8080/?q=" + type);
      const data = await res.json();
      setAnimals(data);
      setLoading(false);
    };
    fetchType();
  }, [type]);

  return (
    <>
      {/* Search bar : Animal type */}
      <input
        type="text"
        placeholder="Animal type"
        className="input input-bordered w-full max-w-xs mb-4"
        onChange={(e) => {
          setType(e.target.value);
        }}
      />

      {/* Loading */}
      {loading && <span className="loading loading-bars loading-md"></span>}

      {/* Show list of Animal */}
      {!loading && animals.length ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Type</th>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            {/* body */}
            <tbody>
              {animals &&
                animals.map((animal, key) => (
                  <AnimalLine animal={animal} key={key} />
                ))}
            </tbody>
          </table>
        </div>
      ) : !loading && type === "" ? (
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Please search a type</span>
        </div>
      ) : (
        !loading && (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>No records found.</span>
          </div>
        )
      )}
    </>
  );
}

export default App;
