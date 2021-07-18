import { Node } from "../node.js";
import { Grid } from "../grid.js";

export class BFS {
    //Start, current, goal and each element of walls is stored as an array of strings of the form "x-y"
    constructor(grid) {
        this.grid = grid;
        this.current = null; //In coordinate form
        this.fringe = []; //List of coordinates
        this.expanded = []; // List of coordinates
    }

    getCurrent() {
        return this.current;
    }

    setCurrent(current) {
        this.current = current;
    }


    findGoal() {
        this.expanded = [];
        this.fringe = [this.grid.startId];

        while (this.fringe.length > 0) {
            //Expand a node from the fringe if possible
            this.current = this.fringe.shift();
            var currentNode = this.grid.grid[this.current[0]][this.current[1]];
            this.expanded.push(this.current);
            if (
                this.current[0] == this.grid.goalId[0] &&
                this.current[1] == this.grid.goalId[1]
            ) {
                break;
            }
            if (
                this.grid.grid[this.current[0]][this.current[1]].type !=
                    "start" &&
                this.grid.grid[this.current[0]][this.current[1]].type != "goal"
            )
                this.grid.grid[this.current[0]][this.current[1]].type =
                    "visited";

            //Update the previous value for each of its neighbors
            //And add each non-wall neighbor to the fringe
            for (var a = 0; a < currentNode.getNeighbors().length; a++) {
                var neighbor = currentNode.getNeighbor(a);
                if (
                    this.grid.grid[neighbor[0]][neighbor[1]].type != "wall" &&
                    this.grid.grid[neighbor[0]][neighbor[1]].type != "visited"
                ) {
                    var addToFringe = true;
                    for(var b = 0; b<this.fringe.length; b++)
                    {
                        if(this.fringe[b][0]==neighbor[0] && this.fringe[b][1]==neighbor[1]){
                            addToFringe = false;
                        }
                    }
                    if(addToFringe){
                        this.grid.grid[neighbor[0]][neighbor[1]].previous=
                            this.current
                        
                        this.fringe.push(neighbor);
                    }
                    
                    
                }
            }
        }
        console.log('reached')
        return this.expanded;
    }

    getPath() {
        var path = [];
        var pathNode = this.grid.getNode(`${this.grid.goalId[0]}-${this.grid.goalId[1]}`);
        console.log('pathnode: ', pathNode.previous)
        
        var pathCount = 0;
        while (pathNode.previous.length == 2) {
            if(pathCount >30){
                //break
            }
            var row = pathNode.previous[0];
            var col = pathNode.previous[1];
            pathNode = this.grid.grid[row][col];
            console.log("X: ",row,"Y: ",col,pathNode.previous)
            if(pathNode.type == "start"){
                break
            }
            path.push([row, col])
            pathCount++;
        }
        return path
    }
}
