//Dependencies
import {Node} from './node.js'


//State variables
const gridHeight = 20;
const gridWidth = 40;

var grid = [];
var pathFound = false;

function changeColor() {
    this.style.backgroundColor = Math.floor(Math.random()*16777215).toString(16);;
}   


//Dynamically generate the rows and columns of the table in HTML
function htmlGrid(){
    var table = document.getElementById("grid")
    for(var a = 0; a<gridHeight; a++)
    {
        var row = table.insertRow(table.rows.length)
        for(var b = 0; b<gridWidth; b++)
        {
            var cell = row.insertCell(b)
            cell.innerHTML = b;
            cell.addEventListener("click", changeColor)
        }
    }
}

//Create the grid to be used for logical operations
function createGrid(grid){
    for(var a = 0; a<gridHeight; a++)
    {
        grid.push([])
        for(var b = 0; b<gridWidth; b++)
        {
            grid[a].push(new Node("unvisited"))
        }
    }
    console.log(grid.length)
    return grid
}

/** Executed Code */

htmlGrid()



