export class Node{
    //Type: The state of the node - "start", "goal", "visited", "unvisited", "wall"
    //Previous: Refers to parent. To be updated when a node is added to the fringe. Used to trace shortest path
    constructor(id, type){
        this.id = id;
        this.type = type;
        this.neighbours = [];
        this.previous = null;
    }

    getType()
    {
        return this.type;
    }

    getNeighbours(){
        return this.neighbours;
    }

    getPrevious(){
        return this.previous;
    }

    addNeighbour(neighbour){
        this.neighbours.push(neighbour);
    }
}