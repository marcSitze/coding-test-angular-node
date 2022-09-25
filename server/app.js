const express = require("express");
const app = express();
const cors = require('cors');

const {
  circle,
  rectangle,
  triangle,
  FIGURES,
  converter,
  ConstructResult,
} = require("./helper");

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ figures: FIGURES });
});

app.get("/:figure", (req, res) => {
  const figure = FIGURES.find(
    (item) => item.name === req.params.figure.toLowerCase()
  );
  if (!figure) return res.status(404).json({ msg: "figure doesn't exists" });
  res.send(figure);
});

app.post("/:figure", (req, res) => {
  const errors = [];
  const figure = FIGURES.find(
    (item) => item.name === req.params.figure.toLowerCase()
  );
  if (!figure) return res.status(404).json({ msg: "figure doesn't exists" });

  req.body.fields.forEach((field) => {
    if (typeof field.value !== "number") {
      errors.push({
        msg: "please enter a number in the " + field.name + " field",
      });
    }
    if (field.value <= 0) {
      errors.push({
        msg:
          "please enter a number greater than zero in the " +
          field.name +
          " field",
      });
    }
  });

  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  const { fields, unit = 'm' } = req.body;
  let result = {
    area: 0,
    perimeter: 0,
  };
  let newFields = converter(unit, fields);
  // evalate operations
  switch (req.params.figure) {
    case "circle":
      result = circle(Number(newFields[0].value));
      break;
    case "triangle":
      result = triangle(Number(newFields[0].value), Number(newFields[1].value));
      break;
    case "rectangle":
    case "square":
      result = rectangle(
        Number(newFields[0].value),
        Number(newFields[1].value)
      );
      break;
    default:
      result = {
        area: 0,
        perimeter: 0,
      };
  }
  res.status(200).json({
    result: new ConstructResult(result, unit),
  });
});

app.listen(PORT, () =>
  console.log("Server Running on http://localhost:" + PORT)
);
