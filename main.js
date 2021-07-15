//Dependencies
import { Node } from "./node.js";

/** State variables */
const gridHeight = 30;
const gridWidth = 35;
var grid = null;
var startPlaced = false; //Tracks if a start node needs to be placed
var goalPlaced = false; //Tracks if a goal node needs to be placed
var algorithmStarted = false; //Once the algorithm starts, clicks are disabled
var pathFound = false; //Highlight the shortest path when found
var startId = false; //The HTML id of the start node in the grid
var goalId = null; //The HTML id of the goal node in the grid
var colorDictionary = {
    start: "lightgreen",
    goal: "lightcoral",
    unvisited: "white",
    visited: "cornflowerblue",
    wall: "grey",
}; //Maps node types to colors

//Place or replace start, goal and wall nodes
function handleNodeClick() {
    if (algorithmStarted) return;

    var id = this.id;
    var idIndex = id.split("-");
    if (grid[idIndex[0]][idIndex[1]].type == "unvisited") {
        if (!startPlaced) {
            startId = id;
            grid[idIndex[0]][idIndex[1]].type = "start";
            startPlaced = true;
        } else if (!goalPlaced) {
            goalId = id;
            grid[idIndex[0]][idIndex[1]].type = "goal";
            goalPlaced = true;
        } else {
            grid[idIndex[0]][idIndex[1]].type = "wall";
        }
    } else {
        if (grid[idIndex[0]][idIndex[1]].type == "start") {
            startId = null;
            startPlaced = false;
        } else if (grid[idIndex[0]][idIndex[1]].type == "goal") {
            goalId = null;
            goalPlaced = false;
        }
        grid[idIndex[0]][idIndex[1]].type = "unvisited";
    }

    var cell = document.getElementById(id);
    cell.style.backgroundColor =
        colorDictionary[grid[idIndex[0]][idIndex[1]].type];
}

//Dynamically generate the rows and columns of the table in HTML
function htmlGrid() {
    var table = document.getElementById("grid");
    var count = 1; //Filler. Delete after adding css class
    for (var a = 0; a < gridHeight; a++) {
        var row = table.insertRow(table.rows.length);
        for (var b = 0; b < gridWidth; b++) {
            var cell = row.insertCell(b);
            cell.innerHTML = count; //Filler. Delete after adding css class
            count++; //Filler. Delete after adding css class
            cell.id = `${a}-${b}`;
            cell.style.cursor = "pointer";
            cell.addEventListener("click", handleNodeClick);
        }
    }
}

//Create the grid to be used for logical operations
function createGrid(grid) {
    for (var a = 0; a < gridHeight; a++) {
        grid.push([]);
        for (var b = 0; b < gridWidth; b++) {
            var id = `${a}-${b}`;
            grid[a].push(new Node(id, "unvisited"));
        }
    }
    return grid;
}

/** Executed Code */
htmlGrid();
grid = createGrid([]);
