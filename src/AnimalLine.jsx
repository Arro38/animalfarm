import React from "react";

function AnimalLine({ animal, key }) {
  return (
    <tr className="bg-base-200">
      <th>{key}</th>
      <td>{animal.type}</td>
      <td>{animal.name}</td>
      <td>{animal.age}</td>
    </tr>
  );
}

export default AnimalLine;
