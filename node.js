export class Node{
    //Type: The state of the node - "start", "goal", "visited", "unvisited", "wall"
    //Previous: Refers to parent. To be updated when a node is added to the fringe. Used to trace shortest path
    constructor(id, type){
        this.id = id;
        this.type = type;
        this.neighbors = [];
        this.previous = null;
    }

    getType(){
        return this.type;
    }

    getNeighbours(){
        return this.neighbors;
    }

    getPrevious(){
        return this.previous;
    }

    addNeighbour(neighbor){
        this.neighbors.push(neighbor);
    }
}