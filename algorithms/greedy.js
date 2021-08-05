import { Node } from "../node.js";
import { Grid } from "../grid.js";

export class GREEDY {
    constructor(grid) {
        this.grid = grid;
        for(var a = 0; a < grid.gridHeight; a++){
            for(var b = 0; b < grid.gridWidth; b++){
                this.grid.getNode(`${a}-${b}`).heuristic = grid.
                calculateAstarHeuristic(`${a}-${b}`)
            }
        }
        this.current = null; //The current node in coordinate form
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
        var foundGoal = false;

        while (true) {
            //Check if fringe is empty
            if (this.fringe.length == 0) {
                break;
            }

            //Expand the element with the smallest distance from the fringe
            var bestDistance = Number.MAX_SAFE_INTEGER;
            var bestIndex = 0;
            for (var a = 0; a < this.fringe.length; a++) {
                if (
                    this.grid.getDistance(this.grid.startId, this.fringe[a]) <
                    bestDistance
                ) {
                    bestDistance = this.grid.getDistance(
                        this.grid.startId,
                        this.fringe[a]
                    );
                    bestIndex = a;
                }
            }
            this.current = this.fringe.splice(bestIndex, 1)[0];
            var currentNode = this.grid.getNode(this.current);
            this.expanded.push(this.current);

            //Check if the expanded node is the goal node
            if (
                this.current[0] == this.grid.goalId[0] &&
                this.current[1] == this.grid.goalId[1]
            ) {
                foundGoal = true
                break;
            }
            if (
                this.grid.getNode(this.current).type != "start" &&
                this.grid.getNode(this.current).type != "goal"
            )
                this.grid.getNode(this.current).type = "visited";

            //Update the previous value for each of its neighbors
            //And add each non-wall neighbor to the fringe
            for (var a = 0; a < currentNode.getNeighbors().length; a++) {
                var neighbor = currentNode.getNeighbor(a);
                if (
                    this.grid.getNode(neighbor).type != "wall" &&
                    this.grid.getNode(neighbor).type != "visited"
                ) {
                    var addToFringe = true;
                    for (var b = 0; b < this.fringe.length; b++) {
                        if (
                            this.fringe[b][0] == neighbor[0] &&
                            this.fringe[b][1] == neighbor[1]
                        ) {
                            addToFringe = false;
                        }
                    }
                    if (addToFringe) {
                        this.grid.grid[neighbor[0]][neighbor[1]].previous =
                            this.current;

                        this.fringe.push(neighbor);
                    }
                }
            }
        }

        return this.expanded;
    }

    getPath() {
        var path = [];
        var pathNode = this.grid.getNode(
            `${this.grid.goalId[0]}-${this.grid.goalId[1]}`
        );

        var pathCount = 0;
        while (pathNode.previous.length == 2) {
            if (pathCount > 30) {
                //break
            }
            var row = pathNode.previous[0];
            var col = pathNode.previous[1];
            pathNode = this.grid.grid[row][col];
            if (pathNode.type == "start") {
                break;
            }
            path.push([row, col]);
            pathCount++;
        }
        return path;
    }
}
