exports.triangle = (height, base) => {
  if (height <= 0 || base <= 0) {
    // this.error = "height and base should be postive numbers";
    return {
      area: 0,
      perimeter: 0,
    };
  }

  return {
    area: height * base * 0.5,
    perimeter: height + base + Math.sqrt(height * height + base * base),
  };
};

exports.rectangle = (length, width) => {
  if (length <= 0 || width <= 0) {
    // this.error = "length and width should be postive numbers";
    return {
      area: 0,
      perimeter: 0,
    };
  }

  return {
    area: length * width,
    perimeter: 2 * (length + width),
  };
};

exports.circle = (radius) => {
  if (radius <= 0) {
    // this.error = "radius should be a postive number";
    return {
      area: 0,
      perimeter: 0,
    };
  }
  return {
    area: 3.14 * radius * radius,
    perimeter: 2 * 3.14 * radius,
  };
};

exports.FIGURES = [
  {
    id: 0,
    name: "triangle",
    area: "l*w*0.5",
    perimeter: "",
    fields: [
      { name: "height", value: null },
      { name: "base", value: null },
    ],
  },
  {
    id: 1,
    name: "rectangle",
    area: "l*w",
    perimeter: "2*(l+w)",
    fields: [
      { name: "length", value: null },
      { name: "width", value: null },
    ],
  },
  {
    id: 2,
    name: "square",
    area: "l*w",
    perimeter: "2*(l+w)",
    fields: [
      { name: "length", value: null },
      { name: "width", value: null },
    ],
  },
  {
    id: 3,
    name: "circle",
    area: "pi*radius*radius",
    perimeter: "2*pi*radius",
    fields: [{ name: "radius", value: null }],
  },
];
const UNITS = [
  {
    value: 100,
    unit: "cm",
  },
  {
    unit: "m",
    value: 1,
  },
  {
    unit: "dm",
    value: 0.1,
  },
  {
    unit: "km",
    value: 0.001,
  },
];
exports.converter = (unit, fields) => {
  // console.log("unit: ", unit);
  const find = UNITS.find((item) => item.unit === unit);
  // console.log("find: ", find);
  if (!find) return;
  return fields.map((field) => {
    return {
      name: field.name,
      value: field.value * find.value,
    };
  });
};

exports.ConstructResult = function (data = { area: 0, perimeter: 0}, unit) {
  this.data = data;
  this.unit = unit;
  return {
    area: `${this.data.area} squared ${unit}`,
    perimeter: `${this.data.perimeter} ${unit}`,
  };
};
