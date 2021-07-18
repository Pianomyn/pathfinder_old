import { Grid } from "./grid.js";
import { BFS } from "./algorithms/bfs.js";

/** State variables */
const gridHeight = 30;
const gridWidth = 35;
var startPlaced = false; //Tracks if a start node needs to be placed
var goalPlaced = false; //Tracks if a goal node needs to be placed
var algorithmStarted = false; //Once the algorithm starts, clicks on the grid are ignored
var goalFound = false; //Highlight the shortest path when found
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
            cell.innerHTML = count; //Filler. Delete after adding css class
            count++; //Filler. Delete after adding css class
            cell.id = `${a}-${b}`;
            cell.style.cursor = "pointer";
            cell.addEventListener("click", handleNodeClick);
        }
    }
}

//Places or replaces a single start, goal or wall node
function handleNodeClick() {
    if (algorithmStarted) return;

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
            //grid.startId = null;
            startPlaced = false;
            grid.setStartId(null);
        } else if (grid.getNode(id).type == "goal") {
            //grid.goalId = null;
            goalPlaced = false;
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
btn.onclick = async function () {
    if (goalPlaced && startPlaced) {
        algorithmStarted = true;
        //Run the algorithm
        var algorithm = document.getElementById("algorithmSelect").value;
        if (algorithm == "bfs") {
            console.log(grid.grid[grid.startId[0]][grid.startId[1]].getNeighbors())
            var bfs = new BFS(grid);
            var expandedCoords = bfs.findGoal();

            var a;

            //Highlight all nodes searched
            for (a = 0; a < expandedCoords.length; a++) {
                var id = `${expandedCoords[a][0]}-${expandedCoords[a][1]}`;

                var cell = document.getElementById(id);
                cell.class = "delay";
                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, 3)
                );
                cell.style.backgroundColor =
                    colorDictionary[grid.getNode(id).type];
            }
            console.log("reached1.5")
            //Highlight shortest path
            var path = bfs.getPath()
            console.log("Path length: ",path.length)
            console.log(path)

            console.log("reached2")
            
            for(var a = 0; a<path.length; a++){
                var pathId = `${path[a][0]}-${path[a][1]}`
                console.log(pathId)
                var pathCell = document.getElementById(pathId)
                pathCell.style.backgroundColor = "yellow"
            }
            console.log("reached3")
        }
    }
};
