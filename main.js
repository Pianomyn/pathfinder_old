import { Grid } from "./grid.js";
import { BFS } from "./algorithms/bfs.js";
import { ASTAR } from "./algorithms/aStar.js";

/** State variables */
const gridHeight = 25;
const gridWidth = 40;
var startPlaced = false; //Tracks if a start node needs to be placed
var goalPlaced = false; //Tracks if a goal node needs to be placed
var canPlaceNodes = true; //Disable when algorithm is running. Can also disable for adding weights?
var colorDictionary = {
    start: "lightgreen",
    goal: "lightcoral",
    unvisited: "white",
    visited: "cornflowerblue",
    wall: "grey",
}; //Maps node types to colors

//Dynamically generate the rows and columns of the table in HTML
function htmlGrid() {
    var table = document.getElementById("grid");
    var count = 1; //Filler. Delete after adding css class
    for (var a = 0; a < gridHeight; a++) {
        var row = table.insertRow(table.rows.length);
        for (var b = 0; b < gridWidth; b++) {
            var cell = row.insertCell(b);
            //cell.innerHTML = count; //Filler. Delete after adding css class
            count++; //Filler. Delete after adding css class
            cell.classList.add("tableCell");
            cell.id = `${a}-${b}`;
            cell.style.cursor = "pointer";
            cell.addEventListener("click", handleNodeClick);
        }
    }
}

function resetPath(height, width) {
    for (var r = 0; r < height; r++) {
        for (var c = 0; c < width; c++) {
            var htmlCell = document.getElementById(`${r}-${c}`);
            var cell = grid.getNode(`${r}-${c}`);
            if (cell.type == "visited") {
                cell.type = "unvisited";
                cell.distanceTravelled = 0;
                var id = `${r}-${c}`;
                htmlCell.style.backgroundColor =
                    colorDictionary[grid.getNode(id).type];
            }
        }
    }
    canPlaceNodes = true;
}

//Places or replaces a single start, goal or wall node
function handleNodeClick() {
    if (!canPlaceNodes) return;

    var id = this.id;
    if (grid.getNode(id).type == "unvisited") {
        if (!startPlaced) {
            grid.startId = grid.getCoords(id);
            grid.getNode(id).type = "start";
            startPlaced = true;
            //grid.setStartId(grid.getCoords(id));
        } else if (!goalPlaced) {
            grid.goalId = grid.getCoords(id);
            grid.getNode(id).type = "goal";
            goalPlaced = true;
            //grid.setGoalId(grid.getCoords(id));
        } else {
            grid.getNode(id).type = "wall";
        }
    } else {
        if (grid.getNode(id).type == "start") {
            startPlaced = false;
            grid.getNode(id).type = "unvisited";
            grid.setStartId(null);
        } else if (grid.getNode(id).type == "goal") {
            goalPlaced = false;
            grid.getNode(id).type = "unvisited";
            grid.setGoalId(null);
        }
        grid.getNode(id).type = "unvisited";
    }

    var cell = document.getElementById(id);
    cell.style.backgroundColor = colorDictionary[grid.getNode(id).type];
}

/** Executed Code */
//Setup the HTML and logical grid
var grid = new Grid(gridHeight, gridWidth);
grid.setNeighbors();
htmlGrid();

//Logic for start button
var btn = document.getElementById("startButton");
var resetAll = document.getElementById("resetAllButton");
resetAll.onclick = () => {
    window.location.reload();
};
var reset = document.getElementById("resetButton");
reset.onclick = () => {
    resetPath(gridHeight, gridWidth);
};
btn.onclick = async () => {
    if (goalPlaced && startPlaced) {
        canPlaceNodes = false;
        var algorithm = document.getElementById("algorithmSelect").value;
        var expandedCoords = [];
        var path = [];
        var delay = 0;
        //BFS
        if (algorithm == "bfs") {
            var bfs = new BFS(grid);
            expandedCoords = bfs.findGoal();
            path = bfs.getPath();
            delay = 3;
        }
        //a star
        if (algorithm == "aStar") {
            var aStar = new ASTAR(grid);
            expandedCoords = aStar.findGoal();
            path = aStar.getPath();
            delay = 40;
        }

        //Highlight all nodes searched
        for (var a = 0; a < expandedCoords.length; a++) {
            var id = `${expandedCoords[a][0]}-${expandedCoords[a][1]}`;
            var cell = document.getElementById(id);
            cell.class = "delay";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            cell.style.backgroundColor = colorDictionary[grid.getNode(id).type];
        }
        for (var a = 0; a < path.length; a++) {
            var pathId = `${path[a][0]}-${path[a][1]}`;
            var pathCell = document.getElementById(pathId);
            pathCell.style.backgroundColor = "yellow";
        }
    }
};
