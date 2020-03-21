// Default dataset:
var defaultData = {
  x: [1, 2, 3, 4, 5],
  y: [1, 2, 3, 4, 5]
};

var ds1 = {
  x: [1, 2, 3, 4, 5],
  y: [1, 2, 4, 8, 16]
}

var ds2 = {
  x: [10, 20, 30, 40, 50],
  y: [1, 10, 100, 1000, 10000]
}

var ds3 = {
  x: [100, 200, 300, 400, 500],
  y: [10, 100, 50, 10, 0]
}

// Initializes the page with a default plot
function init() {
  Plotly.newPlot("plot", [defaultData]);
  // console.log("1. Finished plot load init()");
}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("body").on("change", updatePlotly);
// console.log("2. Set up events");

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // console.log("");
  // console.log("---------------------------------------------------");
  // console.log("3. Inside updatePlotly");

  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");

  // Assign the value of the dropdown menu option to a variable
  // var dataset = dropdownMenu.property("value");
  var dataset = dropdownMenu.node().value;

  // console.log("4 - user chose dataset '" + dataset + "'");

  // console.log(defaultData.x);
  
  var data = [];

  switch(dataset) {
    case "dataset1":
      data = ds1;
      break;
    case "dataset3":
      data = ds2;
      break;
    default:
      data = ds3;
  }
  
  // console.log("5 - switch chose dataset: ");
  // console.log(data);

  Plotly.restyle("plot", "x", [data.x]);
  Plotly.restyle("plot", "y", [data.y]);
}

init();
