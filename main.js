//Dependencies
import { Node } from "./node.js";

/** State variables */
const gridHeight = 20;
const gridWidth = 40;

var grid = null;
var currentNode = 0; //To track which node is currently being placed
//0: start node, 1: goal node, 2: walls
var algorithmStarted = false; //Once the algorithm starts, clicks are disabled
var pathFound = false; //Highlight the shortest path when found
var startId = null; //The Id of the start node in the grid
var goalId = null; //The Id key of the goal node in the grid
var colorDictionary = {
    start: "green",
    goal: "red",
    unvisited: "white",
    visited: "blue",
    wall: "black",
}; //Maps node types to colors


function handleNodeClick() {
    if (algorithmStarted)
        return
    
    var id = this.id;
    var idIndex = id.split("-");
    if (grid[idIndex[0]][idIndex[1]].type == "unvisited") {
        if (currentNode == 0) {
            startId = id;
            grid[idIndex[0]][idIndex[1]].type = "start";
            currentNode = 1;
        } else if (currentNode == 1) {
            goalId = id;
            grid[idIndex[0]][idIndex[1]].type = "goal";
            currentNode = 2;
        } else {
            grid[idIndex[0]][idIndex[1]].type = "wall";
        }
    } else {
        if (grid[idIndex[0]][idIndex[1]].type == "start") {
            startId = null;
            currentNode = 0;
        } else if (grid[idIndex[0]][idIndex[1]].type == "goal") {
            goalId = null;
            currentNode = 1;
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
    for (var a = 0; a < gridHeight; a++) {
        var row = table.insertRow(table.rows.length);
        for (var b = 0; b < gridWidth; b++) {
            var cell = row.insertCell(b);
            cell.innerHTML = b; //Filler. Delete after adding css
            cell.id = `${a}-${b}`;
            cell.style.cursor = "pointer";
            cell.addEventListener("click", handleNodeClick);
        }
    }
} //Create the grid to be used for logical operations

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
