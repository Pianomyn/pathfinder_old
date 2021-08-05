export class Node {
    //Type: The state of the node - "start", "goal", "visited", "unvisited", "wall"
    //Previous: Refers to parent. To be updated when a node is added to the fringe. Used to trace shortest path
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.neighbors = []; // An array of arrays where each array contains the row and column coordinate of a neighbour
        this.previous = []; //The row and column coordinate of the node that added this node to the fringe
        this.weight = 1;
        this.distanceTravelled = 0;
        this.heuristic = 0;
    }

    getType() {
        return this.type;
    }

    setType(type) {
        this.type = type;
    }

    getIdString(){
        return `${this.id[0]}-${this.id[1]}`
    }

    getNeighbors() {
        return this.neighbors;
    }

    getNeighbor(i) {
        return this.neighbors[i];
    }

    addNeighbor(neighbor) {
        this.neighbors.push(neighbor);
    }

    getPrevious() {
        return this.previous;
    }
}
