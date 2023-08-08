import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

import Chance from "chance";

const chance = new Chance();
const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    name: chance.name(),
    age: chance.age(),
    type: chance.animal(),
  };
});

app.get("", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";

  const results = animals.filter((animal) => {
    return animal.type.toLowerCase().includes(q);
  });
  res = res.send(results);
});

app.listen(8080, () => {
  console.log(
    " Listening to port 8080. Open http://localhost:8080/ in your browser.#"
  );
});
