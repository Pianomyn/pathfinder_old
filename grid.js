import { Node } from "./node.js";

export class Grid{
    constructor(gridHeight, gridWidth){
        this.gridHeight = gridHeight;
        this.gridWidth = gridWidth;
        this.grid = this.createGrid();
        this.startId = null; //Stored as an int array
        this.goalId = null; //Stored as an int array

    }

    getStartId(){
        return this.startId;
    }

    setStartId(id){
        this.startId = this.getCoords(id);
    }

    getGoalId(){
        return this.goalId;
    }

    setGoalId(id){
        this.goalId = this.getCoords(id);
    }

    //Given the id of a node in string form, return the coordinates of that node in an array
    getCoords(id){
        if(id==null)
            return null
        //console.log(id.split("-").map(x => parseInt(x)))
        return id.split("-").map(function(x) {
            return parseInt(x,10);})
    }
    
    //Given the id of a node in string form, return the node in the logical grid
    getNode(id){
        var coords = this.getCoords(id)
        //console.log(coords)
        return this.grid[coords[0]][coords[1]];
    }


    //Create the grid to be used for logical operations
    createGrid() {
        var grid = []
        for (var a = 0; a < this.gridHeight; a++) {
            grid.push([]);
            for (var b = 0; b < this.gridWidth; b++) {
                var id = `${a}-${b}`;
                grid[a].push(new Node(id, "unvisited"));
            }
        }
        return grid;
    }

    //Updates the neighbors for each node within the grid
    setNeighbors() {
        for (var row = 0; row < this.grid.length; row++) {
            for (var col = 0; col < this.grid[0].length; col++) {
                if (row - 1 >= 0) {
                    this.grid[row][col].addNeighbor([row-1, col])
                }
                if (row + 1 < this.grid.length) {
                    this.grid[row][col].addNeighbor([row+1, col])
                }
                if (col - 1 >= 0) {
                    this.grid[row][col].addNeighbor([row, col-1])
                }
                if (col + 1 < this.grid[0].length) {
                    this.grid[row][col].addNeighbor([row, col+1])
                }
                
            }
        }
    }
}